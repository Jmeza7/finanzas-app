import { Component, computed, effect, inject, signal } from '@angular/core';
import { Movimiento } from '../movimiento';
import { Movimientos } from '../services/movimientos';
import { form, FormField, required, min } from '@angular/forms/signals';
import { MovimientoItem } from '../movimiento-item/movimiento-item';
import { httpResource } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { CambioUSD } from '../cambio-usd';

@Component({
  imports: [FormField, CurrencyPipe],
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
  movimientos = this.movimientosService.movimientos;
  movimientoForm = form(this.nuevoMovimiento, (f) =>{
    required(f.concepto, {message:'El concepto es obligatorio'});
    min(f.cantidad, 0.5, {message:'La cantidad tiene que ser mayor a 0'})
  });
  showSaldo = signal(false);
  saldo = this.movimientosService.saldo;
  datos = httpResource<CambioUSD>(() => 'https://api.frankfurter.dev/v2/rate/eur/usd');
  estado = this.movimientosService.estado;
  saldoUSD = computed(() => this.datos.hasValue() ? this.saldo() * this.datos.value().rate : null);

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
