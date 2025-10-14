export interface passwordRecoveryRequest{
    correo: string;
    claveNueva: string;
    confirmacionClaveNueva: string;
}

export interface editPasswordRequest{
    usuario: string;
    claveAntigua: string;
    claveNueva: string;
    confirmacionClaveNueva: string;
}