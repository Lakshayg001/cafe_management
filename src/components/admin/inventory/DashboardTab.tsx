import { Package, AlertTriangle, IndianRupee } from "lucide-react";

export default function DashboardTab() {
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
              <span className="text-[#8B7355]">₹</span>—
            </h3>
            <p className="text-xs text-[#8B7355] mt-2">Not available</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#FDFBF7] border border-[#e8dfd5] flex items-center justify-center text-[#2C1810]">
            <IndianRupee size={20} />
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-[#D4AF37]/20 p-6 rounded-2xl shadow-sm border border-[#D4AF37]/30 flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#2C1810] mb-2">
              Low Stock
            </p>
            <h3 className="text-3xl font-display font-bold text-[#2C1810]">—</h3>
            <p className="text-xs text-[#2C1810]/70 mt-2">Not available</p>
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
            <h3 className="text-3xl font-display font-bold text-[#2C1810]">—</h3>
            <p className="text-xs text-[#8B7355] mt-2">Not available</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#FDFBF7] border border-[#e8dfd5] flex items-center justify-center text-[#2C1810]">
            <Package size={20} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e8dfd5]">
        <h3 className="text-lg font-bold text-[#2C1810] mb-4">Stock Overview</h3>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FDFBF7] border border-[#e8dfd5] flex items-center justify-center text-[#8B7355] mb-4">
            <Package size={32} />
          </div>
          <h3 className="text-lg font-bold text-[#2C1810] mb-2">Waiting for Inventory Data</h3>
          <p className="text-[#8B7355] max-w-sm">
            The backend API for fetching current inventory items and stock levels is not yet available.
          </p>
        </div>
      </div>
    </div>
  );
}
