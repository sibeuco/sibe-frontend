export interface Actividad {
  id: number;
  nombreActividad: string;
  colaborador: string;
  fechaCreacion: Date;
  fechaProgramada?: Date;
  estado: EstadoActividad;
}

export enum EstadoActividad {
  PENDIENTE = 'Pendiente',
  EN_CURSO = 'En curso',
  FINALIZADO = 'Finalizado'
}
