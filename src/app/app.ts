import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Saldo } from './saldo/saldo';

@Component({
  imports: [Saldo],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('finanzas-app');
}
