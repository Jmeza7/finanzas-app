import { Service, signal } from '@angular/core';

@Service()
export class Notificaciones {

    private _notificaciones = signal<string|null>(null);
    readonly notificaciones = this._notificaciones.asReadonly();

    mostrarAvisoError(text:string){
        this._notificaciones.set(text);
    }

    cerrar(){
        this._notificaciones.set(null);
    }

}
