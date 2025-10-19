export interface UserSession{
    correo: string;
    identificador: string;
    authorities: string[];
    logged: boolean;
}