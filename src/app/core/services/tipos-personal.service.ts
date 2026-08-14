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
import { TipoPersonal } from '../../models/tipo-personal.model';

@Injectable({
  providedIn: 'root'
})
export class TiposPersonalService {

  private firestore = inject(Firestore);

  private tiposCollection = collection(
    this.firestore,
    'tiposPersonal'
  );

  obtenerTipos(): Observable<TipoPersonal[]> {

    return collectionData(
      this.tiposCollection,
      {
        idField: 'id'
      }
    ) as Observable<TipoPersonal[]>;
  }

  agregarTipo(tipo: TipoPersonal) {

    return addDoc(
      this.tiposCollection,
      {
        nombre: tipo.nombre
      }
    );
  }

  actualizarTipo(
    id: string,
    tipo: TipoPersonal
  ) {

    const tipoRef = doc(
      this.firestore,
      `tiposPersonal/${id}`
    );

    return updateDoc(
      tipoRef,
      {
        nombre: tipo.nombre
      }
    );
  }

  eliminarTipo(id: string) {

    const tipoRef = doc(
      this.firestore,
      `tiposPersonal/${id}`
    );

    return deleteDoc(tipoRef);
  }
}