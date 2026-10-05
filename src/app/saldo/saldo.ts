import { Component, effect, inject, signal } from '@angular/core';
import { Movimiento } from '../movimiento';
import { Movimientos } from '../services/movimientos';

@Component({
  imports: [],
  selector: 'app-saldo',
  styleUrl: './saldo.scss',
  templateUrl: './saldo.html',
})
export class Saldo {
  private readonly movimientosService = inject(Movimientos);
  showSaldo = signal(false);
  saldo = this.movimientosService.saldo;

  estado = this.movimientosService.estado;


  constructor(){
    effect(() => {
      console.log(this.estado());
    })
  }

  agregar(tipo:Movimiento['tipo']){
    this.movimientosService.agregarMovimiento(tipo);
  }

  getSaldo(){
    this.showSaldo.update((v)=>!v);
  }

}
