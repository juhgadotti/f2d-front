export interface Order {
    id: string
    userName: string
    userId: number
    totalCharge: number | null
    deliverNow: boolean
    deliveryTime: string | null
    office: { officeId: string, floor: string, number: string, block: string | null, enterprise: string | null} | null
    cart: Array<{ name: string; quantity: number; id: string; price: number }>;
}
