import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    const updateArrows = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeft(scrollLeft > 5);
            setShowRight(scrollLeft + clientWidth < scrollWidth - 5);
        }
    };

    useEffect(() => {
        updateArrows();
        const timer = setTimeout(updateArrows, 100);
        window.addEventListener("resize", updateArrows);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", updateArrows);
        };
    }, [categories]);

    const handleScrollClick = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const amount = direction === "left" ? -150 : 150;
            scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
        }
    };

    return (
        <div className="relative -mx-5 px-10 md:mx-0 md:px-0 mb-10">
            {/* Left Scroll Indicator Arrow */}
            {showLeft && (
                <button
                    onClick={() => handleScrollClick("left")}
                    className="absolute left-0 top-0 bottom-0 z-10 w-10 flex items-center justify-start pl-2 md:hidden cursor-pointer"
                    style={{
                        background: `linear-gradient(to right, ${COLORS.espresso} 50%, transparent)`,
                        color: COLORS.gold,
                        border: "none",
                        outline: "none",
                    }}
                >
                    <ChevronLeft size={20} className="animate-pulse" />
                </button>
            )}

            {/* Right Scroll Indicator Arrow */}
            {showRight && (
                <button
                    onClick={() => handleScrollClick("right")}
                    className="absolute right-0 top-0 bottom-0 z-10 w-10 flex items-center justify-end pr-2 md:hidden cursor-pointer"
                    style={{
                        background: `linear-gradient(to left, ${COLORS.espresso} 50%, transparent)`,
                        color: COLORS.gold,
                        border: "none",
                        outline: "none",
                    }}
                >
                    <ChevronRight size={20} className="animate-pulse" />
                </button>
            )}

            <div
                ref={scrollRef}
                onScroll={updateArrows}
                className="flex overflow-x-auto scrollbar-none flex-nowrap md:flex-wrap justify-start md:justify-center gap-3"
            >
                {categories.map((category) => {
                    const Icon = category.icon;
                    const isActive = activeCategory === category.id;

                    return (
                        <button
                            key={category.id}
                            onClick={() => onChange(category.id)}
                            className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm transition shrink-0 cursor-pointer ${
                                isActive ? "vb-tab-active" : ""
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
        </div>
    );
}