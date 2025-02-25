export interface Order {
    id: string
    userName: string
    userId: number
    totalCharge: number | null
    deliverNow: boolean
    deliveryTime: number | null
    office: {floor: string, number: string, block: string} | undefined
    cart: Array<{ name: string; quantity: number; id: string; price: number }>;
}
