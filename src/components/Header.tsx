import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import logo from "../assets/velvet-brew-logo.jpg";
import { COLORS } from "../data/colors";

interface HeaderProps {
    cartCount: number;
    onOpenCart: () => void;
}

export default function Header({
    cartCount,
    onOpenCart,
}: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <header
            className="sticky top-0 z-30 w-full flex flex-col"
            style={{
                background: "rgba(23,15,10,0.92)",
                backdropFilter: "blur(6px)",
                borderBottom: `1px solid ${COLORS.line}`,
            }}
        >
            <div className="w-full flex items-center justify-between px-5 md:px-10 py-4">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <img
                        src={logo}
                        alt="Velvet Brew logo"
                        className="w-11 h-11 rounded-full object-cover"
                    />

                    <div className="leading-tight">
                        <p
                            className="vb-display text-lg tracking-wide"
                            style={{
                                color: COLORS.cream,
                            }}
                        >
                            Velvet Brew
                        </p>

                        <p
                            className="text-[10px] tracking-[0.25em] uppercase"
                            style={{
                                color: COLORS.muted,
                            }}
                        >
                            Street Coffee Cart
                        </p>
                    </div>
                </div>

                {/* Navigation (Desktop) */}
                <nav
                    className="hidden md:flex items-center gap-8 text-sm tracking-wide"
                    style={{
                        color: COLORS.muted,
                    }}
                >
                    <a
                        href="#menu"
                        className="hover:text-current"
                        style={{
                            color: COLORS.cream,
                        }}
                    >
                        Menu
                    </a>

                    <a
                        href="#"
                        style={{
                            color: COLORS.cream,
                        }}
                    >
                        Offer
                    </a>

                    <a
                        href="#visit"
                        style={{
                            color: COLORS.cream,
                        }}
                    >
                        Visit
                    </a>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {/* Cart Button */}
                    <button
                        onClick={onOpenCart}
                        className="relative flex items-center gap-2 rounded-full px-4 py-2 text-sm cursor-pointer"
                        style={{
                            border: `1px solid ${COLORS.gold}`,
                            color: COLORS.gold,
                        }}
                    >
                        <ShoppingBag size={16} />

                        <span className="hidden sm:inline">
                            Cart
                        </span>

                        {cartCount > 0 && (
                            <span
                                className="absolute -top-2 -right-2 rounded-full text-[11px] w-5 h-5 flex items-center justify-center"
                                style={{
                                    background: COLORS.gold,
                                    color: COLORS.espresso,
                                }}
                            >
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Hamburger Toggle (Mobile/Tablet) */}
                    <button
                        onClick={toggleMenu}
                        className="flex md:hidden items-center justify-center p-2 rounded-full cursor-pointer"
                        style={{
                            border: `1px solid ${COLORS.line}`,
                            color: COLORS.cream,
                        }}
                        aria-label="Toggle navigation menu"
                    >
                        {menuOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <nav
                    className="flex md:hidden flex-col w-full border-t px-5 py-4 gap-4 text-sm tracking-wide"
                    style={{
                        borderColor: COLORS.line,
                        background: COLORS.espresso,
                        color: COLORS.muted,
                    }}
                >
                    <a
                        href="#menu"
                        onClick={closeMenu}
                        className="py-2 px-1 hover:text-current rounded transition-colors"
                        style={{
                            color: COLORS.cream,
                        }}
                    >
                        Menu
                    </a>

                    <a
                        href="#offer"
                        onClick={closeMenu}
                        className="py-2 px-1 hover:text-current rounded transition-colors"
                        style={{
                            color: COLORS.cream,
                        }}
                    >
                        Offer
                    </a>

                    <a
                        href="#visit"
                        onClick={closeMenu}
                        className="py-2 px-1 hover:text-current rounded transition-colors"
                        style={{
                            color: COLORS.cream,
                        }}
                    >
                        Visit
                    </a>
                </nav>
            )}
        </header>
    );
}
