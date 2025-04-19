 export interface Product {
    id: string //vai ser string pra ser um guid
    image: string
    name: string
    description: string
    price: number
    category: string
    status: number | string
}