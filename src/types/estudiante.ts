export interface Estudiante {
  id: number;
  nombre: string;
  edad: number;
}

export interface EstudianteCreate {
  nombre: string;
  edad: number;
}

// EstudianteResponse es redundante, puedes usar Estudiante directamente
export type EstudianteResponse = Estudiante;