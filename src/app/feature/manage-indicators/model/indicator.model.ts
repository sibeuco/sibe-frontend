import { IndicatorTypeResponse } from "./indicator-type.model";
import { ProjectResponse } from "./project.model";
import { FrequencyResponse } from "./frequency.model";
import { InterestedPublicResponse } from "./interested-public.model";

export interface IndicatorRequest{
    nombre: string;
    tipoIndicador: string;
    temporalidad: string;
    proyecto: string;
    publicoInteres: string[];
}

export interface EditIndicatorRequest{
    nombre: string;
    tipoIndicador: string;
    temporalidad: string;
    proyecto: string;
    publicoInteres: string[];
}

export interface IndicatorResponse{
    identifiacdor: string;
    nombre: string;
    tipoIndicador: IndicatorTypeResponse;
    temporalidad: FrequencyResponse;
    proyecto: ProjectResponse;
    publicoInteres: InterestedPublicResponse[];
}