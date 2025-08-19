export interface IRolUser {
    id: number;
    rolName: string;
    rolId: number
    userName: string;
    userId: number
}
export interface CreateRolUserDTO {
    userId: number;
    rolId: number;
}
export interface UpdateRolUserDTO {
    id: number;
    userId: number;
    rolId: number;
}
