export interface InventoryCategory {
  id: number;
  name: string;
  description: string;
}

export interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  taxNumber: string;
  enabled: boolean;
}

export interface InventoryItem {
  id: number;
  categoryId: number;
  supplierId: number;
  name: string;
  sku: string;
  unit: string;
  minimumStock: number;
  maximumStock: number;
  reorderLevel: number;
  unitCost: number;
  // Note: current stock or other fields are missing intentionally until documented
}

export interface StockMovement {
  id?: number;
  itemId?: number;
  type?: string; 
  quantity?: number;
  unitCost?: number;
  reason?: string;
  createdAt?: string;
  date?: string;
  // This structure is a safe type to contain raw data since it wasn't provided,
  // we will just safely render any keys returned by the API if these don't exist.
}
