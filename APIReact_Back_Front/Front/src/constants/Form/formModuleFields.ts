// types/fields/RolFormPermissionFields.ts
import { IForm } from "../../api/types/IForm";
import { ICreateFormModule, IUpdateFormModule } from "../../api/types/IFormModule";
import { IModule } from "../../api/types/IModule";
import { FieldDefinition } from "../../components/types/FieldDefinition";

const mapToOptions = <T extends { id: number; name: string }>(arr: T[]) =>
    arr.map((x) => ({ label: x.name, value: x.id }));

// 👇 Devuelve los fields CON options ya cargadas
export function buildFormModuleFields(forms: IForm[], module: IModule[]
): FieldDefinition<ICreateFormModule | IUpdateFormModule>[] {
    return [
        {
            key: "formId",
            label: "Formulario",
            type: "select",
            placeholder: "Selecciona un formulario",
            required: true,
            options: mapToOptions(forms),
        },
        {
            key: "moduleId",
            label: "module",
            type: "select",
            placeholder: "Select a module",
            required: true,
            options: mapToOptions(module),
        },
    ];
}
