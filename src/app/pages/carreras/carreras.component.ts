import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Carrera } from '../../models/carrera.model';
import { CarrerasService } from '../../core/services/carreras.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-carreras',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './carreras.component.html',
  styleUrl: './carreras.component.css'
})
export class CarrerasComponent implements OnInit {

  private carrerasService = inject(CarrerasService);
  public authService = inject(AuthService);
  carreras: Carrera[] = [];

  columnas: string[] = [
    'nombre',
    'estatus',
    'acciones'
  ];

  mostrarFormulario = false;

  editando = false;

  carreraSeleccionada: Carrera = {
    nombre: '',
    estatus: true
  };

  ngOnInit(): void {
    this.cargarCarreras();
  }

  cargarCarreras(): void {

    this.carrerasService.obtenerCarreras()
      .subscribe({
        next: (datos) => {
          this.carreras = datos;
        },

        error: (error) => {
          console.error(
            'Error al obtener carreras:',
            error
          );
        }
      });

  }

  nuevaCarrera(): void {

    this.editando = false;

    this.carreraSeleccionada = {
      nombre: '',
      estatus: true
    };

    this.mostrarFormulario = true;
  }

  editarCarrera(carrera: Carrera): void {

    this.editando = true;

    this.carreraSeleccionada = {
      ...carrera
    };

    this.mostrarFormulario = true;
  }

  cancelar(): void {

    this.mostrarFormulario = false;

    this.editando = false;

    this.carreraSeleccionada = {
      nombre: '',
      estatus: true
    };
  }

  guardarCarrera(): void {

    if (!this.carreraSeleccionada.nombre.trim()) {

      alert('Escribe el nombre de la carrera');

      return;
    }

    if (this.editando && this.carreraSeleccionada.id) {

      this.carrerasService
        .actualizarCarrera(
          this.carreraSeleccionada.id,
          this.carreraSeleccionada
        )
        .then(() => {

          alert('Carrera actualizada correctamente');

          this.cancelar();

        })
        .catch(error => {

          console.error(
            'Error al actualizar:',
            error
          );

        });

    } else {

      this.carrerasService
        .agregarCarrera(
          this.carreraSeleccionada
        )
        .then(() => {

          alert('Carrera agregada correctamente');

          this.cancelar();

        })
        .catch(error => {

          console.error(
            'Error al agregar:',
            error
          );

        });

    }

  }

  eliminarCarrera(carrera: Carrera): void {

    if (!carrera.id) {
      return;
    }

    const confirmar = confirm(
      `¿Deseas eliminar la carrera "${carrera.nombre}"?`
    );

    if (!confirmar) {
      return;
    }

    this.carrerasService
      .eliminarCarrera(carrera.id)
      .then(() => {

        alert('Carrera eliminada correctamente');

      })
      .catch(error => {

        console.error(
          'Error al eliminar:',
          error
        );

      });

  }

}