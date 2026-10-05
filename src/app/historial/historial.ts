import { Component, inject } from '@angular/core';
import { Movimientos } from '../services/movimientos';

@Component({
  imports: [],
  selector: 'app-historial',
  styleUrl: './historial.scss',
  templateUrl: './historial.html',
})
export class Historial {
  private readonly movimientosService = inject(Movimientos);
  movimientos = this.movimientosService.movimientos;

}
