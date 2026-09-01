import { ArrowRightLeft } from "lucide-react";

export default function MovementsTab() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm border border-[#e8dfd5] p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#FDFBF7] border border-[#e8dfd5] flex items-center justify-center text-[#8B7355] mb-4">
        <ArrowRightLeft size={32} />
      </div>
      <h3 className="text-xl font-bold text-[#2C1810] mb-2">Item Movements</h3>
      <p className="text-[#8B7355] max-w-sm mb-6">
        Movements are tied to specific items. Once the backend items API is available, you will be able to view the stock in/out history for each item here or directly from the item list.
      </p>
    </div>
  );
}
