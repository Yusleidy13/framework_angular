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
import { Genero } from '../../models/genero.model';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  private firestore = inject(Firestore);

  private generosCollection = collection(
    this.firestore,
    'generos'
  );

  obtenerGeneros(): Observable<Genero[]> {
    return collectionData(
      this.generosCollection,
      { idField: 'id' }
    ) as Observable<Genero[]>;
  }

  agregarGenero(genero: Genero) {
    return addDoc(
      this.generosCollection,
      {
        nombre: genero.nombre
      }
    );
  }

  actualizarGenero(id: string, genero: Genero) {

    const generoRef = doc(
      this.firestore,
      `generos/${id}`
    );

    return updateDoc(
      generoRef,
      {
        nombre: genero.nombre
      }
    );
  }

  eliminarGenero(id: string) {

    const generoRef = doc(
      this.firestore,
      `generos/${id}`
    );

    return deleteDoc(generoRef);
  }
}