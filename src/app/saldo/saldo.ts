import { Component, computed, Signal, signal } from '@angular/core';
import { Movimiento } from '../movimiento';

@Component({
  imports: [],
  selector: 'app-saldo',
  styleUrl: './saldo.scss',
  templateUrl: './saldo.html',
})
export class Saldo {
  showSaldo = signal<boolean>(false);
  movimientos = signal<Movimiento[]>([]);
  saldo = computed(() => {
    let total = 0;
    for (const m of this.movimientos()){
      if(m.tipo === 'ingreso'){
        total = total + m.cantidad;
      }else{
        total = total - m.cantidad;
      }
    }
    return total
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

  ingreso(){
    this.movimientos.update(v => {
      const id = Date.now();
      const cantidad = 10;
      const tipo = 'ingreso';
      return [...v, {id,cantidad,tipo }]
    });
  }

  gasto(){
    this.movimientos.update(v => {
      const id = Date.now();
      const cantidad = 10;
      const tipo = 'gasto';
      return [...v, {id,cantidad,tipo }]
    });
  }

  getSaldo(){
    if(this.showSaldo() === true){
      this.showSaldo.set(false);
    }else{
      this.showSaldo.set(true);
    }
  }

}
