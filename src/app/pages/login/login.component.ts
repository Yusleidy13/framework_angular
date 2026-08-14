import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);


  email = '';

  password = '';

  mostrarPassword = false;

  cargando = false;

  error = '';


  async iniciarSesion(): Promise<void> {

    this.error = '';


    if (!this.email.trim()) {

      this.error = 'Escribe tu correo electrónico';

      return;

    }


    if (!this.password) {

      this.error = 'Escribe tu contraseña';

      return;

    }


    this.cargando = true;


    try {

      await this.authService.iniciarSesion(
        this.email.trim(),
        this.password
      );


      this.router.navigate(['/estados']);


    } catch (error: any) {

      console.error(
        'Error al iniciar sesión:',
        error
      );


      switch (error.code) {

        case 'auth/invalid-credential':

          this.error =
            'Correo o contraseña incorrectos';

          break;


        case 'auth/user-disabled':

          this.error =
            'Este usuario está deshabilitado';

          break;


        case 'auth/too-many-requests':

          this.error =
            'Demasiados intentos. Intenta nuevamente más tarde';

          break;


        default:

          this.error =
            'No fue posible iniciar sesión';

      }

    } finally {

      this.cargando = false;

    }

  }


  cambiarPasswordVisibility(): void {

    this.mostrarPassword =
      !this.mostrarPassword;

  }

}