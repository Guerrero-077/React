import { ICreateModule, IModule } from "../types/IModule";
import { createGenericService } from "./generic-service/genericService";

export const moduleService = createGenericService<IModule, ICreateModule>("/Module");
