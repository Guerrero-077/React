export interface IRolFormPermission {
    id: number;
    rolId: number;
    rolName: string;
    formId: number;
    formName: string;
    permissionId: number;
    permissionName: string;
}
export interface ICreateRolFormPermission {
    rolId: number;
    formId: number;
    permissionId: number;
}
export interface IUpdateRolFormPermission {
    id: number;
    rolId: number;
    formId: number;
    permissionId: number;
}
