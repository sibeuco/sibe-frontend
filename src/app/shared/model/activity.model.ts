import { IndicatorRequest, IndicatorResponse } from "src/app/feature/manage-indicators/model/indicator.model";

export interface Actividad {
  id: number;
  nombreActividad: string;
  colaborador: string;
  fechaCreacion: Date;
  fechaProgramada?: Date;
  estado: EstadoActividad;
}

export interface ActivityRequest {
  nombre: string;
  objetivo: string;
  semestre: string;
  rutaInsumos: string;
  indicador: IndicatorRequest;
  colaborador: string;
  creador: string;
  fechasProgramadas: String[];
  area: string;
}

export interface ActivityResponse{
  identificador: string;
  nombre: string;
  objetivo: string;
  semestre: string;
  rutaInsumos: string;
  indicador: IndicatorResponse;
  colaborador: string;
  creador: string;
  fechasProgramadas: String[];
  area: string;
}

export enum EstadoActividad {
  PENDIENTE = 'Pendiente',
  EN_CURSO = 'En curso',
  FINALIZADO = 'Finalizado'
}
