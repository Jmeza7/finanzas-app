import { Component, computed, Signal, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-saldo',
  styleUrl: './saldo.scss',
  templateUrl: './saldo.html',
})
export class Saldo {
  saldo = signal(0);
  estado = computed(() => {
    const saldo = this.saldo();

    if(saldo > 0){
      return  "En positivo" 
    } else if (saldo === 0){
      return "En cero"
    } else {
      return "En negativo"
    }
  })

  ingreso(){
    this.saldo.update((v) => v + 10);
    console.log(this.estado());
  }

  gasto(){
    this.saldo.update((v) => v - 10);
    console.log(this.estado());
  }
}
