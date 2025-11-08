import { IdentificationResponse } from "./identification.model";
import { UserTypeResponse } from "./user-type.model";

export interface UserRequest {
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  nombres: string;
  apellidos: string;
  correo: string;
  clave: string;
  tipoUsuario: string;
  area: {
    area: string;
    tipoArea: string;
  };
}

export interface EditUserRequest {
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  nombres: string;
  apellidos: string;
  correo: string;
  tipoUsuario: string;
  area: {
    area: string;
    tipoArea: string;
  };
}

export interface UserResponse {
  identificador: string;
  nombres: string;
  apellidos: string;
  correo: string;
  identificacion: IdentificationResponse;
  tipoUsuario: UserTypeResponse;
  estaActivo: boolean;
  area?: {
    area: string;
    tipoArea: string;
  };
}