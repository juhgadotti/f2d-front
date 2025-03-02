export interface User {
    id: string
    name: string
    offices: [{floor: string, number: string, block: string, enterprise: string, officeId: string}]
}
