import type { LucideIcon } from "lucide-react";
import { COLORS } from "../data/colors";

interface FieldProps {
    icon: LucideIcon;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

export default function Field({
    icon: Icon,
    placeholder,
    value,
    onChange,
}: FieldProps) {
    return (
        <div
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 flex-1"
            style={{
                background: COLORS.umberLt,
                border: `1px solid ${COLORS.line}`,
            }}
        >
            <Icon
                size={15}
                style={{
                    color: COLORS.gold,
                }}
            />

            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="bg-transparent outline-none text-sm w-full"
                style={{
                    color: COLORS.cream,
                }}
            />
        </div>
    );
}