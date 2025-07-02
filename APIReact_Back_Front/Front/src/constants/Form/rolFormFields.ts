import { IRol } from "../../api/types/IRol";
import { FieldDefinition } from "../../components/types/FieldDefinition";

export const rolFields: FieldDefinition<IRol>[] = [
    {
        key: "name",
        label: "Name",
        type: "text",
        placeholder: "Enter the role name",
        required: true,
    },
    {
        key: "description",
        label: "Description",
        type: "multiline", // Usamos "multiline" en lugar de "textarea"
        placeholder: "Enter a detailed description of the role",
        required: true,
        multiline: true,
        numberOfLines: 4,
    },
];
