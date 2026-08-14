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

import { Alumno } from '../../models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private firestore = inject(Firestore);

  private alumnosRef = collection(
    this.firestore,
    'alumnos'
  );


  obtenerAlumnos(): Observable<Alumno[]> {

    return collectionData(
      this.alumnosRef,
      {
        idField: 'id'
      }
    ) as Observable<Alumno[]>;

  }


  agregarAlumno(alumno: Alumno) {

    return addDoc(
      this.alumnosRef,
      {
        matricula: alumno.matricula,
        carreraId: alumno.carreraId,
        datosPersonalesId: alumno.datosPersonalesId,
        status: alumno.status
      }
    );

  }


  actualizarAlumno(
    id: string,
    alumno: Alumno
  ) {

    const alumnoRef = doc(
      this.firestore,
      `alumnos/${id}`
    );

    return updateDoc(
      alumnoRef,
      {
        matricula: alumno.matricula,
        carreraId: alumno.carreraId,
        datosPersonalesId: alumno.datosPersonalesId,
        status: alumno.status
      }
    );

  }


  eliminarAlumno(id: string) {

    const alumnoRef = doc(
      this.firestore,
      `alumnos/${id}`
    );

    return deleteDoc(alumnoRef);

  }

}