import { projectRequest } from "./project.model";

export interface indicatorRequest{
    nombre: string;
    tipoIndicador: string;
    temporalidad: string;
    proyecto: string;
    publicoInteres: string;
}