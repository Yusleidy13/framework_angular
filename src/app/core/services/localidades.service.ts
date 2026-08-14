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
import { Localidad } from '../../models/localidad.model';

@Injectable({
  providedIn: 'root'
})
export class LocalidadesService {

  private firestore = inject(Firestore);

  private localidadesRef = collection(
    this.firestore,
    'localidades'
  );

  obtenerLocalidades(): Observable<Localidad[]> {
    return collectionData(this.localidadesRef, {
      idField: 'id'
    }) as Observable<Localidad[]>;
  }

  agregarLocalidad(localidad: Localidad) {
    return addDoc(this.localidadesRef, {
      nombre: localidad.nombre,
      municipioId: localidad.municipioId
    });
  }

  actualizarLocalidad(
    id: string,
    localidad: Localidad
  ) {
    const localidadRef = doc(
      this.firestore,
      `localidades/${id}`
    );

    return updateDoc(localidadRef, {
      nombre: localidad.nombre,
      municipioId: localidad.municipioId
    });
  }

  eliminarLocalidad(id: string) {
    const localidadRef = doc(
      this.firestore,
      `localidades/${id}`
    );

    return deleteDoc(localidadRef);
  }
}