import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  docData,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private firestore = inject(Firestore);

  private usuariosRef = collection(
    this.firestore,
    'usuarios'
  );


  // ==========================================
  // OBTENER TODOS LOS USUARIOS
  // ==========================================

  obtenerUsuarios(): Observable<Usuario[]> {

    return collectionData(
      this.usuariosRef,
      {
        idField: 'id'
      }
    ) as Observable<Usuario[]>;

  }


  // ==========================================
  // OBTENER USUARIO POR UID
  // ==========================================

  obtenerUsuarioPorUid(
    uid: string
  ): Observable<Usuario[]> {

    const usuarioRef = doc(
      this.firestore,
      `usuarios/${uid}`
    );

    return docData(
      usuarioRef,
      {
        idField: 'id'
      }
    ).pipe(

      map(usuario =>
        usuario
          ? [usuario as Usuario]
          : []
      )

    );

  }


  // ==========================================
  // AGREGAR USUARIO
  // ==========================================

  agregarUsuario(
    usuario: Usuario
  ) {

    return addDoc(
      this.usuariosRef,
      {
        uid: usuario.uid,
        nombre: usuario.nombre,
        usuario: usuario.usuario,
        email: usuario.email,
        rolId: usuario.rolId,
        activo: usuario.activo
      }
    );

  }


  // ==========================================
  // ACTUALIZAR USUARIO
  // ==========================================

  actualizarUsuario(
    id: string,
    usuario: Usuario
  ) {

    const usuarioRef = doc(
      this.firestore,
      `usuarios/${id}`
    );

    return updateDoc(
      usuarioRef,
      {
        nombre: usuario.nombre,
        usuario: usuario.usuario,
        email: usuario.email,
        rolId: usuario.rolId,
        activo: usuario.activo
      }
    );

  }


  // ==========================================
  // ELIMINAR USUARIO
  // ==========================================

  eliminarUsuario(
    id: string
  ) {

    const usuarioRef = doc(
      this.firestore,
      `usuarios/${id}`
    );

    return deleteDoc(
      usuarioRef
    );

  }

}