import { Flame } from "lucide-react";
import { COLORS } from "../data/colors";

interface OfferStripProps {
    promoPrice: number;
}

export default function OfferStrip({
    promoPrice,
}: OfferStripProps) {
    return (
        <section
            id="offer"
            className="px-6 md:px-10"
        >
            <div
                className="max-w-4xl mx-auto rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center gap-3 sm:gap-5 justify-center text-center sm:text-left"
                style={{
                    background: COLORS.umber,
                    border: `1px solid ${COLORS.gold}`,
                }}
            >
                <Flame
                    size={22}
                    style={{
                        color: COLORS.gold,
                    }}
                />

                <p
                    className="text-sm md:text-base"
                    style={{
                        color: COLORS.cream,
                    }}
                >
                    <span
                        className="vb-display"
                        style={{
                            color: COLORS.gold,
                        }}
                    >
                        Opening Offer —
                    </span>{" "}
                    Flat 10% off, or any Hot Coffee at{" "}
                    <span
                        style={{
                            color: COLORS.gold,
                        }}
                    >
                        ₹{promoPrice}
                    </span>{" "}
                    for the first 7 days.
                </p>
            </div>
        </section>
    );
}