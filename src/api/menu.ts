const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";
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