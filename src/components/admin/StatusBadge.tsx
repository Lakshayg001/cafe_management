import { COLORS } from "../../data/colors";
import type { OrderStatus } from "../../types";

const STATUS_COLOR: Record<OrderStatus, string> = {
  Pending: COLORS.muted,
  Accepted: COLORS.gold,
  Preparing: COLORS.warning,
  Ready: COLORS.info,
  Completed: COLORS.success,
  Rejected: COLORS.danger,
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const color = STATUS_COLOR[status];
  return (
    <span
      className="text-[11px] uppercase tracking-wide rounded-full px-2.5 py-1 inline-flex items-center gap-1.5"
      style={{ color, border: `1px solid ${color}`, background: "rgba(0,0,0,0.15)" }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      {status}
    </span>
  );
}
