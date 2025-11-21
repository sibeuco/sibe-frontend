export interface FiltersRequest {
    mes: string
    anno: number;
    semestre: string;
    programaAcademico: string;
    tipoProgramaAcademico: string;
    centroCostos: string;
    tipoParticipante: string;
    indicador: string;
    tipoArea: string;
    idArea: string;
}

export interface MonthsResponse{
    meses: string[];
}

export interface YearsResponse{
    anios: number[];
}

export interface SemestersResponse{
    semestres: string[];
}

export interface AcademicProgramsResponse{
    programasAcademicos: string[];
}

export interface AcademicProgramTypesResponse{
    tiposProgramaAcademico: string[];
}

export interface CostCentersResponse{
    centrosCostos: string[];
}

export interface ParticipantTypesResponse{
    tiposParticipante: string[];
}

export interface IndicatorsResponse{
    indicadores: string[];
}