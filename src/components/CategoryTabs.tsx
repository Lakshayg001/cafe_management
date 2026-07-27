import { COLORS } from "../data/colors";
import type { Category, CategoryId } from "../types";

interface CategoryTabsProps {
    categories: Category[];
    activeCategory: CategoryId;
    onChange: (category: CategoryId) => void;
}

export default function CategoryTabs({
    categories,
    activeCategory,
    onChange,
}: CategoryTabsProps) {
    return (
        <div className="flex overflow-x-auto scrollbar-none flex-nowrap md:flex-wrap justify-start md:justify-center gap-3 mb-10 px-5 -mx-5 md:px-0 md:mx-0">
            {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;

                return (
                    <button
                        key={category.id}
                        onClick={() => onChange(category.id)}
                        className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm transition shrink-0 cursor-pointer ${isActive ? "vb-tab-active" : ""
                            }`}
                        style={
                            !isActive
                                ? {
                                    border: `1px solid ${COLORS.line}`,
                                    color: COLORS.muted,
                                }
                                : undefined
                        }
                    >
                        <Icon size={15} />
                        {category.label}
                    </button>
                );
            })}
        </div>
    );
}