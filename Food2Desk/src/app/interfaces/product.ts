 export interface Product {
    id: string 
    imageUrl: string
    name: string
    description: string
    price: number
    category: string
    quantity: number | null
    status: number | string
    weekDay: number | null 
}