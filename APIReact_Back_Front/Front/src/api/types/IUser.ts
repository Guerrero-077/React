export interface UserDTO {
    id: number;
    name: string;
    email: string;
    personId: number;
    personName: string;
}

export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    personId: number;
}
export interface UpdateUserDTO {
    id: number;
    name: string;
    email: string;
    password: string;
    personId: number;
}