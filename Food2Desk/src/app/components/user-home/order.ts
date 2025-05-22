export interface Order {
    id: string
    code: number
    userId: string
    userName: string
    totalCharge: number | null
    deliverNow: boolean
    deliveryTime: string | null
    toDelivery: boolean
    isLunch: boolean
    status: number
    office: { officeId: string, floor: string, number: string, block: string | null, enterprise: string | null, enterpriseId: string | null, obs: string | null} | null
    cart: Array<{id: string, quantity: number, price: number, name: string}>;
}
