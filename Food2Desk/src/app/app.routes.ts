import { Routes } from '@angular/router';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { TesteComponent } from './components/teste/teste.component';


export const routes: Routes = [
    {path: "user-home", component: UserHomeComponent},
    {path: "teste", component: TesteComponent}
];
