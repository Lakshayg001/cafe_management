import { useMemo, useState } from "react";

import "./index.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import OfferStrip from "./components/OfferStrip";
import MenuGrid from "./components/MenuGrid";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import LegalModal from "./components/LegalModal";

import { COLORS } from "./data/colors";
import { PROMO_HOT_PRICE } from "./data/menu";

import type {
  CartItem,
  CategoryId,
  Details,
  MenuItem,
  PaymentMethod,
} from "./types";

export default function App() {
  const [activeCategory, setActiveCategory] =
    useState<CategoryId>("hot");

  const [cart, setCart] = useState<
    Record<string, CartItem>
  >({});

  const [cartOpen, setCartOpen] =
    useState(false);

  const [checkoutOpen, setCheckoutOpen] =
    useState(false);

  const [legalOpen, setLegalOpen] =
    useState<"privacy" | "terms" | null>(null);

  const [payment, setPayment] =
    useState<PaymentMethod>("upi");

  const [details, setDetails] =
    useState<Details>({
      name: "",
      phone: "",
      mode: "Takeaway",
      note: "",
    });

  const priceFor = (
    category: CategoryId,
    item: MenuItem
  ) => {
    if (category === "hot") {
      return Math.min(
        item.price,
        PROMO_HOT_PRICE
      );
    }

    return item.price;
  };

  const addToCart = (
    category: CategoryId,
    item: MenuItem
  ) => {
    setCart((prev) => {
      const current = prev[item.id];

      return {
        ...prev,
        [item.id]: {
          category,
          item,
          qty: current
            ? current.qty + 1
            : 1,
        },
      };
    });
  };

  const changeQty = (
    id: string,
    delta: number
  ) => {
    setCart((prev) => {
      const current = prev[id];

      if (!current) return prev;

      const qty =
        current.qty + delta;

      if (qty <= 0) {
        const updated = {
          ...prev,
        };

        delete updated[id];

        return updated;
      }

      return {
        ...prev,
        [id]: {
          ...current,
          qty,
        },
      };
    });
  };

  const cartItems = useMemo(
    () => Object.values(cart),
    [cart]
  );

  const total = useMemo(() => {
    return cartItems.reduce(
      (sum, line) =>
        sum +
        priceFor(
          line.category,
          line.item
        ) *
        line.qty,
      0
    );
  }, [cartItems]);

  const savings = useMemo(() => {
    return cartItems.reduce(
      (sum, line) => {
        if (
          line.category !== "hot"
        )
          return sum;

        return (
          sum +
          (line.item.price -
            priceFor(
              line.category,
              line.item
            )) *
          line.qty
        );
      },
      0
    );
  }, [cartItems]);

  const cartCount = cartItems.reduce(
    (sum, item) =>
      sum + item.qty,
    0
  );

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const confirmOrder = () => {
    alert(
      "Order placed successfully!"
    );

    setCheckoutOpen(false);

    setCart({});

    setDetails({
      name: "",
      phone: "",
      mode: "Takeaway",
      note: "",
    });

    setPayment("upi");
  };
  return (
    <main
      className="min-h-screen"
      style={{
        background: COLORS.espresso,
      }}
    >
      <Header
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <Hero />

      <OfferStrip
        promoPrice={PROMO_HOT_PRICE}
      />

      <MenuGrid
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        cart={cart}
        promoPrice={PROMO_HOT_PRICE}
        addToCart={addToCart}
        changeQty={changeQty}
      />

      {/* Footer */}

      <footer
        id="visit"
        className="mt-20 px-6 py-14"
        style={{
          borderTop: `1px solid ${COLORS.line}`,
        }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

          <div>
            <h3
              className="vb-display text-2xl mb-3"
              style={{
                color: COLORS.cream,
              }}
            >
              Velvet Brew
            </h3>

            <p
              className="text-sm leading-7"
              style={{
                color: COLORS.muted,
              }}
            >
              Fresh coffee, handcrafted beverages,
              delicious café bites and warm hospitality.
              Made fresh every day.
            </p>
          </div>

          <div>
            <h4
              className="font-semibold mb-3"
              style={{
                color: COLORS.gold,
              }}
            >
              Opening Hours
            </h4>

            <div
              className="space-y-2 text-sm"
              style={{
                color: COLORS.muted,
              }}
            >
              <p>Monday – Sunday</p>
              <p>05:00 PM – 11:00 PM</p>
            </div>
          </div>

          <div>
            <h4
              className="font-semibold mb-3"
              style={{
                color: COLORS.gold,
              }}
            >
              Visit Us
            </h4>

            <div
              className="space-y-2 text-sm"
              style={{
                color: COLORS.muted,
              }}
            >
              <p>Opp. City Hospital, Avas Vikas Road, Shastri Nagar, Civil Lines, Budaun, Uttar Pradesh – 243601</p>
              <p>Contact: +91 8399999090</p>
              <p>hello@velvetbrew.com</p>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{
            borderTop: `1px solid ${COLORS.line}`,
            color: COLORS.clay,
          }}
        >
          <div>
            © {new Date().getFullYear()} Velvet Brew. All rights reserved.
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLegalOpen("privacy")}
              className="transition hover:text-white cursor-pointer"
              style={{ color: COLORS.muted }}
            >
              Privacy Policy
            </button>
            <span style={{ color: COLORS.line }}>|</span>
            <button
              onClick={() => setLegalOpen("terms")}
              className="transition hover:text-white cursor-pointer"
              style={{ color: COLORS.muted }}
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </footer>
      <CartDrawer
        open={cartOpen}
        cart={cart}
        total={total}
        savings={savings}
        onClose={() => setCartOpen(false)}
        changeQty={changeQty}
        priceFor={priceFor}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        open={checkoutOpen}
        details={details}
        payment={payment}
        total={total}
        savings={savings}
        onClose={() => setCheckoutOpen(false)}
        onPaymentChange={setPayment}
        onDetailsChange={(field, value) =>
          setDetails((prev) => ({
            ...prev,
            [field]: value,
          }))
        }
        onConfirm={confirmOrder}
      />

      <LegalModal
        open={legalOpen !== null}
        initialTab={legalOpen === "terms" ? "terms" : "privacy"}
        onClose={() => setLegalOpen(null)}
      />
    </main>
  );
}