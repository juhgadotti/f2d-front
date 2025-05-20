export interface Lunch {
    id: number 
    userName: string   
    status: number 
    product: {id: string, name: string, price: number}
    office:  { officeId: string, floor: string, number: string, block: string | null} | null
}