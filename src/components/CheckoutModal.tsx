import { X, User, Phone, MessageSquare, CreditCard, Wallet, Smartphone, Mail } from "lucide-react";

import { COLORS } from "../data/colors";
import Field from "./Field";
import PayOption from "./PayOption";

import type {
    Details,
    PaymentMethod,
} from "../types";

interface CheckoutModalProps {
    open: boolean;
    details: Details;
    payment: PaymentMethod;

    onClose: () => void;

    onDetailsChange: (
        field: keyof Details,
        value: string
    ) => void;

    onPaymentChange: (
        method: PaymentMethod
    ) => void;

    total: number;
    savings: number;

    onConfirm: () => void;
}

export default function CheckoutModal({
    open,
    details,
    payment,
    onClose,
    onDetailsChange,
    onPaymentChange,
    total,
    savings,
    onConfirm,
}: CheckoutModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
                className="absolute inset-0"
                style={{
                    background: "rgba(0,0,0,0.65)",
                }}
                onClick={onClose}
            />

            <div
                className="relative w-[94vw] max-w-lg max-h-[92vh] flex flex-col rounded-3xl overflow-hidden"
                style={{
                    background: COLORS.espresso,
                    border: `1px solid ${COLORS.line}`,
                }}
            >
                {/* Header */}

                <div
                    className="flex items-center justify-between px-6 py-5 shrink-0"
                    style={{
                        borderBottom: `1px solid ${COLORS.line}`,
                    }}
                >
                    <h2
                        className="vb-display text-2xl"
                        style={{
                            color: COLORS.cream,
                        }}
                    >
                        Checkout
                    </h2>

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

                {/* Body */}

                <div className="flex-1 p-6 space-y-5 overflow-y-auto vb-scrollbar">

                    <Field
                        icon={User}
                        placeholder="Your Name"
                        value={details.name}
                        onChange={(value) =>
                            onDetailsChange("name", value)
                        }
                    />

                    <Field
                        icon={Phone}
                        placeholder="Phone Number"
                        value={details.phone}
                        onChange={(value) =>
                            onDetailsChange("phone", value)
                        }
                    />

                    <Field
                        icon={Mail}
                        placeholder="Email Address"
                        value={details.email}
                        onChange={(value) =>
                            onDetailsChange("email", value)
                        }
                    />

                    <Field
                        icon={MessageSquare}
                        placeholder="Special Instructions (Optional)"
                        value={details.note}
                        onChange={(value) =>
                            onDetailsChange("note", value)
                        }
                    />

                    {/* Order Mode */}

                    <div className="space-y-2">
                        <p
                            className="text-sm"
                            style={{
                                color: COLORS.gold,
                            }}
                        >
                            Order Type
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() =>
                                    onDetailsChange(
                                        "mode",
                                        "Takeaway"
                                    )
                                }
                                className="rounded-xl py-3 text-sm cursor-pointer"
                                style={
                                    details.mode === "Takeaway"
                                        ? {
                                            background: COLORS.gold,
                                            color: COLORS.espresso,
                                        }
                                        : {
                                            border: `1px solid ${COLORS.line}`,
                                            color: COLORS.cream,
                                        }
                                }
                            >
                                Takeaway
                            </button>

                            <button
                                onClick={() =>
                                    onDetailsChange(
                                        "mode",
                                        "Dine-in"
                                    )
                                }
                                className="rounded-xl py-3 text-sm cursor-pointer"
                                style={
                                    details.mode === "Dine-in"
                                        ? {
                                            background: COLORS.gold,
                                            color: COLORS.espresso,
                                        }
                                        : {
                                            border: `1px solid ${COLORS.line}`,
                                            color: COLORS.cream,
                                        }
                                }
                            >
                                Dine-in
                            </button>
                        </div>
                    </div>
                    {/* Payment */}

                    <div className="space-y-2">
                        <p
                            className="text-sm"
                            style={{
                                color: COLORS.gold,
                            }}
                        >
                            Payment Method
                        </p>

                        <div className="space-y-2">
                            <PayOption
                                icon={Smartphone}
                                label="UPI"
                                id="upi"
                                selected={payment}
                                onSelect={onPaymentChange}
                            />

                            <PayOption
                                icon={CreditCard}
                                label="Card"
                                id="card"
                                selected={payment}
                                onSelect={onPaymentChange}
                            />

                            <PayOption
                                icon={Wallet}
                                label="Cash on Pickup"
                                id="cod"
                                selected={payment}
                                onSelect={onPaymentChange}
                            />
                        </div>
                    </div>

                    {savings > 0 && (
                        <div
                            className="flex justify-between text-sm"
                            style={{
                                color: COLORS.gold,
                            }}
                        >
                            <span>Offer Savings</span>
                            <span>-₹{savings}</span>
                        </div>
                    )}

                    <div
                        className="flex justify-between text-lg"
                        style={{
                            color: COLORS.cream,
                        }}
                    >
                        <span>Total</span>

                        <span className="vb-display">
                            ₹{total}
                        </span>
                    </div>

                    <button
                        onClick={onConfirm}
                        className="w-full rounded-full py-3 mt-2 text-sm tracking-wide cursor-pointer"
                        style={{
                            background: COLORS.gold,
                            color: COLORS.espresso,
                        }}
                    >
                        {payment === "cod"
                            ? "Place Order"
                            : `Pay ₹${total}`}
                    </button>

                    <p
                        className="text-[11px] text-center"
                        style={{
                            color: COLORS.clay,
                        }}
                    >

                    </p>
                </div>
            </div>
        </div>
    );
}