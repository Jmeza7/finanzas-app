import { Component, input, output } from '@angular/core';
import { Movimiento } from '../movimiento';

@Component({
  imports: [],
  selector: 'app-movimiento-item',
  styleUrl: './movimiento-item.scss',
  templateUrl: './movimiento-item.html',
})
export class MovimientoItem {
  
  movimiento = input.required<Movimiento>();
  eliminar = output<number>();

  borrarMovimiento(){
    this.eliminar.emit(this.movimiento().id);
  }

}
