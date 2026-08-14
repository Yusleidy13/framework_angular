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
import { Carrera } from '../../models/carrera.model';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  private firestore = inject(Firestore);

  private carrerasCollection = collection(
    this.firestore,
    'carreras'
  );

  obtenerCarreras(): Observable<Carrera[]> {

    return collectionData(
      this.carrerasCollection,
      {
        idField: 'id'
      }
    ) as Observable<Carrera[]>;
  }

  agregarCarrera(carrera: Carrera) {

    return addDoc(
      this.carrerasCollection,
      {
        nombre: carrera.nombre,
        estatus: carrera.estatus
      }
    );
  }

  actualizarCarrera(
    id: string,
    carrera: Carrera
  ) {

    const carreraRef = doc(
      this.firestore,
      `carreras/${id}`
    );

    return updateDoc(
      carreraRef,
      {
        nombre: carrera.nombre,
        estatus: carrera.estatus
      }
    );
  }

  eliminarCarrera(id: string) {

    const carreraRef = doc(
      this.firestore,
      `carreras/${id}`
    );

    return deleteDoc(carreraRef);
  }
}