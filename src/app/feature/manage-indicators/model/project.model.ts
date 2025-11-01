import { ActionResponse } from "./action.model";

export interface ProjectRequest{
    numeroProyecto: string;
    nombre:string;
    objetivo: string;
    acciones: string[];
}

export interface EditProjectRequest{
    nombre:string;
    objetivo: string;
    acciones: string[];
}

export interface ProjectResponse{
    identificador: string;
    numeroProyecto: string;
    nombre:string;
    objetivo: string;
    acciones?: string[];
}
