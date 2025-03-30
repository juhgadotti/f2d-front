import { environment } from "./environment";

export const Food2DeskApi = {
    urls: {
        items: { //todo mudar nome p/ products
            root: `${environment.baseServerUrl}/api/principal` // /nomes das rotas
        },
        user: {
            root: `${environment.baseServerUrl}/api/user`
        },
        product: {
            root: `${environment.baseServerUrl}/api/product`
        },
        order:{
            root: `${environment.baseServerUrl}/api/order`,
            list: `${environment.baseServerUrl}/api/order/list`,
            status: `${environment.baseServerUrl}/api/order/status`,
            test: `${environment.baseServerUrl}/api/order/test`
        }
    }
}