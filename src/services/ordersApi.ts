import type { Order, OrderStatus } from "../types";
import { SAMPLE_ORDERS } from "../data/sampleOrders";

/**
 * ---------------------------------------------------------------
 * ORDERS API — single place the whole app talks to for order data.
 *
 * Right now USE_MOCK is true, so everything is read/written to
 * localStorage (so the admin page + checkout flow are fully
 * demoable without a server). Every function already has the real
 * fetch() call written and commented out below the mock branch —
 * once the backend team's endpoints are ready:
 *
 *   1. Set VITE_API_BASE_URL in your .env (or edit API_BASE below)
 *   2. Flip USE_MOCK to false
 *   3. Confirm the response shapes below match your API and adjust
 *      the `.json()` mapping if needed
 * ---------------------------------------------------------------
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";

// TODO(backend): flip to false once real endpoints are live.
const USE_MOCK = false;

const STORAGE_KEY = "vb_orders";

function readStore(): Order[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as Order[];
    } catch {
      // fall through to reseed on corrupt data
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_ORDERS));
  return SAMPLE_ORDERS;
}

function writeStore(orders: Order[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  // lets other tabs (e.g. an admin tab open alongside the customer tab)
  // know data changed, since the native `storage` event doesn't fire
  // in the same tab that made the write.
  window.dispatchEvent(new CustomEvent("vb-orders-updated"));
}

function mapBackendOrderToFrontend(o: any): Order {
  let customerName = o.customerName || "";
  let phone = o.phone || "";
  let email = o.email || "";

  if (o.customer) {
    customerName = o.customer.fullName || o.customer.name || customerName;
    phone = o.customer.mobile || o.customer.phone || phone;
    email = o.customer.email || email;
  } else {
    customerName = o.fullName || customerName;
    phone = o.mobile || phone;
  }

  const items = Array.isArray(o.items)
    ? o.items.map((item: any) => {
        const qty = item.qty !== undefined ? item.qty : (item.quantity !== undefined ? item.quantity : 1);
        
        let category: any = item.category || "hot";
        if (item.menuId === 1) category = "hot";
        else if (item.menuId === 2) category = "cold";
        else if (item.menuId === 3) category = "shakes";
        else if (item.menuId === 4) category = "bites";

        let id = item.id || "";
        if (!id && item.menuItemId) {
          let prefix = "h";
          if (category === "cold") prefix = "c";
          else if (category === "shakes") prefix = "s";
          else if (category === "bites") prefix = "b";
          id = `${prefix}${item.menuItemId}`;
        }

        return {
          id: String(id),
          name: item.name || (item.menuItem && item.menuItem.name) || `Item #${item.menuItemId}`,
          category,
          price: item.price || (item.menuItem && item.menuItem.price) || 0,
          qty,
        };
      })
    : [];

  return {
    id: String(o.id || ""),
    customerName,
    phone,
    email,
    mode: o.mode || "Takeaway",
    note: o.note || o.specialInstructions || "",
    items,
    subtotal: o.subtotal || 0,
    savings: o.savings || 0,
    total: o.total || 0,
    paymentMethod: o.paymentMethod || "upi",
    paid: typeof o.paid === "boolean" ? o.paid : false,
    status: o.status || "Pending",
    createdAt: o.createdAt || new Date().toISOString(),
  };
}

/** Fetch all orders, newest first. */
export async function fetchOrders(): Promise<Order[]> {
  if (USE_MOCK) {
    return [...readStore()].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  const res = await fetch(`${API_BASE}/customer/orders`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  const result = await res.json();
  
  let rawOrders: any[] = [];
  if (Array.isArray(result)) {
    rawOrders = result;
  } else if (result && Array.isArray(result.data)) {
    rawOrders = result.data;
  } else if (result && Array.isArray(result.orders)) {
    rawOrders = result.orders;
  }

  return rawOrders.map(mapBackendOrderToFrontend);
}

/** Create a new order (called from the customer checkout flow). */
export async function createOrder(order: Order): Promise<Order> {
  if (USE_MOCK) {
    const orders = readStore();
    orders.push(order);
    writeStore(orders);
    return order;
  }

  const res = await fetch(`${API_BASE}/customer/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customer: {
        fullName: order.customerName,
        mobile: order.phone,
        email: order.email || "",
      },
      items: order.items.map((item) => {
        let menuId = 1;
        if (item.category === "hot") menuId = 1;
        else if (item.category === "cold") menuId = 2;
        else if (item.category === "shakes") menuId = 3;
        else if (item.category === "bites") menuId = 4;

        const menuItemId = Number(item.id) || Number(item.id.replace(/\D/g, "")) || 0;

        return {
          menuId,
          menuItemId,
          quantity: item.qty,
        };
      }),
      specialInstructions: order.note,
    }),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}

/** Update an order's status (called from the admin dashboard). */
export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<Order | null> {
  if (USE_MOCK) {
    const orders = readStore();
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) return null;
    orders[idx] = { ...orders[idx], status };
    writeStore(orders);
    return orders[idx];
  }

  const res = await fetch(`${API_BASE}/customer/orders/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update order status");
  return res.json();
}

/** Mark an order paid/unpaid — useful once real payment webhooks exist. */
export async function updateOrderPaid(id: string, paid: boolean): Promise<Order | null> {
  if (USE_MOCK) {
    const orders = readStore();
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) return null;
    orders[idx] = { ...orders[idx], paid };
    writeStore(orders);
    return orders[idx];
  }

  const res = await fetch(`${API_BASE}/customer/orders/${id}/paid`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paid }),
  });
  if (!res.ok) throw new Error("Failed to update payment status");
  return res.json();
}
