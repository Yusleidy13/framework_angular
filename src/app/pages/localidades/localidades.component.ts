import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LocalidadesService } from '../../core/services/localidades.service';
import { MunicipiosService } from '../../core/services/municipios.service';
import { AuthService } from '../../core/services/auth.service';

import { Localidad } from '../../models/localidad.model';
import { Municipio } from '../../models/municipio.model';

@Component({
  selector: 'app-localidades',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './localidades.component.html',
  styleUrl: './localidades.component.css'
})
export class LocalidadesComponent implements OnInit {

  private localidadesService = inject(LocalidadesService);
  private municipiosService = inject(MunicipiosService);
   public authService = inject(AuthService);
   
  localidades: Localidad[] = [];
  municipios: Municipio[] = [];

  nombre = '';
  municipioId = '';

  editando = false;
  localidadId = '';

  ngOnInit(): void {
    this.cargarLocalidades();
    this.cargarMunicipios();
  }

  cargarLocalidades(): void {
    this.localidadesService
      .obtenerLocalidades()
      .subscribe(data => {
        this.localidades = data;
      });
  }

  cargarMunicipios(): void {
    this.municipiosService
      .obtenerMunicipios()
      .subscribe(data => {
        this.municipios = data;
      });
  }

  guardarLocalidad(): void {

    if (!this.nombre || !this.municipioId) {
      return;
    }

    const localidad: Localidad = {
      nombre: this.nombre,
      municipioId: this.municipioId
    };

    if (this.editando) {

      this.localidadesService
        .actualizarLocalidad(
          this.localidadId,
          localidad
        )
        .then(() => {
          this.limpiarFormulario();
        });

    } else {

      this.localidadesService
        .agregarLocalidad(localidad)
        .then(() => {
          this.limpiarFormulario();
        });
    }
  }

  editarLocalidad(localidad: Localidad): void {

    this.editando = true;

    this.localidadId = localidad.id ?? '';
    this.nombre = localidad.nombre;
    this.municipioId = localidad.municipioId;
  }

  eliminarLocalidad(id?: string): void {

    if (!id) {
      return;
    }

    this.localidadesService
      .eliminarLocalidad(id)
      .then(() => {
        console.log('Localidad eliminada');
      });
  }

  obtenerNombreMunicipio(municipioId: string): string {

    const municipio = this.municipios.find(
      municipio => municipio.id === municipioId
    );

    return municipio
      ? municipio.nombre
      : 'Sin municipio';
  }

  limpiarFormulario(): void {

    this.nombre = '';
    this.municipioId = '';

    this.editando = false;
    this.localidadId = '';
  }
}