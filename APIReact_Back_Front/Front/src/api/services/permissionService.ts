import { CreatePerrsmissionDTO, IPermission } from "../types/IPermission";
import { createGenericService } from "./generic-service/genericService";
export const PermissionService = createGenericService<IPermission, CreatePerrsmissionDTO>("/Permission");
