
export interface Product{
    name: string,
    image?: BinaryData,
    description: string,
    price: number,
    stock: number,
    category: string,
}

export interface ProductWithId{
    name: string,
    image?: BinaryData,
    description: string,
    price: number,
    stock: number,
    category: string,
    id: string
}

export interface Cart{
    productId: string;
    productCategory: string;
    userEmail: string;
}

export interface CartResponse{
    productId: string;
    productCategory: string;
    userEmail: string;
    name: string;
}

export interface CartWithID{
    id: string;
    productId: string;
    productCategory: string;
    userEmail: string;
}

export interface MyOrder{
    order: CartWithID[] 
    userEmail: string;
}

export interface MyOrderResponse{
    order: CartWithID[] 
    userEmail: string;
    name: string;
}

export interface MyOrderWithID{
    id: string;
    order: CartWithID[] 
    userEmail: string;
}

export interface MyOrderItem {
    id: string;
    name: string;
    price: number;
}

