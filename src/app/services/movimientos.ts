import { computed, Service, signal } from '@angular/core';
import { Movimiento } from '../movimiento';

@Service()
export class Movimientos {

    private readonly _movimientos = signal<Movimiento[]>([]);
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

    agregarMovimiento(ev:Movimiento['tipo']){
        this._movimientos.update(v => {
        const id = Date.now();
        const cantidad = 10;
        const tipo = ev;
        return [...v, {id,cantidad,tipo }]
        });
    }

}
