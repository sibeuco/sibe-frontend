export interface passwordRecoveryRequest{
    correo: string;
    claveNueva: string;
}

export interface editPasswordRequest{
    usuario: string;
    claveAntigua: string;
    claveNueva: string;
}