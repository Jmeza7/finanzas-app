import { Component, effect, inject, signal } from '@angular/core';
import { Movimiento } from '../movimiento';
import { Movimientos } from '../services/movimientos';
import { form, FormField, required, min } from '@angular/forms/signals';

@Component({
  imports: [FormField],
  selector: 'app-saldo',
  styleUrl: './saldo.scss',
  templateUrl: './saldo.html',
})
export class Saldo {
  private readonly movimientosService = inject(Movimientos);
  cleanMovimiento: Omit<Movimiento,'id'> = {
    concepto:'',
    cantidad:0,
    tipo:'ingreso'
  }
  nuevoMovimiento = signal<Omit<Movimiento,'id'>>(this.cleanMovimiento);
  movimientoForm = form(this.nuevoMovimiento, (f) =>{
    required(f.concepto, {message:'El concepto es obligatorio'});
    min(f.cantidad, 0.5, {message:'La cantidad tiene que ser mayor a 0'})
  });
  showSaldo = signal(false);
  saldo = this.movimientosService.saldo;

  estado = this.movimientosService.estado;


  constructor(){
    effect(() => {
      console.log(this.estado());
    })
  }

  agregar(){
    const mov = this.nuevoMovimiento();
    this.movimientosService.agregarMovimiento(mov);
    this.nuevoMovimiento.set(this.cleanMovimiento);
  }

  getSaldo(){
    this.showSaldo.update((v)=>!v);
  }

}
