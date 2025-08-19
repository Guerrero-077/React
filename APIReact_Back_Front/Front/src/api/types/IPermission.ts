//model
export interface IPermission {
    id: number;
    name: string;
    description: string;
}
export interface CreatePerrsmissionDTO {
    name: string;
    description: string;
}