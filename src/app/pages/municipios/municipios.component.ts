import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MunicipiosService } from '../../core/services/municipios.service';
import { EstadosService } from '../../core/services/estados.service';
import { AuthService } from '../../core/services/auth.service';
import { Municipio } from '../../models/municipio.model';
import { Estado } from '../../models/estado.models';

@Component({
  selector: 'app-municipios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './municipios.component.html',
  styleUrl: './municipios.component.css'
})
export class MunicipiosComponent implements OnInit {

  private municipiosService = inject(MunicipiosService);
  private estadosService = inject(EstadosService);
  public authService = inject(AuthService);
  
  municipios: Municipio[] = [];
  estados: Estado[] = [];

  nombre = '';
  estadoId = '';

  editando = false;
  municipioId = '';

  ngOnInit(): void {
    this.cargarMunicipios();
    this.cargarEstados();
  }

  cargarMunicipios(): void {
    this.municipiosService.obtenerMunicipios().subscribe(data => {
      this.municipios = data;
    });
  }

  cargarEstados(): void {
    this.estadosService.obtenerEstados().subscribe(data => {
      this.estados = data;
    });
  }

  guardarMunicipio(): void {

    if (!this.nombre || !this.estadoId) {
      return;
    }

    const municipio: Municipio = {
      nombre: this.nombre,
      estadoId: this.estadoId
    };

    if (this.editando) {

      this.municipiosService
        .actualizarMunicipio(this.municipioId, municipio)
        .then(() => {
          this.limpiarFormulario();
        });

    } else {

      this.municipiosService
        .agregarMunicipio(municipio)
        .then(() => {
          this.limpiarFormulario();
        });
    }
  }

  editarMunicipio(municipio: Municipio): void {
    this.editando = true;

    this.municipioId = municipio.id ?? '';
    this.nombre = municipio.nombre;
    this.estadoId = municipio.estadoId;
  }

  eliminarMunicipio(id?: string): void {

    if (!id) {
      return;
    }

    this.municipiosService
      .eliminarMunicipio(id)
      .then(() => {
        console.log('Municipio eliminado');
      });
  }

  obtenerNombreEstado(estadoId: string): string {

    const estado = this.estados.find(
      estado => estado.id === estadoId
    );

    return estado ? estado.nombre : 'Sin estado';
  }

  limpiarFormulario(): void {
    this.nombre = '';
    this.estadoId = '';

    this.editando = false;
    this.municipioId = '';
  }
}