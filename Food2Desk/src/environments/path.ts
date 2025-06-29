import { environment } from "./environment";

export const Food2DeskApi = {
    urls: {
        items: { //todo mudar nome p/ products
            root: `${environment.baseServerUrl}/api/principal` // /nomes das rotas
        },
        user: {
            root: `${environment.baseServerUrl}/api/user`,
            auth: `${environment.baseServerUrl}/api/user/auth`,
            office: `${environment.baseServerUrl}/api/user/office`
        },
        product: {
            root: `${environment.baseServerUrl}/api/product`,
            categories: `${environment.baseServerUrl}/api/product/categories`,
            status: `${environment.baseServerUrl}/api/product/status`,
            lunch: `${environment.baseServerUrl}/api/product/lunch`
        },
        order:{
            root: `${environment.baseServerUrl}/api/order`,
            list: `${environment.baseServerUrl}/api/order/list`,
            status: `${environment.baseServerUrl}/api/order/status`,
            test: `${environment.baseServerUrl}/api/order/test`
        }
    }
}