import { Routes } from '@angular/router';

import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { AgregarAlumnoComponent } from './components/agregar-alumno/agregar-alumno.component';
import { EditarAlumnoComponent } from './components/editar-alumno/editar-alumno.component';

export const routes: Routes = [

  {
    path:'',
    component:AlumnosComponent
  },

  {
    path:'agregar',
    component:AgregarAlumnoComponent
  },

  {
    path:'editar/:id',
    component:EditarAlumnoComponent
  }

];