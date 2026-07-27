import { Plus, Minus } from "lucide-react";
import { COLORS } from "../data/colors";
import { rupee } from "../utils/currency";
import type { CategoryId, MenuItem } from "../types";

interface MenuCardProps {
    item: MenuItem;
    category: CategoryId;
    promoPrice: number;
    qtyInCart: number;
    onAdd: (category: CategoryId, item: MenuItem) => void;
    onDecrease: (id: string) => void;
}

export default function MenuCard({
    item,
    category,
    promoPrice,
    qtyInCart,
    onAdd,
    onDecrease,
}: MenuCardProps) {
    const isPromo =
        category === "hot" && item.price > promoPrice;

    const displayPrice =
        category === "hot"
            ? Math.min(item.price, promoPrice)
            : item.price;

    return (
        <div
            className="rounded-xl p-5 flex items-center justify-between gap-3 vb-ring"
            style={{
                background: COLORS.umber,
            }}
        >
            <div>
                <p
                    className="vb-display text-lg"
                    style={{
                        color: COLORS.cream,
                    }}
                >
                    {item.name}
                </p>

                <div className="flex items-center gap-2 mt-1">
                    {isPromo && (
                        <span
                            className="text-xs line-through"
                            style={{
                                color: COLORS.clay,
                            }}
                        >
                            {rupee(item.price)}
                        </span>
                    )}

                    <span
                        className="text-sm"
                        style={{
                            color: COLORS.gold,
                        }}
                    >
                        {rupee(displayPrice)}
                    </span>

                    {isPromo && (
                        <span
                            className="text-[10px] uppercase tracking-wide rounded-full px-2 py-0.5"
                            style={{
                                background: COLORS.gold,
                                color: COLORS.espresso,
                            }}
                        >
                            Offer
                        </span>
                    )}
                </div>
            </div>

            {qtyInCart === 0 ? (
                <button
                    onClick={() => onAdd(category, item)}
                    className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full"
                    style={{
                        border: `1px solid ${COLORS.gold}`,
                        color: COLORS.gold,
                    }}
                >
                    <Plus size={16} />
                </button>
            ) : (
                <div
                    className="shrink-0 flex items-center gap-2 rounded-full px-2 py-1"
                    style={{
                        background: COLORS.umberLt,
                    }}
                >
                    <button
                        onClick={() => onDecrease(item.id)}
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
                        {qtyInCart}
                    </span>

                    <button
                        onClick={() => onAdd(category, item)}
                        style={{
                            color: COLORS.gold,
                        }}
                    >
                        <Plus size={14} />
                    </button>
                </div>
            )}
        </div>
    );
}