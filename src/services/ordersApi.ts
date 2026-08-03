import type { Order, OrderStatus, CategoryId } from "../types";
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
  const customerName = o.customerName || "";
  const phone = o.mobile || o.phone || "";
  const email = o.email || "";

  const items = Array.isArray(o.items)
    ? o.items.map((item: any) => {
        const qty = item.quantity !== undefined ? item.quantity : (item.qty !== undefined ? item.qty : 1);
        const name = item.menuName || item.name || `Item #${item.menuId || item.menuItemId}`;
        
        let category: CategoryId = "hot";
        const lowerName = name.toLowerCase();
        if (lowerName.includes("pasta") || lowerName.includes("sandwich") || lowerName.includes("fries")) {
          category = "bites";
        } else if (lowerName.includes("shake")) {
          category = "shakes";
        } else if (lowerName.includes("cold") || lowerName.includes("frappe")) {
          category = "cold";
        }

        const price = item.unitPrice || item.price || 0;

        return {
          id: String(item.menuId || item.menuItemId || item.id || Math.random()),
          name,
          category,
          price,
          qty,
        };
      })
    : [];

  let status: OrderStatus = "Pending";
  if (o.orderStatus) {
    const s = o.orderStatus.toUpperCase();
    if (s === "ACCEPTED") status = "Accepted";
    else if (s === "PREPARING") status = "Preparing";
    else if (s === "READY") status = "Ready";
    else if (s === "COMPLETED") status = "Completed";
    else if (s === "REJECTED") status = "Rejected";
  }

  const paid = o.paymentStatus ? o.paymentStatus.toUpperCase() === "COMPLETED" || o.paymentStatus.toUpperCase() === "PAID" : false;

  return {
    id: o.orderNumber || o.id || "",
    customerName,
    phone,
    email,
    mode: o.mode || "Takeaway",
    note: o.specialInstructions || o.note || "",
    items,
    subtotal: o.subtotal || 0,
    savings: o.discount || o.savings || 0,
    total: o.totalAmount || o.total || 0,
    paymentMethod: o.paymentMethod || "upi",
    paid,
    status,
    createdAt: o.orderedAt || o.createdAt || new Date().toISOString(),
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

/** Helper to map a frontend Order object to the backend PATCH payload */
function mapOrderToBackendPayload(order: Order) {
  return {
    customer: {
      fullName: order.customerName,
      mobile: order.phone,
    },
    items: order.items.map((item) => ({
      menuId: Number(item.id) || Number(item.id.replace(/\D/g, "")) || 0,
      quantity: item.qty,
    })),
    paymentStatus: order.paid ? "PAID" : "PENDING",
    orderStatus: order.status.toUpperCase(),
    tax: 0.00,
    discount: order.savings || 0,
    specialInstructions: order.note || "",
  };
}

/** Update an order's status (called from the admin dashboard). */
export async function updateOrderStatus(order: Order): Promise<Order | null> {
  if (USE_MOCK) {
    const orders = readStore();
    const idx = orders.findIndex((o) => o.id === order.id);
    if (idx === -1) return null;
    orders[idx] = { ...order };
    writeStore(orders);
    return orders[idx];
  }

  const res = await fetch(`${API_BASE}/customer/orders?orderNumber=${order.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mapOrderToBackendPayload(order)),
  });
  if (!res.ok) throw new Error("Failed to update order status");
  const result = await res.json();
  return result && result.data ? mapBackendOrderToFrontend(result.data) : null;
}

/** Mark an order paid/unpaid — useful once real payment webhooks exist. */
export async function updateOrderPaid(order: Order): Promise<Order | null> {
  if (USE_MOCK) {
    const orders = readStore();
    const idx = orders.findIndex((o) => o.id === order.id);
    if (idx === -1) return null;
    orders[idx] = { ...order };
    writeStore(orders);
    return orders[idx];
  }

  const res = await fetch(`${API_BASE}/customer/orders?orderNumber=${order.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mapOrderToBackendPayload(order)),
  });
  if (!res.ok) throw new Error("Failed to update payment status");
  const result = await res.json();
  return result && result.data ? mapBackendOrderToFrontend(result.data) : null;
}
