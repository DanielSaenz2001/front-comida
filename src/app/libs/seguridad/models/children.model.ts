import { IPermiso } from "./permiso.model"

export interface IChildren {
    icon: string
    id: number
    link: string
    nombre: string
    orden: number
    padre_id: number
    permisos: IPermiso[]
    permisosLinks: IPermiso[]
}