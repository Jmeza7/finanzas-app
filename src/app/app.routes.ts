import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { Login } from './login/login';

export const routes: Routes = [
    {path:"", component: Login},
    { path: 'saldo',loadComponent: () => import("./saldo/saldo").then(m => m.Saldo) },
    { path: "historial", loadComponent: () => import("./historial/historial").then(m => m.Historial), canActivate: [authGuard],} //Lazy loading para que 
    //el codigo se descarge solo cuando el usuario entra en ella
];
