export interface activityRequest{
    nombre: string;
    objetivo: string;
    semestre: string;
    rutaInsumos: string;
    indicador: string;
    colaborador: string;
    creador: string;
    fechaProgramada: String[];
    area: string;
}

export interface editActivityRequest{
    nombre: string;
    objetivo: string;
    semestre: string;
    rutaInsumos: string;
    indicador: string;
    colaborador: string;
    fechaProgramada: String[];
    area: string;
}

export interface activityClosureRequest{
    miembros: string[];
    horaFin: string;
    fechaRealizacion: string;
    ejecucionActividad: string;
}

export interface activityStartRequest{
    horaInicio: string;
    ejecucionActividad: string;
}