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

import { Rol } from '../../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private firestore = inject(Firestore);

  private rolesRef = collection(
    this.firestore,
    'roles'
  );


  obtenerRoles(): Observable<Rol[]> {

    return collectionData(
      this.rolesRef,
      {
        idField: 'id'
      }
    ) as Observable<Rol[]>;

  }


  agregarRol(rol: Rol) {

    return addDoc(
      this.rolesRef,
      {
        nombre: rol.nombre
      }
    );

  }


  actualizarRol(
    id: string,
    rol: Rol
  ) {

    const rolRef = doc(
      this.firestore,
      `roles/${id}`
    );

    return updateDoc(
      rolRef,
      {
        nombre: rol.nombre
      }
    );

  }


  eliminarRol(id: string) {

    const rolRef = doc(
      this.firestore,
      `roles/${id}`
    );

    return deleteDoc(rolRef);

  }

}