import { Component, computed, effect, Signal, signal } from '@angular/core';
import { Movimiento } from '../movimiento';

@Component({
  imports: [],
  selector: 'app-saldo',
  styleUrl: './saldo.scss',
  templateUrl: './saldo.html',
})
export class Saldo {

  showSaldo = signal(false);
  movimientos = signal<Movimiento[]>([]);
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
      console.log(this.estado());
    })
  }

  agregarMovimiento(ev:Movimiento['tipo']){
    this.movimientos.update(v => {
      const id = Date.now();
      const cantidad = 10;
      const tipo = ev;
      return [...v, {id,cantidad,tipo }]
    });
  }

  getSaldo(){
    this.showSaldo.update((v)=>!v);
  }

}
