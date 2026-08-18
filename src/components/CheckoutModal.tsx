import { X, UtensilsCrossed, Store, Smartphone, CreditCard, Wallet } from "lucide-react";
import { COLORS } from "../data/colors";
import { rupee } from "../utils/currency";
import type { Details, PaymentMethod } from "../types";

interface CheckoutModalProps {
    open: boolean;
    details: Details;
    payment: PaymentMethod;
    onClose: () => void;
    onDetailsChange: (field: keyof Details, value: string) => void;
    onPaymentChange: (method: PaymentMethod) => void;
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

    const mode = details.mode || "Dine-in";

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0"
                style={{ background: "rgba(0,0,0,0.65)" }}
                onClick={onClose}
            />

            <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-[24px] overflow-hidden bg-[#fdfbf7] shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 shrink-0 border-b border-[#f3eee7] bg-white">
                    <div>
                        <h2 className="text-2xl font-bold text-[#2C1810]">Checkout</h2>
                        <p className="text-[#8B7355] text-[13px] mt-0.5">
                            {rupee(total)}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 rounded-full text-[#8B7355] hover:bg-[#f3eee7] hover:text-[#2C1810] transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto vb-scrollbar">
                    <div className="p-6 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
                        
                        {/* Left Column - Form */}
                        <div className="space-y-6">
                            {/* Order Type */}
                            <div>
                                <p className="mb-3 text-[12px] font-bold uppercase tracking-wider text-[#8B7355]">
                                    Order type
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => onDetailsChange("mode", "Dine-in")}
                                        className={`rounded-2xl border p-4 text-left transition-all ${
                                            mode === "Dine-in"
                                                ? "border-[#2C1810] bg-[#2C1810] text-[#fdfbf7] shadow-md"
                                                : "border-[#e8dfd5] bg-white text-[#8B7355] hover:border-[#d4c5b0]"
                                        }`}
                                    >
                                        <UtensilsCrossed className="h-5 w-5 mb-3" />
                                        <p className="text-[14px] font-bold">Dine-in</p>
                                        <p className={`mt-1 text-[12px] ${mode === "Dine-in" ? "text-white/70" : "text-[#8B7355]"}`}>
                                            Served at your table
                                        </p>
                                    </button>
                                    <button
                                        onClick={() => onDetailsChange("mode", "Takeaway")}
                                        className={`rounded-2xl border p-4 text-left transition-all ${
                                            mode === "Takeaway"
                                                ? "border-[#2C1810] bg-[#2C1810] text-[#fdfbf7] shadow-md"
                                                : "border-[#e8dfd5] bg-white text-[#8B7355] hover:border-[#d4c5b0]"
                                        }`}
                                    >
                                        <Store className="h-5 w-5 mb-3" />
                                        <p className="text-[14px] font-bold">Takeaway</p>
                                        <p className={`mt-1 text-[12px] ${mode === "Takeaway" ? "text-white/70" : "text-[#8B7355]"}`}>
                                            Collect from the counter
                                        </p>
                                    </button>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-bold text-[#2C1810]">Your name <span className="text-red-500">*</span></label>
                                    <input
                                        value={details.name}
                                        onChange={(e) => onDetailsChange("name", e.target.value)}
                                        placeholder="Ananya Sharma"
                                        className="w-full h-12 rounded-xl border border-[#e8dfd5] bg-white px-4 text-[14px] text-[#2C1810] outline-none focus:border-[#d4c5b0] focus:ring-1 focus:ring-[#d4c5b0] transition-shadow placeholder:text-[#d4c5b0]"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-bold text-[#2C1810]">Mobile number <span className="text-red-500">*</span></label>
                                    <input
                                        value={details.phone}
                                        onChange={(e) => onDetailsChange("phone", e.target.value)}
                                        placeholder="9876543210"
                                        maxLength={10}
                                        className="w-full h-12 rounded-xl border border-[#e8dfd5] bg-white px-4 text-[14px] text-[#2C1810] outline-none focus:border-[#d4c5b0] focus:ring-1 focus:ring-[#d4c5b0] transition-shadow placeholder:text-[#d4c5b0]"
                                    />
                                </div>
                            </div>

                            {/* Order instructions */}
                            <div className="space-y-1.5">
                                <label className="text-[13px] font-bold text-[#2C1810]">Order instructions</label>
                                <textarea
                                    value={details.note}
                                    onChange={(e) => onDetailsChange("note", e.target.value)}
                                    placeholder="Ring the bell twice · extra napkins · call on arrival"
                                    className="w-full rounded-xl border border-[#e8dfd5] bg-white p-4 text-[14px] text-[#2C1810] outline-none focus:border-[#d4c5b0] focus:ring-1 focus:ring-[#d4c5b0] transition-shadow placeholder:text-[#d4c5b0] resize-none h-24"
                                />
                                <p className="text-[12px] text-[#8B7355]">Optional — the barista will see this</p>
                            </div>
                            
                            {/* Payment Method */}
                            <div>
                                <p className="mb-3 text-[12px] font-bold uppercase tracking-wider text-[#8B7355]">
                                    Payment method
                                </p>
                                <div className="grid sm:grid-cols-3 gap-3">
                                    <button
                                        onClick={() => onPaymentChange("upi")}
                                        className={`rounded-xl border p-3 flex items-center justify-center gap-2 transition-all ${
                                            payment === "upi"
                                                ? "border-[#2C1810] bg-[#2C1810] text-[#fdfbf7]"
                                                : "border-[#e8dfd5] bg-white text-[#8B7355] hover:border-[#d4c5b0]"
                                        }`}
                                    >
                                        <Smartphone size={16} />
                                        <span className="text-[13px] font-bold">UPI</span>
                                    </button>
                                    <button
                                        onClick={() => onPaymentChange("card")}
                                        className={`rounded-xl border p-3 flex items-center justify-center gap-2 transition-all ${
                                            payment === "card"
                                                ? "border-[#2C1810] bg-[#2C1810] text-[#fdfbf7]"
                                                : "border-[#e8dfd5] bg-white text-[#8B7355] hover:border-[#d4c5b0]"
                                        }`}
                                    >
                                        <CreditCard size={16} />
                                        <span className="text-[13px] font-bold">Card</span>
                                    </button>
                                    <button
                                        onClick={() => onPaymentChange("cod")}
                                        className={`rounded-xl border p-3 flex items-center justify-center gap-2 transition-all ${
                                            payment === "cod"
                                                ? "border-[#2C1810] bg-[#2C1810] text-[#fdfbf7]"
                                                : "border-[#e8dfd5] bg-white text-[#8B7355] hover:border-[#d4c5b0]"
                                        }`}
                                    >
                                        <Wallet size={16} />
                                        <span className="text-[13px] font-bold">Cash</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Summary Rail */}
                        <div className="space-y-4">
                            {savings > 0 && (
                                <div className="rounded-2xl border border-dashed border-[#10b981]/40 bg-[#10b981]/10 p-4">
                                    <p className="text-[12px] font-bold uppercase tracking-wider text-[#10b981]">
                                        Offer applied
                                    </p>
                                    <p className="mt-1 text-[14px] font-semibold text-[#2C1810]">
                                        Opening Offer — you save {rupee(savings)}
                                    </p>
                                </div>
                            )}

                            <div className="rounded-2xl border border-[#e8dfd5] bg-white p-5 shadow-sm space-y-3">
                                <div className="flex justify-between text-[14px] text-[#8B7355]">
                                    <span>Item total</span>
                                    <span className="font-medium text-[#2C1810]">{rupee(total + savings)}</span>
                                </div>
                                {savings > 0 && (
                                    <div className="flex justify-between text-[14px] text-[#10b981]">
                                        <span>Offer applied</span>
                                        <span className="font-medium">- {rupee(savings)}</span>
                                    </div>
                                )}
                                <div className="border-t border-dashed border-[#e8dfd5] my-3 pt-3 flex justify-between items-center text-[18px] font-bold text-[#2C1810]">
                                    <span>TO PAY</span>
                                    <span className="font-display">{rupee(total)}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="p-5 sm:p-6 border-t border-[#f3eee7] bg-white shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <button
                        onClick={onConfirm}
                        className="w-full rounded-xl py-4 text-[15px] font-bold tracking-wide transition-colors"
                        style={{ background: COLORS.gold, color: COLORS.espresso }}
                    >
                        {payment === "cod" ? "Place Order" : `Pay ${rupee(total)}`}
                    </button>
                    <p className="mt-4 text-center text-[12px] text-[#8B7355]">
                        By placing this order you agree to our{" "}
                        <span className="font-semibold text-[#2C1810] underline cursor-pointer">Terms & Conditions</span>
                        {" "}and{" "}
                        <span className="font-semibold text-[#2C1810] underline cursor-pointer">Privacy Policy</span>.
                    </p>
                </div>
            </div>
        </div>
    );
}