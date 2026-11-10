import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-sidebar',
  styleUrl: './sidebar.scss',
  templateUrl: './sidebar.html',
  host: {
    '[class.abierto-movil]': 'abiertoMovil()',
    '[class.plegado]': 'plegado()',
  },
})
export class Sidebar {
  abiertoMovil = input(false);
  plegado = input(false);

  cerrar = output<void>();
  alternarPlegado = output<void>();
}
