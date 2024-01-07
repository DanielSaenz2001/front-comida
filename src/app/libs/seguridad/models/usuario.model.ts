export interface IUsuario {
    id: number,
    nombres: string,
    ap_paterno: string,
    ap_materno: string,
    fec_nacimiento: string,
    sexo: 0,
    dni: string,
    email: string,
    celular: string,
    estado: boolean,
    direccion: string | null,
    username: string
}