import { httpClient } from "../interceptor/httpClient";
import { ICreateFormModule, IFormModule } from "../types/IFormModule";
import { createGenericService } from "./generic-service/genericService";

export const formModuleService = {
    ...createGenericService<IFormModule, ICreateFormModule>("/FormModule"),

    // Método extra:
    getAllDynamic: async (): Promise<IFormModule[]> => {
        return await httpClient.get<IFormModule[]>("/FormModule/dynamic");
    },
};