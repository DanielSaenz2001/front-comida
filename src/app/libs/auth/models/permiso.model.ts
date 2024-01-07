import { IPermisoChildren } from "./permiso-children.model";

export interface IPermiso {
    children: IPermisoChildren[];
    icon: string;
    id: number;
    link: string;
    nombre: string;
    orden: number;
    padre_id: null | number;
    visible: number;
}