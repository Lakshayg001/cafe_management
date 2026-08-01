import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, RefreshCw, PlusCircle } from "lucide-react";
import { COLORS } from "../data/colors";
import { fetchOrders, updateOrderStatus, updateOrderPaid } from "../services/ordersApi";
import { logout } from "../services/adminAuth";
import OrderCard from "../components/admin/OrderCard";
import PlaceOrderModal from "../components/admin/PlaceOrderModal";
import logo from "../assets/velvet-brew-logo.jpg";
import type { Order, OrderStatus } from "../types";

const FILTERS: Array<"All" | OrderStatus> = [
  "All",
  "Pending",
  "Accepted",
  "Preparing",
  "Ready",
  "Completed",
  "Rejected",
];

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<"All" | OrderStatus>("All");
  const [loading, setLoading] = useState(true);
  const [placeOrderOpen, setPlaceOrderOpen] = useState(false);
  const navigate = useNavigate();

  const load = useCallback(async () => {
    const data = await fetchOrders();
    setOrders(data);
    setLoading(false);
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
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    await updateOrderStatus(id, status);
  };

  const handleTogglePaid = async (id: string, paid: boolean) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, paid } : o)));
    await updateOrderPaid(id, paid);
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  const visibleOrders = filter === "All" ? orders : orders.filter((o) => o.status === filter);
  const countFor = (f: "All" | OrderStatus) => (f === "All" ? orders.length : orders.filter((o) => o.status === f).length);

  return (
    <div className="min-h-screen w-full" style={{ background: COLORS.espresso, color: COLORS.cream, fontFamily: "'Jost', sans-serif" }}>
      <header
        className="sticky top-0 z-10 flex items-center justify-between px-5 md:px-10 py-4"
        style={{ background: "rgba(23,15,10,0.95)", borderBottom: `1px solid ${COLORS.line}` }}
      >
        <div className="flex items-center gap-3">
          <img src={logo} alt="Velvet Brew" className="w-9 h-9 rounded-full object-cover" style={{ border: `1.5px solid ${COLORS.gold}` }} />
          <div>
            <p className="vb-display text-lg leading-tight">Order Dashboard</p>
            <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: COLORS.muted }}>Velvet Brew Admin</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPlaceOrderOpen(true)}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs cursor-pointer"
            style={{ background: COLORS.gold, color: COLORS.espresso, fontWeight: "bold" }}
          >
            <PlusCircle size={13} /> Place Order
          </button>
          <button onClick={load} className="flex items-center gap-1.5 text-xs cursor-pointer" style={{ color: COLORS.gold }}>
            <RefreshCw size={14} /> Refresh
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs cursor-pointer"
            style={{ border: `1px solid ${COLORS.gold}`, color: COLORS.gold }}
          >
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      <main className="px-5 md:px-10 py-8 max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs"
                style={
                  active
                    ? { background: COLORS.gold, color: COLORS.espresso }
                    : { border: `1px solid ${COLORS.line}`, color: COLORS.muted }
                }
              >
                {f}
                <span
                  className="rounded-full px-1.5"
                  style={{ background: active ? "rgba(23,15,10,0.2)" : COLORS.umber }}
                >
                  {countFor(f)}
                </span>
              </button>
            );
          })}
        </div>

        {loading ? (
          <p className="text-sm text-center py-10" style={{ color: COLORS.muted }}>Loading orders…</p>
        ) : visibleOrders.length === 0 ? (
          <p className="text-sm text-center py-10" style={{ color: COLORS.muted }}>No orders in this view.</p>
        ) : (
          <div className="space-y-4">
            {visibleOrders.map((order) => (
              <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} onTogglePaid={handleTogglePaid} />
            ))}
          </div>
        )}
      </main>
      
      <PlaceOrderModal
        open={placeOrderOpen}
        onClose={() => setPlaceOrderOpen(false)}
        onSuccess={load}
      />
    </div>
  );
}
