declare type Stock = {
    availability: number;
};

declare type Dish = {
    id: string;
    name: string;
    url: string;
    price: number;
    discount_rate: number;
    stock: Stock;
    description: string;
    photo: string;
    category_id: string | number;
};
