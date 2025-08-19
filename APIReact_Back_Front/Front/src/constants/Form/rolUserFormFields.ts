
import { IRol } from "../../api/types/IRol";
import { CreateRolUserDTO, IRolUser, UpdateRolUserDTO } from "../../api/types/IRolUser";
import { UserDTO } from "../../api/types/IUser";
import { FieldDefinition } from "../../components/types/FieldDefinition";

const mapToOptions = <T extends { id: number; name: string }>(arr: T[]) =>
    arr.map((x) => ({ label: x.name, value: x.id }));

export function RolUserFields(roles: IRol[], users: UserDTO[]): FieldDefinition<CreateRolUserDTO | UpdateRolUserDTO>[] {

    return [
        {
            key: "rolId",
            label: "Rol",
            type: "select",
            placeholder: "Select a Rol",
            required: true,
            options: mapToOptions(roles),
        },
        {
            key: "userId",
            label: "User",
            type: "select",
            placeholder: "Select a user",
            required: true,
            options: mapToOptions(users),
        }
    ];

}
