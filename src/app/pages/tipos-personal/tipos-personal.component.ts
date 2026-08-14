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

import { TipoPersonal } from '../../models/tipo-personal.model';
import { TiposPersonalService } from '../../core/services/tipos-personal.service';

@Component({
  selector: 'app-tipos-personal',
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
  templateUrl: './tipos-personal.component.html',
  styleUrl: './tipos-personal.component.css'
})
export class TiposPersonalComponent implements OnInit {
  public authService = inject(AuthService);

  private tiposPersonalService = inject(
    TiposPersonalService
  );

  tipos: TipoPersonal[] = [];

  columnas = [
    'nombre',
    'acciones'
  ];

  mostrarFormulario = false;
  editando = false;

  tipoSeleccionado: TipoPersonal = {
    nombre: ''
  };

  ngOnInit(): void {
    this.cargarTipos();
  }

  cargarTipos(): void {

    this.tiposPersonalService
      .obtenerTipos()
      .subscribe({

        next: datos => {
          this.tipos = datos;
        },

        error: error => {
          console.error(
            'Error al obtener tipos de personal:',
            error
          );
        }

      });
  }

  nuevoTipo(): void {

    this.editando = false;

    this.tipoSeleccionado = {
      nombre: ''
    };

    this.mostrarFormulario = true;
  }

  editarTipo(tipo: TipoPersonal): void {

    this.editando = true;

    this.tipoSeleccionado = {
      ...tipo
    };

    this.mostrarFormulario = true;
  }

  cancelar(): void {

    this.mostrarFormulario = false;
    this.editando = false;

    this.tipoSeleccionado = {
      nombre: ''
    };
  }

  guardarTipo(): void {

    if (!this.tipoSeleccionado.nombre.trim()) {

      alert(
        'Escribe el nombre del tipo de personal'
      );

      return;
    }

    if (
      this.editando &&
      this.tipoSeleccionado.id
    ) {

      this.tiposPersonalService
        .actualizarTipo(
          this.tipoSeleccionado.id,
          this.tipoSeleccionado
        )
        .then(() => {

          alert(
            'Tipo de personal actualizado correctamente'
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

      this.tiposPersonalService
        .agregarTipo(
          this.tipoSeleccionado
        )
        .then(() => {

          alert(
            'Tipo de personal agregado correctamente'
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

  eliminarTipo(tipo: TipoPersonal): void {

    if (!tipo.id) {
      return;
    }

    const confirmar = confirm(
      `¿Deseas eliminar "${tipo.nombre}"?`
    );

    if (!confirmar) {
      return;
    }

    this.tiposPersonalService
      .eliminarTipo(tipo.id)
      .then(() => {

        alert(
          'Tipo de personal eliminado correctamente'
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