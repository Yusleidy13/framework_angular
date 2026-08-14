import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../core/services/auth.service';
import { Genero } from '../../models/genero.model';
import { GenerosService } from '../../core/services/generos.service';

@Component({
  selector: 'app-generos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './generos.component.html',
  styleUrl: './generos.component.css'
})
export class GenerosComponent implements OnInit {

  private generosService = inject(GenerosService);
  public authService = inject(AuthService);

  generos: Genero[] = [];

  columnas = ['nombre', 'acciones'];

  mostrarFormulario = false;
  editando = false;

  generoSeleccionado: Genero = {
    nombre: ''
  };

  ngOnInit(): void {
    this.cargarGeneros();
  }

  cargarGeneros(): void {

    this.generosService.obtenerGeneros()
      .subscribe({
        next: datos => {
          this.generos = datos;
        },
        error: error => {
          console.error(
            'Error al obtener géneros:',
            error
          );
        }
      });
  }

  nuevoGenero(): void {

    this.editando = false;

    this.generoSeleccionado = {
      nombre: ''
    };

    this.mostrarFormulario = true;
  }

  editarGenero(genero: Genero): void {

    this.editando = true;

    this.generoSeleccionado = {
      ...genero
    };

    this.mostrarFormulario = true;
  }

  cancelar(): void {

    this.mostrarFormulario = false;
    this.editando = false;

    this.generoSeleccionado = {
      nombre: ''
    };
  }

  guardarGenero(): void {

    if (!this.generoSeleccionado.nombre.trim()) {

      alert('Escribe el nombre del género');

      return;
    }

    if (
      this.editando &&
      this.generoSeleccionado.id
    ) {

      this.generosService
        .actualizarGenero(
          this.generoSeleccionado.id,
          this.generoSeleccionado
        )
        .then(() => {

          alert('Género actualizado correctamente');

          this.cancelar();

        });

    } else {

      this.generosService
        .agregarGenero(
          this.generoSeleccionado
        )
        .then(() => {

          alert('Género agregado correctamente');

          this.cancelar();

        });
    }
  }

  eliminarGenero(genero: Genero): void {

    if (!genero.id) {
      return;
    }

    if (
      !confirm(
        `¿Deseas eliminar "${genero.nombre}"?`
      )
    ) {
      return;
    }

    this.generosService
      .eliminarGenero(genero.id)
      .then(() => {

        alert('Género eliminado correctamente');

      });
  }
}