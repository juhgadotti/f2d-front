export interface UserAuth {
    email: string
    password: string
    isLogged: boolean
    userId: string | null
}