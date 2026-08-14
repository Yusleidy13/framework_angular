export interface DatosPersonales {
  id?: string;

  nombre: string;
  fechaNacimiento: string;
  curp: string;
  email: string;
  telefono: string;

  calle: string;
  numE: number | null;
  numI: number | null;
  cp: string;

  estadoId: string;
  municipioId: string;
  localidadId: string;
  generoId: string;
}