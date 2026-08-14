import { Injectable, inject } from '@angular/core';

import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from '@angular/fire/auth';

import {
  Firestore,
  doc,
  getDoc
} from '@angular/fire/firestore';

import { Observable, BehaviorSubject } from 'rxjs';

import { UsuariosService } from './usuarios.service';
import { Usuario } from '../../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);

  private firestore = inject(Firestore);

  private usuariosService = inject(
    UsuariosService
  );


  private usuarioActualSubject =
    new BehaviorSubject<Usuario | null>(null);


  usuarioActual$: Observable<Usuario | null> =
    this.usuarioActualSubject.asObservable();


  private rolActualSubject =
    new BehaviorSubject<string | null>(null);


  rolActual$: Observable<string | null> =
    this.rolActualSubject.asObservable();


  constructor() {

    onAuthStateChanged(
      this.auth,
      async (user: User | null) => {

        if (user) {

          await this.cargarDatosUsuario(
            user.uid
          );

        } else {

          this.usuarioActualSubject.next(
            null
          );

          this.rolActualSubject.next(
            null
          );

        }

      }
    );

  }


  async iniciarSesion(
    email: string,
    password: string
  ) {

    const resultado =
      await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );


    await this.cargarDatosUsuario(
      resultado.user.uid
    );

  }


  async cargarDatosUsuario(
    uid: string
  ): Promise<void> {

    return new Promise((resolve) => {

      this.usuariosService
        .obtenerUsuarioPorUid(uid)
        .subscribe({

          next: async usuarios => {

            if (usuarios.length === 0) {

              await this.cerrarSesion();

              console.error(
                'No existe un usuario asociado a este UID'
              );

              resolve();

              return;

            }


            const usuario = usuarios[0];


            if (!usuario.activo) {

              await this.cerrarSesion();

              console.error(
                'El usuario está desactivado'
              );

              resolve();

              return;

            }


            this.usuarioActualSubject.next(
              usuario
            );


            // Obtener nombre del rol

            try {

              const rolRef = doc(
                this.firestore,
                `roles/${usuario.rolId}`
              );


              const rolSnapshot =
                await getDoc(rolRef);


              if (rolSnapshot.exists()) {

                const rol = rolSnapshot.data();

                this.rolActualSubject.next(
                  rol['nombre']
                );

              } else {

                this.rolActualSubject.next(
                  null
                );

              }

            } catch (error) {

              console.error(
                'Error al obtener rol:',
                error
              );

              this.rolActualSubject.next(
                null
              );

            }


            resolve();

          },

          error: error => {

            console.error(
              'Error al obtener usuario:',
              error
            );

            resolve();

          }

        });

    });

  }


  obtenerUsuarioActual():
    Usuario | null {

    return this.usuarioActualSubject.value;

  }


  obtenerRolActual():
    string | null {

    return this.rolActualSubject.value;

  }


  esAdministrador(): boolean {

    return this.obtenerRolActual() ===
      'Administrador';

  }


  esEditor(): boolean {

    return this.obtenerRolActual() ===
      'Editor';

  }


  estaAutenticado(): boolean {

    return this.auth.currentUser !== null;

  }


  async cerrarSesion(): Promise<void> {

    await signOut(this.auth);

    this.usuarioActualSubject.next(
      null
    );

    this.rolActualSubject.next(
      null
    );

  }

}