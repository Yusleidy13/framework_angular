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

import { Alumno } from '../../models/alumno.model';
import { Carrera } from '../../models/carrera.model';
import { DatosPersonales } from '../../models/datos-personales.model';
import { AuthService } from '../../core/services/auth.service';

import { AlumnosService } from '../../core/services/alumnos.service';
import { CarrerasService } from '../../core/services/carreras.service';
import { DatosPersonalesService } from '../../core/services/datos-personales.service';

@Component({
  selector: 'app-alumnos',
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

  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css'
})
export class AlumnosComponent implements OnInit {

  private alumnosService = inject(
    AlumnosService
  );

  private carrerasService = inject(
    CarrerasService
  );

  private datosPersonalesService = inject(
    DatosPersonalesService
  );

 public authService = inject(AuthService);
 
  alumnos: Alumno[] = [];

  carreras: Carrera[] = [];

  datosPersonales: DatosPersonales[] = [];


  columnas = [
    'matricula',
    'carrera',
    'nombre',
    'status',
    'acciones'
  ];


  mostrarFormulario = false;

  editando = false;


  alumnoSeleccionado: Alumno = {

    matricula: '',

    carreraId: '',

    datosPersonalesId: '',

    status: 'A'

  };


  ngOnInit(): void {

    this.cargarAlumnos();

    this.cargarCarreras();

    this.cargarDatosPersonales();

  }


  cargarAlumnos(): void {

    this.alumnosService
      .obtenerAlumnos()
      .subscribe({

        next: alumnos => {

          this.alumnos = alumnos;

        },

        error: error => {

          console.error(
            'Error al obtener alumnos:',
            error
          );

        }

      });

  }


  cargarCarreras(): void {

    this.carrerasService
      .obtenerCarreras()
      .subscribe({

        next: carreras => {

          this.carreras = carreras;

        },

        error: error => {

          console.error(
            'Error al obtener carreras:',
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


  nuevoAlumno(): void {

    this.editando = false;

    this.alumnoSeleccionado = {

      matricula: '',

      carreraId: '',

      datosPersonalesId: '',

      status: 'A'

    };

    this.mostrarFormulario = true;

  }


  editarAlumno(
    alumno: Alumno
  ): void {

    this.editando = true;

    this.alumnoSeleccionado = {
      ...alumno
    };

    this.mostrarFormulario = true;

  }


  cancelar(): void {

    this.mostrarFormulario = false;

    this.editando = false;

  }


  guardarAlumno(): void {

    if (
      !this.alumnoSeleccionado.matricula.trim()
    ) {

      alert(
        'Escribe la matrícula'
      );

      return;
    }


    if (
      !this.alumnoSeleccionado.carreraId
    ) {

      alert(
        'Selecciona una carrera'
      );

      return;
    }


    if (
      !this.alumnoSeleccionado.datosPersonalesId
    ) {

      alert(
        'Selecciona los datos personales'
      );

      return;
    }


    if (
      this.editando &&
      this.alumnoSeleccionado.id
    ) {

      this.alumnosService
        .actualizarAlumno(
          this.alumnoSeleccionado.id,
          this.alumnoSeleccionado
        )
        .then(() => {

          alert(
            'Alumno actualizado correctamente'
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

      this.alumnosService
        .agregarAlumno(
          this.alumnoSeleccionado
        )
        .then(() => {

          alert(
            'Alumno agregado correctamente'
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


  eliminarAlumno(
    alumno: Alumno
  ): void {

    if (!alumno.id) {
      return;
    }


    const confirmar = confirm(
      `¿Deseas eliminar al alumno ${alumno.matricula}?`
    );


    if (!confirmar) {
      return;
    }


    this.alumnosService
      .eliminarAlumno(alumno.id)
      .then(() => {

        alert(
          'Alumno eliminado correctamente'
        );

      })
      .catch(error => {

        console.error(
          'Error al eliminar:',
          error
        );

      });

  }


  obtenerCarrera(
    carreraId: string
  ): string {

    const carrera = this.carreras.find(
      carrera => carrera.id === carreraId
    );

    return carrera
      ? carrera.nombre
      : 'Sin carrera';

  }


  obtenerNombre(
    datosId: string
  ): string {

    const datos = this.datosPersonales.find(
      datos => datos.id === datosId
    );

    return datos
      ? datos.nombre
      : 'Sin nombre';

  }

}