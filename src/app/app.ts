import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from './core/auth/auth';
import { Notificaciones } from './core/notificaciones/notificaciones';
import { Sidebar } from './core/layout/sidebar/sidebar';

@Component({
  imports: [RouterLink, RouterOutlet, Sidebar],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
  host: {
    '(document:keydown.escape)': 'cerrarMenuMovil()',
  },
})
export class App {
  protected readonly title = signal('finanzas-app');
  private readonly authService = inject(Auth);
  private readonly notiService = inject(Notificaciones);
  private router = inject(Router);

  isSession = this.authService.isSession;
  mensajeError = this.notiService.notificaciones;

  menuMovilAbierto = signal(false);
  sidebarPlegado = signal(false);

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  cerrar() {
    this.notiService.cerrar();
  }

  abrirMenuMovil() {
    this.menuMovilAbierto.set(true);
  }

  cerrarMenuMovil() {
    this.menuMovilAbierto.set(false);
  }

  alternarPlegado() {
    this.sidebarPlegado.update((v) => !v);
  }
}
