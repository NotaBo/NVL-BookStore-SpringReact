export interface Product {
    [key: string]: any;
    id: number;
    name: string;
    description: string;
    unitPrice: number;
    imageUrl: string;
    brand: string;
    unitsInStock: number;
    category: string;
    categoryId: number;
}

