import { ActivityStateResponse } from "./activity-state.model";

export interface ActivityExecutionResponse{
    identificador: string;
    fechaProgramada: string;
    fechaRealizacion: string;
    HoraInicio: string;
    HoraFin: string;
    estadoActividad: ActivityStateResponse;
}