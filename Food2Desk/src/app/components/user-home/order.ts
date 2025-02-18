export interface Order {
    id: string
    userName: string
    userId: number
    officeFloor: number
    officeNumber: number
    totalCharge: number | null
    deliverNow: boolean
    deliveryTime: number | null
    cart: {name: string, quantity: number, id: string, price: number }[]
}
