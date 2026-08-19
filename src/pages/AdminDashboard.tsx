import { useEffect, useState, useCallback, useMemo } from "react";
import { fetchOrders, updateOrderStatus, updateOrderPaid } from "../services/ordersApi";
import { getMenu } from "../api/menu";
import { PROMO_HOT_PRICE } from "../data/menu";
import type { Order, OrderStatus } from "../types";
import AdminSidebar from "../components/admin/AdminSidebar";
import PosBillingView from "../components/admin/PosBillingView";
import OrderCenterView from "../components/admin/OrderCenterView";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [activeView, setActiveView] = useState<"pos" | "orders">("orders");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const [data, apiItems] = await Promise.all([
        fetchOrders(),
        getMenu().catch((err) => {
          console.error("Error fetching menu in admin", err);
          return [];
        }),
      ]);

      setMenuItems(apiItems);

      const menuMap = new Map<number, any>(apiItems.map((item: any) => [item.id, item]));

      const mergedOrders = data.map((order) => {
        let subtotal = 0;
        let total = 0;

        const items = order.items.map((it) => {
          const idNum = Number(it.id) || Number(it.id.replace(/\D/g, "")) || 0;
          const menuItem = menuMap.get(idNum);

          let price = it.price;
          let originalPrice = it.price;

          if (menuItem) {
            originalPrice = menuItem.price;
            price = menuItem.offerPrice !== null && menuItem.offerPrice !== undefined
              ? menuItem.offerPrice
              : menuItem.price;

            const isHot = menuItem.categoryId === 1 || (menuItem.categoryName || "").toLowerCase().includes("hot");
            if (isHot) {
              price = Math.min(price, PROMO_HOT_PRICE);
            }
          }

          subtotal += originalPrice * it.qty;
          total += price * it.qty;

          return {
            ...it,
            price,
          };
        });

        const savings = subtotal - total;

        return {
          ...order,
          items,
          subtotal,
          total,
          savings,
          paid: order.paid,
          paymentMethod: order.paymentMethod,
        };
      });

      setOrders(mergedOrders);
    } catch (err) {
      console.error("Admin dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const onUpdate = () => load();
    window.addEventListener("vb-orders-updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    const poll = setInterval(load, 4000);
    return () => {
      window.removeEventListener("vb-orders-updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
      clearInterval(poll);
    };
  }, [load]);

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    const updated = { ...order, status };
    setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
    await updateOrderStatus(updated);
  };

  const handleTogglePaid = async (id: string, paid: boolean) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    const updated = { ...order, paid };
    setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
    await updateOrderPaid(updated);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FDFBF7]">
        <p className="text-[#8B7355] font-bold">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#FDFBF7] font-['Jost',sans-serif]">
      <AdminSidebar activeView={activeView} onChangeView={setActiveView} />
      
      {activeView === "pos" ? (
        <PosBillingView items={menuItems} />
      ) : (
        <OrderCenterView 
          orders={orders} 
          onStatusChange={handleStatusChange} 
          onTogglePaid={handleTogglePaid} 
        />
      )}
    </div>
  );
}
