import { Service, signal } from '@angular/core';

@Service()
export class Auth {
    private _isSession = signal(false);
    readonly isSession = this._isSession.asReadonly();

    login(){
        this._isSession.set(true);
    }

    logout(){
        this._isSession.set(false);
    }
}
