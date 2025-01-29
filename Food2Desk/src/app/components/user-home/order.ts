export interface Order {
    id: string
    userName: string
    userId: number
    officeFloor: number
    officeNumber: number
    totalCharge: number
    deliverNow: boolean
    deliveryTime: number | null
    item: {name: string, quantity: number, id: number }
}
