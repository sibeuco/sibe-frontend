import { identificationTypeResponse } from "./identification-type.model";

export interface identificationResponse{
    identificador: string;
    numeroIdentificacion: string;
    tipoIdentificacion: identificationTypeResponse;
}