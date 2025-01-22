export interface Order {
    userName: string
    userId: number
    officeFloor: number
    officeNumber: number
    totalCharge: number
    item: [name: string, quantity: number, id: number]
}
