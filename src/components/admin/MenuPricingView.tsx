import { useState, useEffect, useMemo } from "react";
import { getMenu, getCategories, createMenuItem, updateMenuItem, createCategory, updateCategory, ApiMenuItem, ApiCategory } from "../../api/menu";
import { Search, Plus, Edit2, Package, Tag, Check, X } from "lucide-react";

type Tab = "items" | "categories";

export default function MenuPricingView() {
  const [tab, setTab] = useState<Tab>("items");
  const [items, setItems] = useState<ApiMenuItem[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [query, setQuery] = useState("");
  const [filterCat, setFilterCat] = useState<string>("all");

  // Modals state
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ApiMenuItem | null>(null);
  
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<ApiCategory | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [fetchedItems, fetchedCats] = await Promise.all([getMenu(), getCategories()]);
      setItems(fetchedItems);
      setCategories(fetchedCats);
    } catch (err) {
      console.error("Failed to load menu data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(query.toLowerCase());
      const matchesCat = filterCat === "all" || item.categoryId.toString() === filterCat;
      return matchesSearch && matchesCat;
    });
  }, [items, query, filterCat]);

  return (
    <div className="flex-1 p-4 md:p-6 h-full overflow-y-auto bg-[#FDFBF7] vb-scrollbar pb-24 md:pb-6 relative">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-2 p-1 bg-white border border-[#e8dfd5] rounded-xl self-start">
            <button
              onClick={() => setTab("items")}
              className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all ${
                tab === "items" ? "bg-[#2C1810] text-[#FDFBF7]" : "text-[#8B7355] hover:bg-[#e8dfd5]"
              }`}
            >
              Menu Items
            </button>
            <button
              onClick={() => setTab("categories")}
              className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all ${
                tab === "categories" ? "bg-[#2C1810] text-[#FDFBF7]" : "text-[#8B7355] hover:bg-[#e8dfd5]"
              }`}
            >
              Categories
            </button>
          </div>
          
          {tab === "items" ? (
            <button
              onClick={() => { setEditingItem(null); setIsItemModalOpen(true); }}
              className="flex items-center justify-center gap-2 bg-[#D4AF37] text-[#2C1810] px-4 py-2 rounded-xl text-[13px] font-bold shadow-sm hover:bg-[#c4a130] transition-colors"
            >
              <Plus size={16} /> New Item
            </button>
          ) : (
            <button
              onClick={() => { setEditingCat(null); setIsCatModalOpen(true); }}
              className="flex items-center justify-center gap-2 bg-[#D4AF37] text-[#2C1810] px-4 py-2 rounded-xl text-[13px] font-bold shadow-sm hover:bg-[#c4a130] transition-colors"
            >
              <Plus size={16} /> New Category
            </button>
          )}
        </div>

        {loading ? (
          <div className="py-20 text-center text-[#8B7355] font-semibold">Loading data...</div>
        ) : (
          <>
            {/* ITEMS TAB */}
            {tab === "items" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7355]" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search items..."
                      className="w-full bg-white border border-[#e8dfd5] pl-10 pr-4 py-2.5 rounded-xl text-[14px] text-[#2C1810] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>
                  <select
                    value={filterCat}
                    onChange={(e) => setFilterCat(e.target.value)}
                    className="bg-white border border-[#e8dfd5] px-4 py-2.5 rounded-xl text-[14px] text-[#2C1810] font-medium focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id.toString()}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredItems.map(item => (
                    <div key={item.id} className="bg-white border border-[#e8dfd5] rounded-3xl overflow-hidden flex flex-col shadow-sm">
                      <div className="h-32 bg-[#2C1810] relative">
                        {item.imageUrl ? (
                          <img 
                            src={item.imageUrl.startsWith("s3://velvetbrew/") ? item.imageUrl.replace("s3://velvetbrew/", "https://velvetbrew.s3.ap-south-1.amazonaws.com/") : item.imageUrl} 
                            alt={item.name} 
                            className="w-full h-full object-cover opacity-80"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl opacity-50">☕</div>
                        )}
                        {!item.available && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm">
                            Unavailable
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-[15px] text-[#2C1810] leading-tight flex-1 pr-2">{item.name}</h3>
                          <span className="text-[10px] font-semibold bg-[#fdfbf7] border border-[#e8dfd5] px-2 py-0.5 rounded-lg text-[#8B7355] shrink-0">
                            {categories.find(c => c.id === item.categoryId)?.name || item.categoryName || "Unknown"}
                          </span>
                        </div>
                        <p className="text-[12px] text-[#8B7355] line-clamp-2 mb-3 flex-1">{item.description || "No description."}</p>
                        
                        <div className="flex items-center justify-between border-t border-[#e8dfd5] pt-3 mt-auto">
                          <div>
                            <span className="font-display font-bold text-[16px] text-[#2C1810]">
                              ₹{item.offerPrice !== null && item.offerPrice !== undefined ? item.offerPrice : item.price}
                            </span>
                            {item.offerPrice !== null && item.offerPrice !== undefined && item.offerPrice < item.price && (
                              <span className="ml-1.5 text-[11px] text-[#8B7355] line-through">₹{item.price}</span>
                            )}
                          </div>
                          <button
                            onClick={() => { setEditingItem(item); setIsItemModalOpen(true); }}
                            className="p-1.5 text-[#8B7355] hover:text-[#2C1810] hover:bg-[#e8dfd5] rounded-lg transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredItems.length === 0 && (
                    <div className="col-span-full py-10 text-center text-[#8B7355] border-2 border-dashed border-[#e8dfd5] rounded-3xl">
                      No items found.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CATEGORIES TAB */}
            {tab === "categories" && (
              <div className="bg-white border border-[#e8dfd5] rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-[#fdfbf7] border-b border-[#e8dfd5]">
                    <tr>
                      <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#8B7355]">Category Name</th>
                      <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#8B7355]">Description</th>
                      <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#8B7355]">Status</th>
                      <th className="px-5 py-4 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8dfd5]">
                    {categories.map((c) => (
                      <tr key={c.id} className="hover:bg-[#fdfbf7]/50 transition-colors">
                        <td className="px-5 py-4 text-[14px] font-bold text-[#2C1810]">{c.name}</td>
                        <td className="px-5 py-4 text-[13px] text-[#8B7355]">{c.description || "-"}</td>
                        <td className="px-5 py-4">
                          {c.active ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                              <Check size={12} /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                              <X size={12} /> Inactive
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() => { setEditingCat(c); setIsCatModalOpen(true); }}
                            className="inline-flex items-center justify-center p-2 text-[#8B7355] hover:text-[#2C1810] hover:bg-[#e8dfd5] rounded-xl transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {categories.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-5 py-10 text-center text-[#8B7355]">No categories found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      <ItemModal 
        isOpen={isItemModalOpen} 
        onClose={() => setIsItemModalOpen(false)} 
        item={editingItem} 
        categories={categories}
        onSave={loadData}
      />

      <CategoryModal 
        isOpen={isCatModalOpen} 
        onClose={() => setIsCatModalOpen(false)} 
        category={editingCat} 
        onSave={loadData}
      />
    </div>
  );
}

// ------------------------------------------------------------
// MODALS
// ------------------------------------------------------------

function ItemModal({ isOpen, onClose, item, categories, onSave }: { isOpen: boolean; onClose: () => void; item: ApiMenuItem | null; categories: ApiCategory[]; onSave: () => void; }) {
  const [formData, setFormData] = useState<Partial<ApiMenuItem>>({
    categoryId: categories.length > 0 ? categories[0].id : 0,
    name: "",
    description: "",
    price: 0,
    offerPrice: null,
    imageUrl: "",
    veg: true,
    available: true,
    featured: false,
    displayOrder: 1,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (item) {
        setFormData({ ...item });
      } else {
        setFormData({
          categoryId: categories.length > 0 ? categories[0].id : 0,
          name: "",
          description: "",
          price: 0,
          offerPrice: null,
          imageUrl: "",
          veg: true,
          available: true,
          featured: false,
          displayOrder: 1,
        });
      }
      setError(null);
    }
  }, [isOpen, item, categories]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) return setError("Name is required");
    if (!formData.categoryId) return setError("Category is required");
    
    setSubmitting(true);
    setError(null);
    try {
      if (item) {
        await updateMenuItem({ ...formData, id: item.id } as any);
      } else {
        await createMenuItem(formData as any);
      }
      onSave();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save item");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-full">
        <div className="px-6 py-4 border-b border-[#e8dfd5] flex justify-between items-center bg-[#FDFBF7]">
          <h2 className="font-display text-[18px] font-bold text-[#2C1810]">
            {item ? "Edit Menu Item" : "New Menu Item"}
          </h2>
          <button onClick={onClose} className="p-1 text-[#8B7355] hover:bg-[#e8dfd5] rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 vb-scrollbar">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-[13px] font-medium">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-[12px] font-bold uppercase tracking-wider text-[#8B7355] mb-1.5">Name</label>
              <input 
                type="text" required
                value={formData.name || ""} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white border border-[#e8dfd5] px-4 py-2.5 rounded-xl text-[14px] text-[#2C1810] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider text-[#8B7355] mb-1.5">Category</label>
                <select 
                  required
                  value={formData.categoryId || ""}
                  onChange={(e) => setFormData({...formData, categoryId: Number(e.target.value)})}
                  className="w-full bg-white border border-[#e8dfd5] px-4 py-2.5 rounded-xl text-[14px] text-[#2C1810] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="" disabled>Select category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider text-[#8B7355] mb-1.5">Display Order</label>
                <input 
                  type="number" required min="1"
                  value={formData.displayOrder || 1} 
                  onChange={(e) => setFormData({...formData, displayOrder: Number(e.target.value)})}
                  className="w-full bg-white border border-[#e8dfd5] px-4 py-2.5 rounded-xl text-[14px] text-[#2C1810] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold uppercase tracking-wider text-[#8B7355] mb-1.5">Description</label>
              <textarea 
                rows={2}
                value={formData.description || ""} 
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-white border border-[#e8dfd5] px-4 py-2.5 rounded-xl text-[14px] text-[#2C1810] focus:outline-none focus:border-[#D4AF37] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider text-[#8B7355] mb-1.5">Regular Price (₹)</label>
                <input 
                  type="number" required min="0" step="0.01"
                  value={formData.price || 0} 
                  onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                  className="w-full bg-white border border-[#e8dfd5] px-4 py-2.5 rounded-xl text-[14px] text-[#2C1810] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider text-[#8B7355] mb-1.5">Offer Price (₹)</label>
                <input 
                  type="number" min="0" step="0.01"
                  value={formData.offerPrice === null ? "" : formData.offerPrice} 
                  onChange={(e) => setFormData({...formData, offerPrice: e.target.value ? Number(e.target.value) : null})}
                  placeholder="Optional"
                  className="w-full bg-white border border-[#e8dfd5] px-4 py-2.5 rounded-xl text-[14px] text-[#2C1810] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold uppercase tracking-wider text-[#8B7355] mb-1.5">Image URL</label>
              <input 
                type="text"
                value={formData.imageUrl || ""} 
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                placeholder="https://..."
                className="w-full bg-white border border-[#e8dfd5] px-4 py-2.5 rounded-xl text-[14px] text-[#2C1810] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <label className="flex items-center gap-2 cursor-pointer bg-[#fdfbf7] border border-[#e8dfd5] p-3 rounded-xl hover:border-[#D4AF37] transition-colors">
                <input 
                  type="checkbox" 
                  checked={formData.available ?? true}
                  onChange={(e) => setFormData({...formData, available: e.target.checked})}
                  className="w-4 h-4 text-[#D4AF37] rounded focus:ring-[#D4AF37]"
                />
                <span className="text-[13px] font-bold text-[#2C1810]">Available</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer bg-[#fdfbf7] border border-[#e8dfd5] p-3 rounded-xl hover:border-[#D4AF37] transition-colors">
                <input 
                  type="checkbox" 
                  checked={formData.veg ?? true}
                  onChange={(e) => setFormData({...formData, veg: e.target.checked})}
                  className="w-4 h-4 text-[#D4AF37] rounded focus:ring-[#D4AF37]"
                />
                <span className="text-[13px] font-bold text-[#2C1810]">Veg</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer bg-[#fdfbf7] border border-[#e8dfd5] p-3 rounded-xl hover:border-[#D4AF37] transition-colors">
                <input 
                  type="checkbox" 
                  checked={formData.featured ?? false}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="w-4 h-4 text-[#D4AF37] rounded focus:ring-[#D4AF37]"
                />
                <span className="text-[13px] font-bold text-[#2C1810]">Featured</span>
              </label>
            </div>
          </div>
          
          <div className="pt-4 border-t border-[#e8dfd5] flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl font-bold text-[14px] text-[#8B7355] hover:bg-[#e8dfd5] transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="px-5 py-2.5 rounded-xl font-bold text-[14px] bg-[#D4AF37] text-[#2C1810] hover:bg-[#c4a130] shadow-sm transition-colors disabled:opacity-50">
              {submitting ? "Saving..." : "Save Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CategoryModal({ isOpen, onClose, category, onSave }: { isOpen: boolean; onClose: () => void; category: ApiCategory | null; onSave: () => void; }) {
  const [formData, setFormData] = useState<Partial<ApiCategory>>({
    name: "",
    description: "",
    active: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (category) {
        setFormData({ ...category });
      } else {
        setFormData({
          name: "",
          description: "",
          active: true,
        });
      }
      setError(null);
    }
  }, [isOpen, category]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) return setError("Name is required");
    
    setSubmitting(true);
    setError(null);
    try {
      if (category) {
        await updateCategory({ ...formData, id: category.id } as any);
      } else {
        await createCategory(formData as any);
      }
      onSave();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save category");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-[#e8dfd5] flex justify-between items-center bg-[#FDFBF7]">
          <h2 className="font-display text-[18px] font-bold text-[#2C1810]">
            {category ? "Edit Category" : "New Category"}
          </h2>
          <button onClick={onClose} className="p-1 text-[#8B7355] hover:bg-[#e8dfd5] rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-[13px] font-medium">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-[12px] font-bold uppercase tracking-wider text-[#8B7355] mb-1.5">Name</label>
              <input 
                type="text" required
                value={formData.name || ""} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white border border-[#e8dfd5] px-4 py-2.5 rounded-xl text-[14px] text-[#2C1810] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold uppercase tracking-wider text-[#8B7355] mb-1.5">Description</label>
              <textarea 
                rows={2}
                value={formData.description || ""} 
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-white border border-[#e8dfd5] px-4 py-2.5 rounded-xl text-[14px] text-[#2C1810] focus:outline-none focus:border-[#D4AF37] resize-none"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer bg-[#fdfbf7] border border-[#e8dfd5] p-3 rounded-xl hover:border-[#D4AF37] transition-colors">
              <input 
                type="checkbox" 
                checked={formData.active ?? true}
                onChange={(e) => setFormData({...formData, active: e.target.checked})}
                className="w-4 h-4 text-[#D4AF37] rounded focus:ring-[#D4AF37]"
              />
              <span className="text-[13px] font-bold text-[#2C1810]">Active</span>
            </label>
          </div>
          
          <div className="pt-4 border-t border-[#e8dfd5] flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl font-bold text-[14px] text-[#8B7355] hover:bg-[#e8dfd5] transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="px-5 py-2.5 rounded-xl font-bold text-[14px] bg-[#D4AF37] text-[#2C1810] hover:bg-[#c4a130] shadow-sm transition-colors disabled:opacity-50">
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
