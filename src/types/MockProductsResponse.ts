export type MockProduct = {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
}

export type MockProductsResponse = {
    limit: number;
    products: MockProduct[];
    skip: 0;
    total: 100;
}
