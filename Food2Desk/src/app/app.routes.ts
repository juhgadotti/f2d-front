import { Routes } from '@angular/router';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { TesteComponent } from './components/teste/teste.component';
import { SavingAppComponent } from './components/saving-app/saving-app.component'

export const routes: Routes = [
    {path: "user-home", component: UserHomeComponent},
    {path: "teste", component: TesteComponent},
    {path: "saving-app", component: SavingAppComponent}
];
