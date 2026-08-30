const BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? "https://api.velvetbrew.in/api/v1" : "/api/v1");
export interface ApiCategory {
    id: number;
    name: string;
    description: string;
    active: boolean;
}

export interface ApiMenuItem {
    id: number;
    categoryId: number;
    categoryName: string;
    name: string;
    description: string;
    price: number;
    offerPrice: number | null;
    imageUrl: string;
    veg: boolean;
    available: boolean;
    featured: boolean;
    displayOrder: number;
}

export async function getMenu(): Promise<ApiMenuItem[]> {
    const response = await fetch(`${BASE_URL}/customer/menu`);

    if (!response.ok) {
        throw new Error("Failed to fetch menu");
    }

    const result = await response.json();

    return result.data;
}

export async function getCategories(): Promise<ApiCategory[]> {
    const response = await fetch(`${BASE_URL}/category`);

    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }

    const result = await response.json();

    return result.data;
}

export async function createMenuItem(item: Omit<ApiMenuItem, "id" | "categoryName">): Promise<ApiMenuItem> {
    const response = await fetch(`${BASE_URL}/customer/menu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error("Failed to create menu item");
    const result = await response.json();
    return result.data;
}

export async function updateMenuItem(item: Partial<ApiMenuItem> & { id: number }): Promise<ApiMenuItem> {
    const response = await fetch(`${BASE_URL}/customer/menu`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error("Failed to update menu item");
    const result = await response.json();
    return result.data;
}

export async function createCategory(category: Omit<ApiCategory, "id">): Promise<ApiCategory> {
    const response = await fetch(`${BASE_URL}/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
    });
    if (!response.ok) throw new Error("Failed to create category");
    const result = await response.json();
    return result.data;
}

export async function updateCategory(category: Partial<ApiCategory> & { id: number }): Promise<ApiCategory> {
    const response = await fetch(`${BASE_URL}/category`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
    });
    if (!response.ok) throw new Error("Failed to update category");
    const result = await response.json();
    return result.data;
}