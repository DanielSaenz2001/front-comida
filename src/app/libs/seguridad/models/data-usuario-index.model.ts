import { IUsuario } from "./usuario.model"

export interface IDataUsuarioIndex {
    current_page: number,
    data: IUsuario[],
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    links: [
        {
            url: null,
            label: string,
            active: boolean
        },
        {
            url: string,
            label: string,
            active: boolean
        },
        {
            url: null,
            label: string,
            active: boolean
        }
    ],
    next_page_url: null,
    path: string,
    per_page: number,
    prev_page_url: string | null,
    to: number,
    total: number
}