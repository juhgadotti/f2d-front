import { Routes } from '@angular/router';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserOrderStatusComponent } from './components/user-order-status/user-order-status.component';
import { SavingAppComponent } from './components/saving-app/saving-app.component';


export const routes: Routes = [
    {path: "user-home", component: UserHomeComponent},
    {path: "user-order-status", component: UserOrderStatusComponent},
    {path: "saving-app", component: SavingAppComponent},
];
