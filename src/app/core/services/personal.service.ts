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

import { Personal } from '../../models/personal.model';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private firestore = inject(Firestore);

  private personalRef = collection(
    this.firestore,
    'personal'
  );


  obtenerPersonal(): Observable<Personal[]> {

    return collectionData(
      this.personalRef,
      {
        idField: 'id'
      }
    ) as Observable<Personal[]>;

  }


  agregarPersonal(personal: Personal) {

    return addDoc(
      this.personalRef,
      {
        datosPersonalesId:
          personal.datosPersonalesId,

        tipoPersonalId:
          personal.tipoPersonalId,

        claveEmpleado:
          personal.claveEmpleado,

        status:
          personal.status
      }
    );

  }


  actualizarPersonal(
    id: string,
    personal: Personal
  ) {

    const personalRef = doc(
      this.firestore,
      `personal/${id}`
    );

    return updateDoc(
      personalRef,
      {
        datosPersonalesId:
          personal.datosPersonalesId,

        tipoPersonalId:
          personal.tipoPersonalId,

        claveEmpleado:
          personal.claveEmpleado,

        status:
          personal.status
      }
    );

  }


  eliminarPersonal(id: string) {

    const personalRef = doc(
      this.firestore,
      `personal/${id}`
    );

    return deleteDoc(personalRef);

  }

}