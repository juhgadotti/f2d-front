export interface Order {
    id: string
    userName: string
    userId: number
    totalCharge: number | null
    deliverNow: boolean
    deliveryTime: number | null
    officeId: string | null
    cart: Array<{ name: string; quantity: number; id: string; price: number }>;
}
