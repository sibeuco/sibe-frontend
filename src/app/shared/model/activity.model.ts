import { IndicatorResponse } from "src/app/feature/manage-indicators/model/indicator.model";

export interface ActivityRequest {
  nombre: string;
  objetivo: string;
  semestre: string;
  rutaInsumos: string;
  indicador: string;
  colaborador: string;
  creador: string;
  fechasProgramadas: String[];
  area: {
    area: string;
    tipoArea: string;
  };
}

export interface EditActivityRequest {
  nombre: string;
  objetivo: string;
  semestre: string;
  rutaInsumos: string;
  indicador: string;
  colaborador: string;
  fechasProgramada: String[];
  area: {
    area: string;
    tipoArea: string;
  };
}

export interface ActivityResponse {
  identificador: string;
  nombre: string;
  objetivo: string;
  semestre: string;
  rutaInsumos: string;
  fechaCreacion: string;
  indicador: IndicatorResponse;
  colaborador: string;
  nombreColaborador: string;
  creador: string;
  area?: {
    area: string;
    tipoArea: string;
    nombreArea?: string;
  };
  tipoArea?: string;
  areaIdentificador?: string;
  fechasProgramadas?: string[];
}

export interface StartActivityResponse{
  identificador: string;
}

export interface CancelActivityResponse{
  identificador: string;
}

export interface ActivityInfo {
  nombre: string;
  colaborador: string;
  objetivo: string;
  indicador: string;
  fechaProgramada?: string;
  estado?: string;
  fechaRealizacion?: string;
}

export enum EstadoActividad {
  PENDIENTE = 'Pendiente',
  EN_CURSO = 'En curso',
  FINALIZADO = 'Finalizada'
}
