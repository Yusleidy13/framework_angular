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
import { Estado } from '../../models/estado.models';
import { EstadosService } from '../../core/services/estados.service';

@Component({
  selector: 'app-estados',
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
  templateUrl: './estados.component.html',
  styleUrl: './estados.component.css'
})
export class EstadosComponent implements OnInit {

  private estadosService = inject(EstadosService);
  public authService = inject(AuthService);
  
  estados: Estado[] = [];

  columnas: string[] = [
    'nombre',
    'acciones'
  ];

  mostrarFormulario = false;

  editando = false;

  estadoSeleccionado: Estado = {
    nombre: ''
  };

  ngOnInit(): void {
    this.cargarEstados();
  }

  cargarEstados(): void {

    this.estadosService.obtenerEstados()
      .subscribe({
        next: (datos) => {
          this.estados = datos;
        },

        error: (error) => {
          console.error(
            'Error al obtener estados:',
            error
          );
        }
      });
  }

  nuevoEstado(): void {

    this.editando = false;

    this.estadoSeleccionado = {
      nombre: ''
    };

    this.mostrarFormulario = true;
  }

  editarEstado(estado: Estado): void {

    this.editando = true;

    this.estadoSeleccionado = {
      ...estado
    };

    this.mostrarFormulario = true;
  }

  cancelar(): void {

    this.mostrarFormulario = false;

    this.editando = false;

    this.estadoSeleccionado = {
      nombre: ''
    };
  }

  guardarEstado(): void {

    if (!this.estadoSeleccionado.nombre.trim()) {

      alert('Escribe el nombre del estado');

      return;
    }

    if (
      this.editando &&
      this.estadoSeleccionado.id
    ) {

      this.estadosService
        .actualizarEstado(
          this.estadoSeleccionado.id,
          this.estadoSeleccionado
        )
        .then(() => {

          alert(
            'Estado actualizado correctamente'
          );

          this.cancelar();

        })
        .catch(error => {

          console.error(
            'Error al actualizar:',
            error
          );

        });

    } else {

      this.estadosService
        .agregarEstado(
          this.estadoSeleccionado
        )
        .then(() => {

          alert(
            'Estado agregado correctamente'
          );

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

  eliminarEstado(estado: Estado): void {

    if (!estado.id) {
      return;
    }

    const confirmar = confirm(
      `¿Deseas eliminar el estado "${estado.nombre}"?`
    );

    if (!confirmar) {
      return;
    }

    this.estadosService
      .eliminarEstado(estado.id)
      .then(() => {

        alert(
          'Estado eliminado correctamente'
        );

      })
      .catch(error => {

        console.error(
          'Error al eliminar:',
          error
        );

      });
  }
}