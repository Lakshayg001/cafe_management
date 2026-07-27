import type { LucideIcon } from "lucide-react";

export type CategoryId = "hot" | "cold" | "shakes" | "bites";

export type PaymentMethod = "upi" | "card" | "cod";

export type CheckoutStep =
    | null
    | "details"
    | "payment"
    | "success";

export interface MenuItem {
    id: string;
    name: string;
    price: number;
}

export interface Category {
    id: CategoryId;
    label: string;
    icon: LucideIcon;
}

export interface CartItem {
    item: MenuItem;
    category: CategoryId;
    qty: number;
}

export interface Details {
    name: string;
    phone: string;
    mode: "Takeaway" | "Dine-in";
    note: string;
}

export interface FieldProps {
    icon: LucideIcon;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

export interface PayOptionProps {
    icon: LucideIcon;
    label: string;
    id: PaymentMethod;
    selected: PaymentMethod;
    onSelect: (id: PaymentMethod) => void;
}