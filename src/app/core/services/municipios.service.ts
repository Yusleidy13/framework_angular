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
import { Municipio } from '../../models/municipio.model';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {

  private firestore = inject(Firestore);

  private municipiosRef = collection(this.firestore, 'municipios');

  obtenerMunicipios(): Observable<Municipio[]> {
    return collectionData(this.municipiosRef, {
      idField: 'id'
    }) as Observable<Municipio[]>;
  }

  agregarMunicipio(municipio: Municipio) {
    return addDoc(this.municipiosRef, {
      nombre: municipio.nombre,
      estadoId: municipio.estadoId
    });
  }

  actualizarMunicipio(id: string, municipio: Municipio) {
    const municipioRef = doc(this.firestore, `municipios/${id}`);

    return updateDoc(municipioRef, {
      nombre: municipio.nombre,
      estadoId: municipio.estadoId
    });
  }

  eliminarMunicipio(id: string) {
    const municipioRef = doc(this.firestore, `municipios/${id}`);

    return deleteDoc(municipioRef);
  }
}