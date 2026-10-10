import { Component, effect, inject, signal } from '@angular/core';
import { Movimiento } from '../movimiento';
import { Movimientos } from '../services/movimientos';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  imports: [FormField],
  selector: 'app-saldo',
  styleUrl: './saldo.scss',
  templateUrl: './saldo.html',
})
export class Saldo {
  private readonly movimientosService = inject(Movimientos);
  nuevoMovimiento = signal<Omit<Movimiento,'id'>>({
    concepto:'',
    cantidad:0,
    tipo:'ingreso'
  })
  movimientoForm = form(this.nuevoMovimiento);
  showSaldo = signal(false);
  saldo = this.movimientosService.saldo;

  estado = this.movimientosService.estado;


  constructor(){
    effect(() => {
      console.log(this.estado());
    })
  }

  agregar(mov:Omit<Movimiento[],'id'>){
    //this.movimientosService.agregarMovimiento();
  }

  getSaldo(){
    this.showSaldo.update((v)=>!v);
  }

}
