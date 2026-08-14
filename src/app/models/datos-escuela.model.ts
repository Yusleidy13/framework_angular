export interface DatosEscuela {
  id?: string;

  cct: string;
  nombre: string;
  telefono: string;
  email: string;

  calle: string;
  numE: number | null;
  numI: number | null;
  cp: string;

  estadoId: string;
  municipioId: string;
  localidadId: string;
}