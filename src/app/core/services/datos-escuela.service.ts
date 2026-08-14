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

import { DatosEscuela } from '../../models/datos-escuela.model';

@Injectable({
  providedIn: 'root'
})
export class DatosEscuelaService {

  private firestore = inject(Firestore);

  private escuelasRef = collection(
    this.firestore,
    'datosEscuela'
  );


  obtenerDatos(): Observable<DatosEscuela[]> {

    return collectionData(
      this.escuelasRef,
      {
        idField: 'id'
      }
    ) as Observable<DatosEscuela[]>;

  }


  agregarDatos(
    escuela: DatosEscuela
  ) {

    return addDoc(
      this.escuelasRef,
      {
        cct: escuela.cct,
        nombre: escuela.nombre,
        telefono: escuela.telefono,
        email: escuela.email,

        calle: escuela.calle,
        numE: escuela.numE,
        numI: escuela.numI,
        cp: escuela.cp,

        estadoId: escuela.estadoId,
        municipioId: escuela.municipioId,
        localidadId: escuela.localidadId
      }
    );

  }


  actualizarDatos(
    id: string,
    escuela: DatosEscuela
  ) {

    const escuelaRef = doc(
      this.firestore,
      `datosEscuela/${id}`
    );

    return updateDoc(
      escuelaRef,
      {
        cct: escuela.cct,
        nombre: escuela.nombre,
        telefono: escuela.telefono,
        email: escuela.email,

        calle: escuela.calle,
        numE: escuela.numE,
        numI: escuela.numI,
        cp: escuela.cp,

        estadoId: escuela.estadoId,
        municipioId: escuela.municipioId,
        localidadId: escuela.localidadId
      }
    );

  }


  eliminarDatos(id: string) {

    const escuelaRef = doc(
      this.firestore,
      `datosEscuela/${id}`
    );

    return deleteDoc(escuelaRef);

  }

}