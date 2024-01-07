export interface ILink {
    icon: string
    id: number
    link: string
    nombre: string
    orden: number
    padre_id: number | null
    visible: boolean
}