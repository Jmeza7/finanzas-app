import { Component, inject } from '@angular/core';
import { Movimientos } from '../services/movimientos';
import { MovimientoItem } from '../movimiento-item/movimiento-item';

@Component({
  imports: [MovimientoItem],
  selector: 'app-historial',
  styleUrl: './historial.scss',
  templateUrl: './historial.html',
})
export class Historial {
  private readonly movimientosService = inject(Movimientos);
  movimientos = this.movimientosService.movimientos;

  borrar(id:number){
    this.movimientosService.borrarMovimiento(id);
  }

}
