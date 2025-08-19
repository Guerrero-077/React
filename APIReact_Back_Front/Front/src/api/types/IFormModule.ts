export interface IFormModule {
    id: number;
    formId: number;
    formName: string;
    moduleId: number;
    moduleName: string;
}
export interface ICreateFormModule {
    formId: number;
    moduleId: number;
}
export interface IUpdateFormModule {
    id: number;
    formId: number;
    moduleId: number;
}
