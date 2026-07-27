import {
    Coffee,
    Snowflake,
    CupSoda,
    UtensilsCrossed,
} from "lucide-react";

import type {
    Category,
    MenuItem,
    CategoryId,
} from "../types";

export const CATEGORIES: Category[] = [
    {
        id: "hot",
        label: "Hot Coffee",
        icon: Coffee,
    },
    {
        id: "cold",
        label: "Cold Coffee",
        icon: Snowflake,
    },
    {
        id: "shakes",
        label: "Shakes",
        icon: CupSoda,
    },
    {
        id: "bites",
        label: "Café Bites",
        icon: UtensilsCrossed,
    },
];

export const MENU: Record<CategoryId, MenuItem[]> = {
    hot: [
        { id: "h1", name: "Espresso", price: 59 },
        { id: "h2", name: "Americano", price: 69 },
        { id: "h3", name: "Cappuccino", price: 89 },
        { id: "h4", name: "Café Latte", price: 99 },
        { id: "h5", name: "Mocha", price: 109 },
        { id: "h6", name: "Hot Chocolate", price: 99 },
        { id: "h7", name: "Spanish Latte", price: 119 },
        { id: "h8", name: "Hazelnut Latte", price: 119 },
        { id: "h9", name: "Caramel Latte", price: 119 },
    ],

    cold: [
        { id: "c1", name: "Classic Cold Coffee", price: 99 },
        { id: "c2", name: "Velvet Brew Cold Coffee", price: 119 },
        { id: "c3", name: "Spanish Cold Coffee", price: 129 },
        { id: "c4", name: "Hazelnut Frappe", price: 139 },
        { id: "c5", name: "Caramel Frappe", price: 139 },
    ],

    shakes: [
        { id: "s1", name: "Vanilla Shake", price: 99 },
        { id: "s2", name: "Strawberry Shake", price: 109 },
        { id: "s3", name: "Chocolate Shake", price: 119 },
        { id: "s4", name: "Oreo Shake", price: 129 },
        { id: "s5", name: "Berry Shake", price: 129 },
    ],

    bites: [
        { id: "b1", name: "White Sauce Pasta", price: 149 },
        { id: "b2", name: "Red Sauce Pasta", price: 149 },
        { id: "b3", name: "Veg Sandwich", price: 99 },
        { id: "b4", name: "Paneer Sandwich", price: 119 },
        { id: "b5", name: "Cheesy Fries", price: 99 },
        { id: "b6", name: "Peri Peri Fries", price: 109 },
    ],
};

export const PROMO_HOT_PRICE = 79;