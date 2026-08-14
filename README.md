# Control Escolar



Control Escolar es una aplicación web desarrollada con Angular que permite gestionar información relacionada con el control escolar.

La aplicación cuenta con autenticación de usuarios mediante Firebase Authentication y utiliza Cloud Firestore como base de datos para almacenar y consultar la información del sistema.

La aplicación se encuentra desplegada en Firebase Hosting.

---

## 🌐 Aplicación desplegada

**URL de producción:**

https://angular-c4ca3.web.app/

---

## 📦 Repositorio

**Repositorio de GitHub:**

https://github.com/Yusleidy13/framework_angular.git

---

## 🛠️ Tecnologías utilizadas

- Angular
- TypeScript
- HTML5
- CSS
- Firebase Authentication
- Cloud Firestore
- Firebase Hosting
- Git
- GitHub
- Node.js
- npm

---

## ☁️ Arquitectura de la solución

La aplicación utiliza una arquitectura basada en servicios de Firebase.

```text
                         USUARIO
                            │
                            ▼
                  ┌───────────────────┐
                  │ Firebase Hosting  │
                  │   Angular App     │
                  └─────────┬─────────┘
                            │
                  ┌─────────┴─────────┐
                  │                   │
                  ▼                   ▼
        ┌──────────────────┐  ┌──────────────────┐
        │ Firebase         │  │ Cloud Firestore  │
        │ Authentication   │  │ Base de datos    │
        └──────────────────┘  └──────────────────┘
