import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { DatosEscuela } from '../../models/datos-escuela.model';
import { Estado } from '../../models/estado.models';
import { Municipio } from '../../models/municipio.model';
import { Localidad } from '../../models/localidad.model';
import { AuthService } from '../../core/services/auth.service';

import { DatosEscuelaService } from '../../core/services/datos-escuela.service';
import { EstadosService } from '../../core/services/estados.service';
import { MunicipiosService } from '../../core/services/municipios.service';
import { LocalidadesService } from '../../core/services/localidades.service';


@Component({
  selector: 'app-datos-escuela',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule
  ],

  templateUrl: './datos-escuela.component.html',
  styleUrl: './datos-escuela.component.css'
})
export class DatosEscuelaComponent
  implements OnInit {

 public authService = inject(AuthService);
 
  private datosEscuelaService = inject(
    DatosEscuelaService
  );

  private estadosService = inject(
    EstadosService
  );

  private municipiosService = inject(
    MunicipiosService
  );

  private localidadesService = inject(
    LocalidadesService
  );


  escuela: DatosEscuela = {

    cct: '',
    nombre: '',
    telefono: '',
    email: '',

    calle: '',
    numE: null,
    numI: null,
    cp: '',

    estadoId: '',
    municipioId: '',
    localidadId: ''

  };


  escuelaId: string | null = null;

  estados: Estado[] = [];

  municipios: Municipio[] = [];

  localidades: Localidad[] = [];


  ngOnInit(): void {

    this.cargarEstados();

    this.cargarMunicipios();

    this.cargarLocalidades();

    this.cargarEscuela();

  }


  // ==========================================
  // CARGAR DATOS
  // ==========================================

  cargarEscuela(): void {

    this.datosEscuelaService
      .obtenerDatos()
      .subscribe({

        next: escuelas => {

          if (escuelas.length > 0) {

            this.escuela = {
              ...escuelas[0]
            };

            this.escuelaId =
              escuelas[0].id ?? null;

          }

        },

        error: error => {

          console.error(
            'Error al obtener datos de la escuela:',
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


  // ==========================================
  // FILTROS
  // ==========================================

  obtenerMunicipiosDelEstado(): Municipio[] {

    if (!this.escuela.estadoId) {

      return [];

    }

    return this.municipios.filter(
      municipio =>
        municipio.estadoId ===
        this.escuela.estadoId
    );

  }


  obtenerLocalidadesDelMunicipio(): Localidad[] {

    if (!this.escuela.municipioId) {

      return [];

    }

    return this.localidades.filter(
      localidad =>
        localidad.municipioId ===
        this.escuela.municipioId
    );

  }


  cambioEstado(): void {

    this.escuela.municipioId = '';

    this.escuela.localidadId = '';

  }


  cambioMunicipio(): void {

    this.escuela.localidadId = '';

  }


  // ==========================================
  // GUARDAR
  // ==========================================

  guardar(): void {

    if (!this.escuela.cct.trim()) {

      alert('Escribe la CCT');

      return;

    }


    if (!this.escuela.nombre.trim()) {

      alert('Escribe el nombre de la escuela');

      return;

    }


    if (!this.escuela.estadoId) {

      alert('Selecciona un estado');

      return;

    }


    if (!this.escuela.municipioId) {

      alert('Selecciona un municipio');

      return;

    }


    if (!this.escuela.localidadId) {

      alert('Selecciona una localidad');

      return;

    }


    if (this.escuelaId) {

      this.datosEscuelaService
        .actualizarDatos(
          this.escuelaId,
          this.escuela
        )
        .then(() => {

          alert(
            'Datos de la escuela actualizados correctamente'
          );

        })
        .catch(error => {

          console.error(
            'Error al actualizar:',
            error
          );

        });

    } else {

      this.datosEscuelaService
        .agregarDatos(this.escuela)
        .then(resultado => {

          this.escuelaId = resultado.id;

          alert(
            'Datos de la escuela guardados correctamente'
          );

        })
        .catch(error => {

          console.error(
            'Error al guardar:',
            error
          );

        });

    }

  }


  eliminar(): void {

    if (!this.escuelaId) {

      return;

    }


    const confirmar = confirm(
      '¿Deseas eliminar los datos de la escuela?'
    );


    if (!confirmar) {

      return;

    }


    this.datosEscuelaService
      .eliminarDatos(this.escuelaId)
      .then(() => {

        this.escuelaId = null;

        this.escuela = {

          cct: '',
          nombre: '',
          telefono: '',
          email: '',

          calle: '',
          numE: null,
          numI: null,
          cp: '',

          estadoId: '',
          municipioId: '',
          localidadId: ''

        };

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