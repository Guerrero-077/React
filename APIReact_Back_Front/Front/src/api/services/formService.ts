import { ICreateForm, IForm } from "../types/IForm";
import { createGenericService } from "./generic-service/genericService";
export const formService = createGenericService<IForm, ICreateForm>("/Form");
