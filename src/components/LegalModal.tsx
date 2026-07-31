import { useState, useEffect, useRef } from "react";
import { X, Shield, Scale, Info, Printer } from "lucide-react";
import { COLORS } from "../data/colors";

interface LegalModalProps {
    open: boolean;
    initialTab: "privacy" | "terms";
    onClose: () => void;
}

const PRIVACY_SECTIONS = [
    { id: "p1", title: "1. About this policy", text: "Welcome to Velvet Brew. This Privacy Policy details how we collect, process, and protect your personal information when you use our website, place orders, or interact with our services. We are committed to maintaining the confidentiality of your data and ensuring your transaction experience is secure." },
    { id: "p2", title: "2. What we collect", text: "We collect information necessary to fulfill your orders and enhance your experience. This includes your name, phone number, email address, delivery mode preference, special preparation instructions, and browser interaction data such as your IP address and shopping cart preferences." },
    { id: "p3", title: "3. Why we use it", text: "Your data is used strictly for operational purposes: preparing and delivering your beverages, notifying you of order statuses, processing secure transactions, analyzing menu performance, and resolving any order discrepancies." },
    { id: "p4", title: "4. Consent and your choices", text: "By completing the checkout details form and placing an order, you consent to our collection and processing of your personal information. You can choose not to provide optional information, though this may restrict certain personalized experiences." },
    { id: "p5", title: "5. WhatsApp and other messages", text: "We send automated messages (via WhatsApp, SMS, or email) to keep you informed about your order's journey (e.g. order receipt, preparation status, and readiness for pickup). These are purely transactional and do not contain unsolicited spam advertising." },
    { id: "p6", title: "6. Who we share it with", text: "We do not sell, rent, or trade your data to third-party advertisers. Your information is shared only with trusted operational services, such as Firebase for cloud database hosting, Razorpay for payment processing, and our local delivery/cafe staff." },
    { id: "p7", title: "7. Cookies and local storage", text: "Our application uses local browser storage (localStorage and sessionStorage) to retain your shopping cart items, category choices, admin authentication states, and details forms. This ensures you do not lose progress if you refresh the browser." },
    { id: "p8", title: "8. How long we keep it", text: "We retain order history and customer details only as long as necessary to process pending transactions, manage local records, handle refund claims, and comply with standard accounting and local tax requirements." },
    { id: "p9", title: "9. How we protect it", text: "We implement robust security measures to safeguard your data. All external API transactions are routed via SSL encryption, and direct access to databases is heavily restricted. Payment details are processed directly on secure gateways and are never stored on our servers." },
    { id: "p10", title: "10. Your rights", text: "You have the right to request access to the personal data we hold about you, request corrections to inaccurate details, or request that your personal information be deleted from our active database. Write to our Grievance Officer for support." },
    { id: "p11", title: "11. Children", text: "Our services and ordering platforms are not directed at children under the age of 13. We do not knowingly collect personal details from children. If you believe a child has provided us details, contact us immediately to erase the records." },
    { id: "p12", title: "12. Changes to this policy", text: "We may periodically update this Privacy Policy to reflect changing regulatory guidelines or modifications to our cafe operations. We encourage you to review this modal regularly. The 'Last Updated' date will indicate when the latest revisions took effect." }
];

const TERMS_SECTIONS = [
    { id: "t1", title: "1. Introduction", text: "Welcome to Velvet Brew. By browsing our website, placing an order, or using our admin tools, you agree to comply with and be bound by these Terms and Conditions. If you disagree with any part of these terms, you should immediately cease using our application." },
    { id: "t2", title: "2. Ordering & Payment", text: "All orders placed are subject to product availability and acceptance by our cafe staff. Payments must be settled through our secure integration channels. We reserve the right to cancel orders if item stock runs out or in case of payment failure." },
    { id: "t3", title: "3. Pricing & Offers", text: "Prices listed are in Indian Rupees (INR) and are inclusive of local taxes unless specified otherwise. We reserve the right to change menu prices or end promo offers (like the flat rate Hot Coffee deal) at any time without prior notice." },
    { id: "t4", title: "4. Delivery & Takeaway", text: "Customers are responsible for selecting the correct order mode (Dine-in or Takeaway) and collecting their orders from our designated pickup address. We endeavor to prepare items within the estimated time frame, but do not guarantee precise pickup minutes." },
    { id: "t5", title: "5. Cancellations & Refunds", text: "Orders cannot be cancelled once preparation has begun. Refunds or replacements for incorrect, damaged, or uncollected orders are handled on a case-by-case basis at our storefront. Decisions made by our management are final." },
    { id: "t6", title: "6. Account Security", text: "Access to our admin dashboard is password-restricted. Authorized personnel are responsible for preserving the confidentiality of credentials. Any unauthorized transactions or modifications made under an account must be reported immediately." },
    { id: "t7", title: "7. Intellectual Property", text: "All design systems, logos, text copy, graphic elements, custom icons, and source code are the intellectual property of Velvet Brew. You are prohibited from copying, distributing, or modifying any assets without written permission." },
    { id: "t8", title: "8. Prohibited Actions", text: "You agree not to disrupt the website operations, deploy automated scraping bots, introduce malicious scripts, submit false order requests, or attempt to bypass page gates or proxy configurations." },
    { id: "t9", title: "9. Disclaimer of Warranties", text: "Our website and order services are provided on an 'as-is' and 'as-available' basis without warranties of any kind. We do not warrant that our servers, APIs, or database endpoints will be constantly online or free from defects." },
    { id: "t10", title: "10. Limitation of Liability", text: "Under no circumstances shall Velvet Brew, its owners, or employees be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services, menu ordering, or payment integrations." },
    { id: "t11", title: "11. Modifications to Terms", text: "We reserve the right to revise these Terms and Conditions at our sole discretion. Any updates will be posted directly inside this modal and will become effective immediately upon publication." },
    { id: "t12", title: "12. Contact Information", text: "If you have questions regarding these Terms or our Privacy Policy, please contact us at hello@velvetbrew.com or visit us at: Opp. City Hospital, Avas Vikas Road, Shastri Nagar, Civil Lines, Budaun, Uttar Pradesh – 243601." }
];

export default function LegalModal({ open, initialTab, onClose }: LegalModalProps) {
    const [activeTab, setActiveTab] = useState<"privacy" | "terms">(initialTab);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            setActiveTab(initialTab);
            // Reset scroll position to top when modal opens
            if (contentRef.current) {
                contentRef.current.scrollTop = 0;
            }
        }
    }, [open, initialTab]);

    if (!open) return null;

    const sections = activeTab === "privacy" ? PRIVACY_SECTIONS : TERMS_SECTIONS;

    const handleSidebarClick = (id: string) => {
        const element = document.getElementById(id);
        if (element && contentRef.current) {
            // Calculate child offset relative to container
            const containerTop = contentRef.current.getBoundingClientRect().top;
            const elementTop = element.getBoundingClientRect().top;
            const relativeTop = elementTop - containerTop + contentRef.current.scrollTop;
            
            contentRef.current.scrollTo({
                top: relativeTop - 10, // 10px padding from top
                behavior: "smooth"
            });
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6" style={{ background: "rgba(0,0,0,0.65)" }}>
            <div 
                className="relative w-full max-w-5xl h-[85vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl transition-all duration-300"
                style={{ 
                    background: "#F9F6F0", 
                    color: "#2D241E",
                    fontFamily: "'Outfit', sans-serif",
                    border: "1px solid rgba(199, 154, 86, 0.2)"
                }}
            >
                {/* Header */}
                <div className="px-6 md:px-8 pt-6 pb-4 flex justify-between items-start shrink-0">
                    <div>
                        <h2 
                            className="vb-display text-2xl md:text-3xl font-semibold"
                            style={{ color: "#2D241E" }}
                        >
                            {activeTab === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
                        </h2>
                        <p className="text-[11px] md:text-xs mt-1" style={{ color: "#7E6E5A" }}>
                            Last updated 31 Jul 2026 · effective 31 Jul 2026
                        </p>
                    </div>

                    <button 
                        onClick={onClose}
                        className="p-1.5 rounded-full hover:bg-black/5 transition cursor-pointer"
                        style={{ color: "#2D241E" }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Horizontal separator */}
                <div className="h-[1px] w-full shrink-0" style={{ background: "rgba(199, 154, 86, 0.15)" }} />

                {/* Tab Pill Selectors */}
                <div className="px-6 md:px-8 py-4 flex gap-3 shrink-0">
                    <button
                        onClick={() => setActiveTab("privacy")}
                        className="flex items-center gap-2 rounded-full px-5 py-2 text-xs md:text-sm font-medium transition cursor-pointer"
                        style={
                            activeTab === "privacy"
                                ? { background: COLORS.gold, color: COLORS.espresso }
                                : { border: `1.5px solid ${COLORS.gold}`, color: COLORS.gold, background: "transparent" }
                        }
                    >
                        <Shield size={14} />
                        Privacy Policy
                    </button>

                    <button
                        onClick={() => setActiveTab("terms")}
                        className="flex items-center gap-2 rounded-full px-5 py-2 text-xs md:text-sm font-medium transition cursor-pointer"
                        style={
                            activeTab === "terms"
                                ? { background: COLORS.gold, color: COLORS.espresso }
                                : { border: `1.5px solid ${COLORS.gold}`, color: COLORS.gold, background: "transparent" }
                        }
                    >
                        <Scale size={14} />
                        Terms & Conditions
                    </button>
                </div>

                {/* Body split column */}
                <div className="flex-1 flex overflow-hidden">
                    
                    {/* Sidebar / Left Column (Visible on md+) */}
                    <div 
                        className="hidden md:block w-64 shrink-0 px-8 py-4 overflow-y-auto"
                        style={{ borderRight: "1px solid rgba(199, 154, 86, 0.15)" }}
                    >
                        <p className="text-[10px] tracking-wider uppercase font-bold mb-4" style={{ color: "#7E6E5A" }}>
                            ON THIS PAGE
                        </p>
                        
                        <div className="space-y-3">
                            {sections.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => handleSidebarClick(s.id)}
                                    className="block text-left text-xs hover:text-[#C79A56] transition cursor-pointer w-full leading-normal"
                                    style={{ color: "#7E6E5A" }}
                                >
                                    {s.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Panel / Right Column */}
                    <div 
                        ref={contentRef}
                        className="flex-1 overflow-y-auto px-6 md:px-8 py-4 space-y-6 scrollbar-thin vb-scrollbar"
                    >
                        {/* Description */}
                        <p className="text-xs md:text-sm leading-relaxed" style={{ color: "#4E3E34" }}>
                            {activeTab === "privacy" 
                                ? "How Velvet Brew Café collects, uses and protects your personal data when you browse our menu, place an order or join our loyalty programme."
                                : "The terms, rules, and guidelines governing your transactions, platform interactions, and rights when ordering from Velvet Brew Café."
                            }
                        </p>

                        {/* Short Version Container */}
                        <div 
                            className="rounded-2xl p-5 border space-y-3"
                            style={{ 
                                background: "#F1EADF", 
                                borderColor: "rgba(199, 154, 86, 0.4)" 
                            }}
                        >
                            <div className="flex items-center gap-2 text-xs font-bold tracking-wide uppercase" style={{ color: "#8C5A34" }}>
                                <Info size={14} />
                                THE SHORT VERSION
                            </div>

                            <ul className="list-disc list-inside text-xs space-y-2 leading-relaxed" style={{ color: "#4E3E34" }}>
                                {activeTab === "privacy" ? (
                                    <>
                                        <li>We collect your name and mobile number so we can make and hand over your order — plus your address only if you choose delivery.</li>
                                        <li>We never see or store your card number, CVV, UPI PIN or net-banking password. Razorpay handles the payment.</li>
                                        <li>We message you on WhatsApp about your order, not to advertise. You can opt out any time.</li>
                                        <li>We do not sell your data or share it with advertisers.</li>
                                        <li>You can ask us to show, correct or delete your data by writing to our Grievance Officer.</li>
                                    </>
                                ) : (
                                    <>
                                        <li>By checking out or accessing our site, you agree to be bound by these local terms and service rules.</li>
                                        <li>Orders placed depend on stock availability; we reserve the right to decline or cancel orders as necessary.</li>
                                        <li>Pricing is in INR and include taxes. Offers like the deal on Hot Coffee are subject to change.</li>
                                        <li>Cancellations are blocked once order prep begins. Refund issues are reviewed individually at our store.</li>
                                        <li>All site assets, logos, and custom code are proprietary intellectual property. No scraping or botting allowed.</li>
                                    </>
                                )}
                                <li className="list-none pt-1 italic font-medium" style={{ color: "#7E6E5A" }}>
                                    This summary is for convenience only — the full text below is what applies.
                                </li>
                            </ul>
                        </div>

                        {/* Detailed Sections */}
                        <div className="space-y-6 pt-2">
                            {sections.map((s) => (
                                <div key={s.id} id={s.id} className="space-y-2">
                                    <h4 
                                        className="vb-display text-sm md:text-base font-semibold"
                                        style={{ color: "#2D241E" }}
                                    >
                                        {s.title}
                                    </h4>
                                    <p className="text-xs md:text-sm leading-relaxed" style={{ color: "#4E3E34" }}>
                                        {s.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer horizontal separator */}
                <div className="h-[1px] w-full shrink-0" style={{ background: "rgba(199, 154, 86, 0.15)" }} />

                {/* Footer */}
                <div className="px-6 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 bg-[#F1EADF]">
                    <p className="text-[10px] md:text-xs text-center sm:text-left leading-normal" style={{ color: "#7E6E5A" }}>
                        Questions about either document? Write to our Grievance Officer — the address is at the end.
                    </p>

                    <div className="flex gap-3 w-full sm:w-auto">
                        <button
                            onClick={handlePrint}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-full border px-5 py-2.5 text-xs font-semibold hover:bg-black/5 transition cursor-pointer"
                            style={{ borderColor: "rgba(199, 154, 86, 0.4)", color: "#2D241E" }}
                        >
                            <Printer size={13} />
                            Print / save as PDF
                        </button>

                        <button
                            onClick={onClose}
                            className="flex-1 sm:flex-none rounded-full px-6 py-2.5 text-xs font-semibold shadow-sm transition cursor-pointer hover:brightness-95 active:scale-98"
                            style={{ background: COLORS.gold, color: COLORS.espresso }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
