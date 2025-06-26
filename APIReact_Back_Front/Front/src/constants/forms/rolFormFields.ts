
import { IRol } from "../../api/types/IRol";
import { FieldDefinition } from "../../components/types/FieldDefinition";

export const rolFields: FieldDefinition<IRol>[] = [
    { key: "name", label: "Nombre", type: "text", placeholder: "Ingrese el nombre" },
    { key: "description", label: "Descripción", type: "textarea", placeholder: "Ingrese la descripción" },
];
