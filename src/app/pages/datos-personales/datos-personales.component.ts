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

import { DatosPersonales } from '../../models/datos-personales.model';
import { Estado } from '../../models/estado.models';
import { Genero } from '../../models/genero.model';
import { Municipio } from '../../models/municipio.model';
import { Localidad } from '../../models/localidad.model';
import { AuthService } from '../../core/services/auth.service';

import { MunicipiosService } from '../../core/services/municipios.service';
import { LocalidadesService } from '../../core/services/localidades.service';
import { DatosPersonalesService } from '../../core/services/datos-personales.service';
import { EstadosService } from '../../core/services/estados.service';
import { GenerosService } from '../../core/services/generos.service';

@Component({
  selector: 'app-datos-personales',
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

  templateUrl: './datos-personales.component.html',
  styleUrl: './datos-personales.component.css'
})
export class DatosPersonalesComponent implements OnInit {
  public authService = inject(AuthService);

  private datosService = inject(
    DatosPersonalesService
  );

  private estadosService = inject(
    EstadosService
  );

  private generosService = inject(
    GenerosService
  );
private municipiosService = inject(
  MunicipiosService
);

private localidadesService = inject(
  LocalidadesService
);

  datos: DatosPersonales[] = [];

  estados: Estado[] = [];

  generos: Genero[] = [];

  municipios: Municipio[] = [];

  localidades: Localidad[] = [];

  columnas = [
    'nombre',
    'curp',
    'email',
    'acciones'
  ];


  mostrarFormulario = false;

  editando = false;


  datosSeleccionados: DatosPersonales = {

    nombre: '',
    fechaNacimiento: '',
    curp: '',
    email: '',
    telefono: '',

    calle: '',
    numE: null,
    numI: null,
    cp: '',

    estadoId: '',
    municipioId: '',
    localidadId: '',
    generoId: ''
  };


  ngOnInit(): void {

  this.cargarDatos();

  this.cargarEstados();

  this.cargarMunicipios();

  this.cargarLocalidades();

  this.cargarGeneros();

}


  cargarDatos(): void {

    this.datosService
      .obtenerDatos()
      .subscribe({

        next: datos => {

          this.datos = datos;

        },

        error: error => {

          console.error(
            'Error al obtener datos personales:',
            error
          );

        }

      });

  }


  cargarEstados(): void {

    this.estadosService
      .obtenerEstados()
      .subscribe({

        next: estados => {

          this.estados = estados;

        },

        error: error => {

          console.error(
            'Error al obtener estados:',
            error
          );

        }

      });

  }
  cargarMunicipios(): void {

  this.municipiosService
    .obtenerMunicipios()
    .subscribe({

      next: municipios => {

        this.municipios = municipios;

      },

      error: error => {

        console.error(
          'Error al obtener municipios:',
          error
        );

      }

    });

}

cargarLocalidades(): void {

  this.localidadesService
    .obtenerLocalidades()
    .subscribe({

      next: localidades => {

        this.localidades = localidades;

      },

      error: error => {

        console.error(
          'Error al obtener localidades:',
          error
        );

      }

    });

}

obtenerMunicipiosDelEstado(): Municipio[] {

  if (!this.datosSeleccionados.estadoId) {

    return [];

  }

  return this.municipios.filter(
    municipio =>
      municipio.estadoId ===
      this.datosSeleccionados.estadoId
  );

}

obtenerLocalidadesDelMunicipio(): Localidad[] {

  if (!this.datosSeleccionados.municipioId) {

    return [];

  }

  return this.localidades.filter(
    localidad =>
      localidad.municipioId ===
      this.datosSeleccionados.municipioId
  );

}

cambioEstado(): void {

  this.datosSeleccionados.municipioId = '';

  this.datosSeleccionados.localidadId = '';

}

cambioMunicipio(): void {

  this.datosSeleccionados.localidadId = '';

}
  cargarGeneros(): void {

    this.generosService
      .obtenerGeneros()
      .subscribe({

        next: generos => {

          this.generos = generos;

        },

        error: error => {

          console.error(
            'Error al obtener géneros:',
            error
          );

        }

      });

  }


  nuevoDato(): void {

    this.editando = false;

    this.datosSeleccionados = {

      nombre: '',
      fechaNacimiento: '',
      curp: '',
      email: '',
      telefono: '',

      calle: '',
      numE: null,
      numI: null,
      cp: '',

      estadoId: '',
      municipioId: '',
      localidadId: '',
      generoId: ''

    };

    this.mostrarFormulario = true;

  }


  editarDato(
    datos: DatosPersonales
  ): void {

    this.editando = true;

    this.datosSeleccionados = {
      ...datos
    };

    this.mostrarFormulario = true;

  }


  cancelar(): void {

    this.mostrarFormulario = false;

    this.editando = false;

  }


  guardarDatos(): void {

    if (
      !this.datosSeleccionados.nombre.trim()
    ) {

      alert(
        'Escribe el nombre'
      );

      return;
    }


    if (
      !this.datosSeleccionados.curp.trim()
    ) {

      alert(
        'Escribe la CURP'
      );

      return;
    }


    if (
      this.editando &&
      this.datosSeleccionados.id
    ) {

      this.datosService
        .actualizarDatos(
          this.datosSeleccionados.id,
          this.datosSeleccionados
        )
        .then(() => {

          alert(
            'Datos actualizados correctamente'
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

      this.datosService
        .agregarDatos(
          this.datosSeleccionados
        )
        .then(() => {

          alert(
            'Datos personales agregados correctamente'
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


  eliminarDato(
    datos: DatosPersonales
  ): void {

    if (!datos.id) {
      return;
    }


    const confirmar = confirm(
      `¿Deseas eliminar los datos de "${datos.nombre}"?`
    );


    if (!confirmar) {
      return;
    }


    this.datosService
      .eliminarDatos(datos.id)
      .then(() => {

        alert(
          'Datos eliminados correctamente'
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