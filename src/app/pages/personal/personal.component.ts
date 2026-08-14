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
import { MatSelectModule } from '@angular/material/select';

import { Personal } from '../../models/personal.model';
import { DatosPersonales } from '../../models/datos-personales.model';
import { TipoPersonal } from '../../models/tipo-personal.model';
import { AuthService } from '../../core/services/auth.service';

import { PersonalService } from '../../core/services/personal.service';
import { DatosPersonalesService } from '../../core/services/datos-personales.service';
import { TiposPersonalService } from '../../core/services/tipos-personal.service';

@Component({
  selector: 'app-personal',
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
    MatTooltipModule,
    MatSelectModule
  ],

  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css'
})
export class PersonalComponent implements OnInit {
  public authService = inject(AuthService);

  private personalService = inject(
    PersonalService
  );

  private datosPersonalesService = inject(
    DatosPersonalesService
  );

  private tiposPersonalService = inject(
    TiposPersonalService
  );


  personal: Personal[] = [];

  datosPersonales: DatosPersonales[] = [];

  tiposPersonal: TipoPersonal[] = [];


  columnas = [
    'claveEmpleado',
    'nombre',
    'tipo',
    'status',
    'acciones'
  ];


  mostrarFormulario = false;

  editando = false;


  personalSeleccionado: Personal = {

    datosPersonalesId: '',

    tipoPersonalId: '',

    claveEmpleado: '',

    status: true

  };


  ngOnInit(): void {

    this.cargarPersonal();

    this.cargarDatosPersonales();

    this.cargarTiposPersonal();

  }


  cargarPersonal(): void {

    this.personalService
      .obtenerPersonal()
      .subscribe({

        next: personal => {

          this.personal = personal;

        },

        error: error => {

          console.error(
            'Error al obtener personal:',
            error
          );

        }

      });

  }


  cargarDatosPersonales(): void {

    this.datosPersonalesService
      .obtenerDatos()
      .subscribe({

        next: datos => {

          this.datosPersonales = datos;

        },

        error: error => {

          console.error(
            'Error al obtener datos personales:',
            error
          );

        }

      });

  }


  cargarTiposPersonal(): void {

    this.tiposPersonalService
      .obtenerTipos()
      .subscribe({

        next: tipos => {

          this.tiposPersonal = tipos;

        },

        error: error => {

          console.error(
            'Error al obtener tipos de personal:',
            error
          );

        }

      });

  }


  nuevoPersonal(): void {

    this.editando = false;

    this.personalSeleccionado = {

      datosPersonalesId: '',

      tipoPersonalId: '',

      claveEmpleado: '',

      status: true

    };

    this.mostrarFormulario = true;

  }


  editarPersonal(
    personal: Personal
  ): void {

    this.editando = true;

    this.personalSeleccionado = {
      ...personal
    };

    this.mostrarFormulario = true;

  }


  cancelar(): void {

    this.mostrarFormulario = false;

    this.editando = false;

  }


  guardarPersonal(): void {

    if (
      !this.personalSeleccionado.claveEmpleado.trim()
    ) {

      alert(
        'Escribe la clave del empleado'
      );

      return;
    }


    if (
      !this.personalSeleccionado.datosPersonalesId
    ) {

      alert(
        'Selecciona los datos personales'
      );

      return;
    }


    if (
      !this.personalSeleccionado.tipoPersonalId
    ) {

      alert(
        'Selecciona el tipo de personal'
      );

      return;
    }


    if (
      this.editando &&
      this.personalSeleccionado.id
    ) {

      this.personalService
        .actualizarPersonal(
          this.personalSeleccionado.id,
          this.personalSeleccionado
        )
        .then(() => {

          alert(
            'Personal actualizado correctamente'
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

      this.personalService
        .agregarPersonal(
          this.personalSeleccionado
        )
        .then(() => {

          alert(
            'Personal agregado correctamente'
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


  eliminarPersonal(
    personal: Personal
  ): void {

    if (!personal.id) {
      return;
    }


    const confirmar = confirm(
      `¿Deseas eliminar al empleado ${personal.claveEmpleado}?`
    );


    if (!confirmar) {
      return;
    }


    this.personalService
      .eliminarPersonal(personal.id)
      .then(() => {

        alert(
          'Personal eliminado correctamente'
        );

      })
      .catch(error => {

        console.error(
          'Error al eliminar:',
          error
        );

      });

  }


  obtenerNombre(
    datosId: string
  ): string {

    const datos = this.datosPersonales.find(
      dato => dato.id === datosId
    );

    return datos
      ? datos.nombre
      : 'Sin nombre';

  }


  obtenerTipo(
    tipoId: string
  ): string {

    const tipo = this.tiposPersonal.find(
      tipo => tipo.id === tipoId
    );

    return tipo
      ? tipo.nombre
      : 'Sin tipo';

  }

}