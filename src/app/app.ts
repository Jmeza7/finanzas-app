import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from './core/auth/auth';
import { Notificaciones } from './core/notificaciones/notificaciones';

@Component({
  imports: [RouterLink, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('finanzas-app');
  private readonly authService = inject(Auth);
  private readonly notiService = inject(Notificaciones);
  private router = inject(Router);

  isSession = this.authService.isSession;
  mensajeError = this.notiService.notificaciones;

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  cerrar() {
    this.notiService.cerrar();
  }
}
