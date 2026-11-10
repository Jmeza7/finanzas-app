import { Component, inject } from '@angular/core';
import { Auth } from '../../core/auth/auth';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {

  private readonly authService = inject(Auth);
  private router = inject(Router);

  login() {
    this.authService.login();
    this.router.navigate(["/historial"]);
  }

}
