import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreTestService {

  private firestore = inject(Firestore);

  obtenerPrueba(): Observable<any[]> {

    const referencia = collection(
      this.firestore,
      'prueba'
    );

    return collectionData(referencia, {
      idField: 'id'
    });
  }
}