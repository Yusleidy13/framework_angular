import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { DatosPersonales } from '../../models/datos-personales.model';

@Injectable({
  providedIn: 'root'
})
export class DatosPersonalesService {

  private firestore = inject(Firestore);

  private datosCollection = collection(
    this.firestore,
    'datosPersonales'
  );

  obtenerDatos(): Observable<DatosPersonales[]> {

    return collectionData(
      this.datosCollection,
      {
        idField: 'id'
      }
    ) as Observable<DatosPersonales[]>;
  }

  agregarDatos(datos: DatosPersonales) {

    return addDoc(
      this.datosCollection,
      {
        nombre: datos.nombre,
        fechaNacimiento: datos.fechaNacimiento,
        curp: datos.curp,
        email: datos.email,
        telefono: datos.telefono,
        calle: datos.calle,
        numE: datos.numE,
        numI: datos.numI,
        cp: datos.cp,
        estadoId: datos.estadoId,
        municipioId: datos.municipioId,
        localidadId: datos.localidadId,
        generoId: datos.generoId
      }
    );
  }

  actualizarDatos(
    id: string,
    datos: DatosPersonales
  ) {

    const datosRef = doc(
      this.firestore,
      `datosPersonales/${id}`
    );

    return updateDoc(
      datosRef,
      {
        nombre: datos.nombre,
        fechaNacimiento: datos.fechaNacimiento,
        curp: datos.curp,
        email: datos.email,
        telefono: datos.telefono,
        calle: datos.calle,
        numE: datos.numE,
        numI: datos.numI,
        cp: datos.cp,
        estadoId: datos.estadoId,
        municipioId: datos.municipioId,
        localidadId: datos.localidadId,
        generoId: datos.generoId
      }
    );
  }

  eliminarDatos(id: string) {

    const datosRef = doc(
      this.firestore,
      `datosPersonales/${id}`
    );

    return deleteDoc(datosRef);
  }
}