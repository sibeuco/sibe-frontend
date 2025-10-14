export interface userRequest{
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    nombres: string;
    apellidos: string;
    correo: string;
    clave: string;
    tipoUsuario: string;
    area: string;
}

export interface editUserRequest{
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    nombres: string;
    apellidos: string;
    correo: string;
    tipoUsuario: string;
    area: string;
}