import CategoryTabs from "./CategoryTabs";
import MenuCard from "./MenuCard";

import { COLORS } from "../data/colors";
import { MENU, CATEGORIES } from "../data/menu";

import type {
    CategoryId,
    CartItem,
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
}

export default function MenuGrid({
    activeCategory,
    setActiveCategory,
    cart,
    promoPrice,
    addToCart,
    changeQty,
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
                categories={CATEGORIES}
                activeCategory={activeCategory}
                onChange={setActiveCategory}
            />

            {/* Menu Grid */}

            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MENU[activeCategory].map((item) => (
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
                ))}
            </div>
        </section>
    );
}