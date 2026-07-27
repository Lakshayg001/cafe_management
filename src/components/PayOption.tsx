import type { LucideIcon } from "lucide-react";
import { COLORS } from "../data/colors";
import type { PaymentMethod } from "../types";

interface PayOptionProps {
    icon: LucideIcon;
    label: string;
    id: PaymentMethod;
    selected: PaymentMethod;
    onSelect: (id: PaymentMethod) => void;
}

export default function PayOption({
    icon: Icon,
    label,
    id,
    selected,
    onSelect,
}: PayOptionProps) {
    const active = selected === id;

    return (
        <button
            onClick={() => onSelect(id)}
            className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm cursor-pointer"
            style={
                active
                    ? {
                        background: COLORS.gold,
                        color: COLORS.espresso,
                    }
                    : {
                        border: `1px solid ${COLORS.line}`,
                        color: COLORS.cream,
                    }
            }
        >
            <Icon size={16} />
            {label}
        </button>
    );
}