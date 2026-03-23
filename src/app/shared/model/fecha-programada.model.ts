export interface FechaProgramada {
  ejecucionId: string;
  fecha: Date;
  estado: EstadoFechaProgramada;
  actividadId: string;
}

export enum EstadoFechaProgramada {
  PENDIENTE = 'Pendiente',
  EN_CURSO = 'En curso',
  FINALIZADO = 'Finalizada'
}
