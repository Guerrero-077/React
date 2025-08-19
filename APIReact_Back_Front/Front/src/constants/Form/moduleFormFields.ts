
import { IModule } from "../../api/types/IModule";
import { FieldDefinition } from "../../components/types/FieldDefinition";

export const moduleFields: FieldDefinition<IModule>[] = [
    {
        key: "name",
        label: "Name",
        type: "text",
        placeholder: "Enter the Form name",
        required: true,
    },
    {
        key: "description",
        label: "Description",
        type: "multiline", // Usamos "multiline" en lugar de "textarea"
        placeholder: "Enter a detailed description of the Form",
        required: true,
        multiline: true,
        numberOfLines: 4,
    },
];
