import { IPerson } from "../types/IPerson";
import { createGenericService } from "./generic-service/genericService";

export const personService = createGenericService<IPerson, IPerson>("/Person");
