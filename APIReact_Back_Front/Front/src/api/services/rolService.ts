import { CreateRolDTO, IRol } from "../types/IRol";
import { createGenericService } from "./generic-service/genericService";

export const rolService = createGenericService<IRol, CreateRolDTO>("/Rol");
