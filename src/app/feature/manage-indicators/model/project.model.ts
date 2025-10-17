import { actionRequest } from "./action.model";

export interface projectRequest{
    numeroProyecto: string;
    nombre:string;
    objetivo: string;
    accion: string[];
}

export interface editProjectRequest{
    nombre:string;
    objetivo: string;
    accion: string[];
}
