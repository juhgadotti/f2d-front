import { Routes } from '@angular/router';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserOrderStatusComponent } from './components/user-order-status/user-order-status.component';
import { AdminManageComponent } from './components/admin-manage/admin-manage.component';
import { SavingAppComponent } from './components/saving-app/saving-app.component';
import { ProductRegisterComponent } from './components/product-register/product-register.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
    {path: "user-home", component: UserHomeComponent},
    {path: "user-order-status", component: UserOrderStatusComponent},
    {path: "saving-app", component: SavingAppComponent},
    {path: "admin-manage", component: AdminManageComponent},
    {path: "product-register", component: ProductRegisterComponent},
    {path: "product-management", component: ProductManagementComponent},
    {path: "login", component: LoginComponent}
];
