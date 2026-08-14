import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';


export const routes: Routes = [

  // ==========================================
  // RUTA INICIAL
  // ==========================================

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },


  // ==========================================
  // LOGIN
  // ==========================================

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component')
        .then(m => m.LoginComponent)
  },


  // ==========================================
  // APLICACIÓN
  // ==========================================

  {
    path: '',

    loadComponent: () =>
      import('./layout/menu/menu.component')
        .then(m => m.MenuComponent),

    canActivate: [authGuard],

    children: [

      // ========================================
      // INICIO
      // ========================================

      {
        path: 'inicio',

        loadComponent: () =>
          
          import('./pages/inicio/inicio.component')
            .then(m => m.InicioComponent)
      },

 
      // ========================================
      // CATÁLOGOS
      // ========================================

      {
        path: 'estados',

        loadComponent: () =>
          import('./pages/estados/estados.component')
            .then(m => m.EstadosComponent)
      },


      {
        path: 'municipios',

        loadComponent: () =>
          import('./pages/municipios/municipios.component')
            .then(m => m.MunicipiosComponent)
      },


      {
        path: 'localidades',

        loadComponent: () =>
          import('./pages/localidades/localidades.component')
            .then(m => m.LocalidadesComponent)
      },


      {
        path: 'carreras',

        loadComponent: () =>
          import('./pages/carreras/carreras.component')
            .then(m => m.CarrerasComponent)
      },


      {
        path: 'generos',

        loadComponent: () =>
          import('./pages/generos/generos.component')
            .then(m => m.GenerosComponent)
      },


      {
        path: 'tipos-personal',

        loadComponent: () =>
          import('./pages/tipos-personal/tipos-personal.component')
            .then(m => m.TiposPersonalComponent)
      },


      // ========================================
      // REGISTROS
      // ========================================

      {
        path: 'datos-personales',

        loadComponent: () =>
          import('./pages/datos-personales/datos-personales.component')
            .then(m => m.DatosPersonalesComponent)
      },


      {
        path: 'alumnos',

        loadComponent: () =>
          import('./pages/alumnos/alumnos.component')
            .then(m => m.AlumnosComponent)
      },


      {
        path: 'personal',

        loadComponent: () =>
          import('./pages/personal/personal.component')
            .then(m => m.PersonalComponent)
      },


      // ========================================
      // DATOS DE LA ESCUELA
      // ========================================

      {
        path: 'datos-escuela',

        loadComponent: () =>
          import('./pages/datos-escuela/datos-escuela.component')
            .then(m => m.DatosEscuelaComponent)
      },


     

    ]
  },


  // ==========================================
  // RUTAS DESCONOCIDAS
  // ==========================================

  {
    path: '**',
    redirectTo: 'login'
  }

];