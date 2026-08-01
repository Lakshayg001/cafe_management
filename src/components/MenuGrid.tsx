import CategoryTabs from "./CategoryTabs";
import MenuCard from "./MenuCard";

import { COLORS } from "../data/colors";

import type {
    CategoryId,
    CartItem,
    Category,
    MenuItem,
} from "../types";

interface MenuGridProps {
    activeCategory: CategoryId;
    setActiveCategory: (category: CategoryId) => void;

    cart: Record<string, CartItem>;

    promoPrice: number;

    addToCart: (
        category: CategoryId,
        item: MenuItem
    ) => void;

    changeQty: (
        id: string,
        delta: number
    ) => void;

    menu: Record<CategoryId, MenuItem[]>;
    loading: boolean;
    error: string | null;
    onRetry: () => void;
    categories: Category[];
}

function MenuCardSkeleton() {
    return (
        <div
            className="rounded-xl p-5 flex items-center justify-between gap-3 animate-pulse"
            style={{
                background: COLORS.umber,
                opacity: 0.6,
            }}
        >
            <div className="flex-1 space-y-2">
                <div
                    className="h-5 rounded w-2/3"
                    style={{ background: COLORS.clay }}
                ></div>
                <div
                    className="h-4 rounded w-1/4"
                    style={{ background: COLORS.gold, opacity: 0.3 }}
                ></div>
            </div>
            <div
                className="w-9 h-9 rounded-full shrink-0"
                style={{ border: `1.5px solid ${COLORS.gold}`, opacity: 0.3 }}
            ></div>
        </div>
    );
}

export default function MenuGrid({
    activeCategory,
    setActiveCategory,
    cart,
    promoPrice,
    addToCart,
    changeQty,
    menu,
    loading,
    error,
    onRetry,
    categories,
}: MenuGridProps) {
    return (
        <section
            id="menu"
            className="px-5 md:px-10 pt-14 pb-6"
        >
            {/* Heading */}

            <div className="text-center mb-10">
                <p
                    className="uppercase text-xs tracking-[0.35em]"
                    style={{
                        color: COLORS.gold,
                    }}
                >
                    Our Menu
                </p>

                <h2
                    className="vb-display text-3xl md:text-4xl mt-2"
                    style={{
                        color: COLORS.cream,
                    }}
                >
                    Something for every mood
                </h2>
            </div>

            {/* Category Tabs */}

            <CategoryTabs
                categories={categories}
                activeCategory={activeCategory}
                onChange={setActiveCategory}
            />

            {/* Error Banner */}

            {error && (
                <div
                    className="max-w-5xl mx-auto mb-8 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm border"
                    style={{
                        background: "rgba(212, 163, 89, 0.05)",
                        borderColor: "rgba(212, 163, 89, 0.2)",
                        color: COLORS.cream,
                    }}
                >
                    <div className="flex items-center gap-3">
                        <span className="flex h-2.5 w-2.5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                        </span>
                        <span>{error}</span>
                    </div>
                    <button
                        onClick={onRetry}
                        disabled={loading}
                        className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 shrink-0 hover:brightness-110 active:scale-95"
                        style={{
                            background: COLORS.gold,
                            color: COLORS.espresso,
                        }}
                    >
                        {loading ? "Re-connecting..." : "Sync Menu"}
                    </button>
                </div>
            )}

            {/* Menu Grid */}

            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    Array.from({ length: 6 }).map((_, idx) => (
                        <MenuCardSkeleton key={idx} />
                    ))
                ) : menu[activeCategory] && menu[activeCategory].length > 0 ? (
                    menu[activeCategory].map((item) => (
                        <MenuCard
                            key={item.id}
                            item={item}
                            category={activeCategory}
                            promoPrice={promoPrice}
                            qtyInCart={cart[item.id]?.qty ?? 0}
                            onAdd={addToCart}
                            onDecrease={(id) =>
                                changeQty(id, -1)
                            }
                        />
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-sm" style={{ color: COLORS.muted }}>
                        No items found in this category.
                    </div>
                )}
            </div>
        </section>
    );
}