import { Product } from "./products";

export interface categoryItem {
    id: number;
    categoryName: string;
}

export interface Category {
    id: number;
    categoryName: string;
    products: Product[]
}