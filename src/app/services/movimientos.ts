import { computed, effect, inject, PLATFORM_ID, Service, signal } from '@angular/core';
import { Movimiento } from '../movimiento';
import { isPlatformBrowser } from '@angular/common';


const STORAGE_KEY = 'movimientosHistory';


@Service()
export class Movimientos {
    private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    private _movimientos = signal<Movimiento[]>(this.cargar());
    readonly movimientos = this._movimientos.asReadonly();
    saldo = computed(() => {
    return this.movimientos().reduce((acc,m) => {
      if(m.tipo === 'ingreso'){
        return acc + m.cantidad;
      }else{
        return acc - m.cantidad;
      }
    },0)
  });
  estado = computed(() => {

    if(this.saldo() > 0){
      return  "En positivo" 
    } else if (this.saldo() === 0){
      return "En cero"
    } else {
      return "En negativo"
    }
  })

  constructor(){
    effect(() => {
      if(!this.isBrowser){
        [];
      }else{
        const movChange = JSON.stringify(this._movimientos());
        localStorage.setItem(STORAGE_KEY,movChange);
      }

    })
  }

    private cargar(): Movimiento[]{
      if(!this.isBrowser){
        return [];
      }else{
        const movimientosHistory = localStorage.getItem(STORAGE_KEY);
        if(!movimientosHistory){
          return [];
        }else{
          return JSON.parse(movimientosHistory);
        }
      }
    }

    agregarMovimiento(ev:Movimiento['tipo']){
        this._movimientos.update(v => {
        const id = Date.now();
        const cantidad = 10;
        const tipo = ev;
        const concepto = "test";
        return [...v, {id,cantidad,tipo, concepto }]
        });
    }

}
