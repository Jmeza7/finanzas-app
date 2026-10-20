import { Component, computed, inject, signal } from '@angular/core';
import { Movimientos } from '../services/movimientos';
import { MovimientoItem } from '../movimiento-item/movimiento-item';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  imports: [MovimientoItem],
  selector: 'app-historial',
  styleUrl: './historial.scss',
  templateUrl: './historial.html',
})


export class Historial {
  private readonly movimientosService = inject(Movimientos);
  movimientos = this.movimientosService.movimientos;
  busqueda = signal('');
  busquedaRetrasada = toSignal(toObservable(this.busqueda).pipe(debounceTime(300)),{initialValue:''});

  movimientosFiltrados = computed(() => {
    const mov = this.movimientos().filter((mov) =>{
      const res = mov?.concepto.toLowerCase().includes(this.busquedaRetrasada());
      return res;
    })
    return mov;
  })

  borrar(id:number){
    this.movimientosService.borrarMovimiento(id);
  }

  buscar(ev:Event){
    this.busqueda.set((ev?.target as HTMLInputElement).value);
  }

}
