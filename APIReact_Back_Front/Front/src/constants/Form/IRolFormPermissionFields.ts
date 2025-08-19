// types/fields/RolFormPermissionFields.ts
import { FieldDefinition } from "../../components/types/FieldDefinition";
import { ICreateRolFormPermission, IUpdateRolFormPermission } from '../../api/types/IRolFormPermission';
import { IRol } from "../../api/types/IRol";
import { IForm } from "../../api/types/IForm";
import { IPermission } from "../../api/types/IPermission";

const mapToOptions = <T extends { id: number; name: string }>(arr: T[]) =>
    arr.map((x) => ({ label: x.name, value: x.id }));

// 👇 Devuelve los fields CON options ya cargadas
export function buildRolFormPermissionFields(roles: IRol[],forms: IForm[],permissions: IPermission[]
): FieldDefinition<ICreateRolFormPermission | IUpdateRolFormPermission>[] {
    return [
        {
            key: "rolId",
            label: "Rol",
            type: "select",
            placeholder: "Selecciona un rol",
            required: true,
            options: mapToOptions(roles),
        },
        {
            key: "formId",
            label: "Formulario",
            type: "select",
            placeholder: "Selecciona un formulario",
            required: true,
            options: mapToOptions(forms),
        },
        {
            key: "permissionId",
            label: "Permiso",
            type: "select",
            placeholder: "Selecciona un permiso",
            required: true,
            options: mapToOptions(permissions),
        },
    ];
}
