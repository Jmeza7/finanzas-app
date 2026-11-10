import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Movimiento } from '../../../shared/models/movimiento';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-movimiento-item',
  styleUrl: './movimiento-item.scss',
  templateUrl: './movimiento-item.html',
})
export class MovimientoItem {
  
  movimiento = input.required<Movimiento>();
  eliminar = output<string>();

  borrarMovimiento(){
    this.eliminar.emit(this.movimiento().id);
  }

}
