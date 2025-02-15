import { environment } from "./environment";

export const Food2DeskApi = {
    urls: {
        items: {
            root: `${environment.baseServerUrl}/api/principal` // /nomes das rotas
        },
        user: {
            root: `${environment.baseServerUrl}/api/user`
        },
        product: {
            root: `${environment.baseServerUrl}/api/product`
        }
    }
}