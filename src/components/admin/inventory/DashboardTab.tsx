import { useState, useEffect } from "react";
import { Package, AlertTriangle, IndianRupee, ArrowRight } from "lucide-react";
import { getItems } from "../../../api/inventory";
import type { InventoryItem } from "../../../types";

export default function DashboardTab() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItems().then(data => {
      setItems(data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const stockValue = items.reduce((acc, item) => acc + (item.currentStock * item.unitCost), 0);
  const lowStockItems = items.filter(i => i.lowStock || i.outOfStock);
  const outOfStockCount = items.filter(i => i.outOfStock).length;

  return (
    <div className="space-y-6 h-full overflow-y-auto vb-scrollbar pr-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Value */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e8dfd5] flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B7355] mb-2">
              Stock Value
            </p>
            <h3 className="text-3xl font-display font-bold text-[#2C1810]">
              <span className="text-[#8B7355]">₹</span>
              {loading ? "..." : stockValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </h3>
            <p className="text-xs text-[#8B7355] mt-2">Current inventory value</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#FDFBF7] border border-[#e8dfd5] flex items-center justify-center text-[#2C1810]">
            <IndianRupee size={20} />
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-[#D4AF37]/20 p-6 rounded-2xl shadow-sm border border-[#D4AF37]/30 flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#2C1810] mb-2">
              Attention Needed
            </p>
            <h3 className="text-3xl font-display font-bold text-[#2C1810]">
              {loading ? "..." : lowStockItems.length}
            </h3>
            <p className="text-xs text-[#2C1810]/70 mt-2">
              {outOfStockCount} out of stock
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#2C1810]/10 flex items-center justify-center text-[#2C1810]">
            <AlertTriangle size={20} />
          </div>
        </div>

        {/* Items */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e8dfd5] flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B7355] mb-2">
              Tracked Items
            </p>
            <h3 className="text-3xl font-display font-bold text-[#2C1810]">
              {loading ? "..." : items.length}
            </h3>
            <p className="text-xs text-[#8B7355] mt-2">Total catalog size</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#FDFBF7] border border-[#e8dfd5] flex items-center justify-center text-[#2C1810]">
            <Package size={20} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e8dfd5]">
        <h3 className="text-lg font-bold text-[#2C1810] mb-4">Needs Attention</h3>
        
        {loading ? (
          <div className="py-8 text-center text-[#8B7355]">Loading...</div>
        ) : lowStockItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-4">
              <Package size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#2C1810] mb-2">All Good!</h3>
            <p className="text-[#8B7355] max-w-sm">
              All inventory items are sufficiently stocked.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#e8dfd5]">
            {lowStockItems.map(item => (
              <div key={item.id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${item.outOfStock ? 'bg-red-500' : 'bg-orange-500'}`} />
                  <div>
                    <p className="font-bold text-[#2C1810]">{item.name}</p>
                    <p className="text-xs text-[#8B7355]">SKU: {item.sku} &bull; {item.supplierName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${item.outOfStock ? 'text-red-600' : 'text-orange-500'}`}>
                    {item.currentStock} {item.unit}
                  </p>
                  <p className="text-[10px] text-[#8B7355] uppercase tracking-wider mt-0.5">
                    Reorder at {item.reorderLevel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
