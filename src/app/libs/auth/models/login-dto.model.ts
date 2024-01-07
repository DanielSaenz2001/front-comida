import { IPermiso } from "./permiso.model";

export interface ILoginResponse {
    access_token: string;
    dni: string;
    expires_in: string;
    permisos:  IPermiso[];
    token_type: string;
}