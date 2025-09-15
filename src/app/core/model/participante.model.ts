export interface Participante {
  id?: number;
  tipoIdentificacion: string;
  documento: string;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  correo: string;
  rfid?: string;
  tipoUsuario: string;
}

export interface AsistenciaActividad {
  id?: number;
  idActividad: number;
  idParticipante: number;
  fechaAsistencia: Date;
  participante?: Participante;
}
