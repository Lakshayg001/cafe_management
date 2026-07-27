import { ArrowRight } from "lucide-react";
import logo from "../assets/velvet-brew-logo.jpg";
import { COLORS } from "../data/colors";

export default function Hero() {
    return (
        <section className="relative overflow-hidden px-6 md:px-10 pt-16 pb-20 text-center">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle at 50% 0%, rgba(199,154,86,0.14), transparent 55%)",
                }}
            />

            <p
                className="relative uppercase text-xs tracking-[0.4em] mb-4"
                style={{ color: COLORS.gold }}
            >
                Est. 2026 · Brewing Fresh Daily
            </p>

            <div className="relative flex flex-col items-center">
                <div className="relative mb-6">
                    <img
                        src={logo}
                        alt="Velvet Brew"
                        className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover"
                        style={{
                            border: `1.5px solid ${COLORS.gold}`,
                            boxShadow: `0 0 0 6px ${COLORS.espresso},
                          0 0 24px rgba(199,154,86,0.25)`,
                        }}
                    />


                </div>

                <h1
                    className="vb-display text-4xl sm:text-6xl md:text-7xl leading-none"
                    style={{ color: COLORS.cream }}
                >
                    Velvet Brew
                </h1>

                <p
                    className="mt-4 max-w-md text-sm md:text-base"
                    style={{ color: COLORS.muted }}
                >
                    Slow-poured coffee, cold brews and quick bites — straight from the
                    cart to your cup.
                </p>

                <a
                    href="#menu"
                    className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm tracking-wide"
                    style={{
                        background: COLORS.gold,
                        color: COLORS.espresso,
                    }}
                >
                    Explore Menu
                    <ArrowRight size={16} />
                </a>
            </div>
        </section>
    );
}