import { IPermission } from "../../api/types/IPermission";
import { FieldDefinition } from "../../components/types/FieldDefinition";

export const PermissionFields: FieldDefinition<IPermission>[] = [
    {
        key: "name",
        label: "Name",
        type: "text",
        placeholder: "Enter the Permission name",
        required: true,
    },
    {
        key: "description",
        label: "Description",
        type: "multiline", // Usamos "multiline" en lugar de "textarea"
        placeholder: "Enter a detailed description of the permission",
        required: true,
        multiline: true,
        numberOfLines: 4,
    },
];
