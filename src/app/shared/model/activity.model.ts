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
}

export enum EstadoActividad {
  PENDIENTE = 'Pendiente',
  EN_CURSO = 'En curso',
  FINALIZADO = 'Finalizado'
}
