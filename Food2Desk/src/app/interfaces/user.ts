export interface User {
    id: string
    name: string
    offices: [{officeId: string, floor: string, number: string, block: string | null, enterprise: string | null}]
}