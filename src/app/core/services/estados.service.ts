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
import { Estado } from '../../models/estado.models';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  private firestore = inject(Firestore);

  private estadosCollection = collection(
    this.firestore,
    'estados'
  );

  obtenerEstados(): Observable<Estado[]> {

    return collectionData(
      this.estadosCollection,
      {
        idField: 'id'
      }
    ) as Observable<Estado[]>;
  }

  agregarEstado(estado: Estado) {

    return addDoc(
      this.estadosCollection,
      {
        nombre: estado.nombre
      }
    );
  }

  actualizarEstado(
    id: string,
    estado: Estado
  ) {

    const estadoRef = doc(
      this.firestore,
      `estados/${id}`
    );

    return updateDoc(
      estadoRef,
      {
        nombre: estado.nombre
      }
    );
  }

  eliminarEstado(id: string) {

    const estadoRef = doc(
      this.firestore,
      `estados/${id}`
    );

    return deleteDoc(estadoRef);
  }
}