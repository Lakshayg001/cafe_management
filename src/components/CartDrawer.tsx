import { X, Plus, Minus } from "lucide-react";
import { COLORS } from "../data/colors";
import { rupee } from "../utils/currency";

import type {
    CartItem,
    CategoryId,
    MenuItem,
} from "../types";

interface CartDrawerProps {
    open: boolean;
    cart: Record<string, CartItem>;

    total: number;
    savings: number;

    onClose: () => void;

    changeQty: (
        id: string,
        delta: number
    ) => void;

    priceFor: (
        category: CategoryId,
        item: MenuItem
    ) => number;

    onCheckout: () => void;
}

export default function CartDrawer({
    open,
    cart,
    total,
    savings,
    onClose,
    changeQty,
    priceFor,
    onCheckout,
}: CartDrawerProps) {
    if (!open) return null;

    const cartLines = Object.values(cart);

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            <div
                className="absolute inset-0"
                style={{
                    background: "rgba(0,0,0,0.6)",
                }}
                onClick={onClose}
            />

            <div
                className="relative w-full max-w-sm h-full flex flex-col"
                style={{
                    background: COLORS.espresso,
                    borderLeft: `1px solid ${COLORS.line}`,
                }}
            >
                {/* Header */}

                <div
                    className="flex items-center justify-between px-5 py-4 shrink-0"
                    style={{
                        borderBottom: `1px solid ${COLORS.line}`,
                    }}
                >
                    <p
                        className="vb-display text-lg"
                        style={{
                            color: COLORS.cream,
                        }}
                    >
                        Your Cart
                    </p>

                    <button
                        onClick={onClose}
                        className="cursor-pointer"
                        style={{
                            color: COLORS.muted,
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Cart Body */}

                <div className="flex-1 px-5 py-4 space-y-4 overflow-y-auto vb-scrollbar">
                    {cartLines.length === 0 && (
                        <p
                            className="text-sm mt-10 text-center"
                            style={{
                                color: COLORS.muted,
                            }}
                        >
                            Your cart is empty.
                            <br />
                            Add something warm.
                        </p>
                    )}

                    {cartLines.map((line) => (
                        <div
                            key={line.item.id}
                            className="flex items-center justify-between gap-3"
                        >
                            <div>
                                <p
                                    className="text-sm"
                                    style={{
                                        color: COLORS.cream,
                                    }}
                                >
                                    {line.item.name}
                                </p>

                                <p
                                    className="text-xs"
                                    style={{
                                        color: COLORS.gold,
                                    }}
                                >
                                    {rupee(
                                        priceFor(
                                            line.category,
                                            line.item
                                        )
                                    )}{" "}
                                    × {line.qty}
                                </p>
                            </div>

                            <div
                                className="flex items-center gap-2 rounded-full px-2 py-1"
                                style={{
                                    background: COLORS.umber,
                                }}
                            >
                                <button
                                    onClick={() =>
                                        changeQty(
                                            line.item.id,
                                            -1
                                        )
                                    }
                                    style={{
                                        color: COLORS.gold,
                                    }}
                                >
                                    <Minus size={14} />
                                </button>

                                <span
                                    className="text-sm w-4 text-center"
                                    style={{
                                        color: COLORS.cream,
                                    }}
                                >
                                    {line.qty}
                                </span>

                                <button
                                    onClick={() =>
                                        changeQty(
                                            line.item.id,
                                            1
                                        )
                                    }
                                    style={{
                                        color: COLORS.gold,
                                    }}
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {cartLines.length > 0 && (
                    <div
                        className="px-5 py-5 space-y-3 shrink-0"
                        style={{
                            borderTop: `1px solid ${COLORS.line}`,
                        }}
                    >
                        {savings > 0 && (
                            <div
                                className="flex justify-between text-xs"
                                style={{
                                    color: COLORS.gold,
                                }}
                            >
                                <span>Opening offer savings</span>

                                <span>-{rupee(savings)}</span>
                            </div>
                        )}

                        <div className="flex justify-between text-base">
                            <span
                                style={{
                                    color: COLORS.muted,
                                }}
                            >
                                Total
                            </span>

                            <span
                                className="vb-display"
                                style={{
                                    color: COLORS.cream,
                                }}
                            >
                                {rupee(total)}
                            </span>
                        </div>

                        <button
                            onClick={onCheckout}
                            className="w-full rounded-full py-3 text-sm tracking-wide"
                            style={{
                                background: COLORS.gold,
                                color: COLORS.espresso,
                            }}
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}