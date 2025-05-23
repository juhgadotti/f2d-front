 export interface Product {
    id: string 
    image: string
    name: string
    description: string
    price: number
    category: string
    status: number | string
    dayweek: number | null 
}