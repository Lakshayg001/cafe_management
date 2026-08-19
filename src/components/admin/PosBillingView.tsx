import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { rupee } from "../../utils/currency";

interface PosBillingViewProps {
  items: any[];
}

export default function PosBillingView({ items }: PosBillingViewProps) {
  const [query, setQuery] = useState("");
  const [channel, setChannel] = useState<"dine-in" | "takeaway">("dine-in");
  const [cat, setCat] = useState<string>("all");

  const categories = [
    { id: "1", name: "Hot Coffee", emoji: "☕" },
    { id: "2", name: "Cold Coffee", emoji: "🧊" },
    { id: "3", name: "Shakes", emoji: "🥤" },
    { id: "4", name: "Café Bites", emoji: "🥐" },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      const matchCat = cat === "all" || String(i.categoryId) === cat;
      const matchQuery = !q || i.name.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [items, cat, query]);

  return (
    <div className="flex-1 p-6 h-screen overflow-y-auto bg-[#FDFBF7] vb-scrollbar">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center max-w-4xl mb-6">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B7355]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the menu…"
            className="h-12 w-full rounded-2xl border border-[#e8dfd5] bg-white pl-11 pr-4 text-[14px] focus:border-[#D4AF37] focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/20 text-[#2C1810]"
          />
        </div>

        <div className="flex shrink-0 items-center gap-1 rounded-2xl border border-[#e8dfd5] bg-white p-1">
          <button
            onClick={() => setChannel("dine-in")}
            className={`relative rounded-xl px-4 py-2 text-[13px] font-bold transition-colors ${
              channel === "dine-in" ? "bg-gradient-to-b from-[#e8dfd5] to-[#d4c5b0] text-[#2C1810]" : "text-[#8B7355]"
            }`}
          >
            Dine-in
          </button>
          <button
            onClick={() => setChannel("takeaway")}
            className={`relative rounded-xl px-4 py-2 text-[13px] font-bold transition-colors ${
              channel === "takeaway" ? "bg-gradient-to-b from-[#e8dfd5] to-[#d4c5b0] text-[#2C1810]" : "text-[#8B7355]"
            }`}
          >
            Takeaway
          </button>
        </div>
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 mb-6">
        <button
          onClick={() => setCat("all")}
          className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2 text-[13px] font-bold transition-all ${
            cat === "all"
              ? "border-[#2C1810] bg-[#2C1810] text-[#fdfbf7]"
              : "border-[#e8dfd5] bg-white text-[#8B7355] hover:border-[#d4c5b0]"
          }`}
        >
          <span>✨</span> All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2 text-[13px] font-bold transition-all ${
              cat === c.id
                ? "border-[#2C1810] bg-[#2C1810] text-[#fdfbf7]"
                : "border-[#e8dfd5] bg-white text-[#8B7355] hover:border-[#d4c5b0]"
            }`}
          >
            <span>{c.emoji}</span> {c.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-3xl border border-[#e8dfd5] bg-white text-left shadow-sm transition-shadow hover:shadow-md cursor-pointer"
          >
            <div className="aspect-[5/3] w-full bg-[#2C1810] flex items-center justify-center relative overflow-hidden pattern-dots">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover opacity-80" />
              ) : (
                <span className="text-4xl relative z-10">{
                  categories.find(c => String(item.categoryId) === c.id)?.emoji || "☕"
                }</span>
              )}
            </div>
            <div className="p-4">
              <p className="truncate text-[14px] font-bold leading-tight text-[#2C1810]">
                {item.name}
              </p>
              <p className="mt-1 font-display text-[16px] font-bold text-[#8B7355]">
                {rupee(item.price)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-[16px] font-bold text-[#2C1810]">No items match</p>
          <p className="text-[13px] text-[#8B7355] mt-1">Try another category or clear the search.</p>
        </div>
      )}
    </div>
  );
}
