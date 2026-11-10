import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Login } from './features/login/login';

export const routes: Routes = [
    {path:"", component: Login},
    { path: 'saldo',loadComponent: () => import("./features/saldo/saldo").then(m => m.Saldo) },
    { path: "historial", loadComponent: () => import("./features/historial/historial").then(m => m.Historial), canActivate: [authGuard],} //Lazy loading para que 
    //el codigo se descarge solo cuando el usuario entra en ella
];
