import { Routes } from '@angular/router';
import { Saldo } from './saldo/saldo';

export const routes: Routes = [
    {path:"", component: Saldo},
    { path: "historial", loadComponent: () => import("./historial/historial").then(m => m.Historial)} //Lazy loading para que 
    //el codigo se descarge solo cuando el usuario entra en ella
];
