
import { IPerson } from "../../api/types/IPerson";
import { CreateUserDTO, UpdateUserDTO } from "../../api/types/IUser";
import { FieldDefinition } from "../../components/types/FieldDefinition";

export const buildUserFields = (
  persons: IPerson[]
): FieldDefinition<CreateUserDTO | UpdateUserDTO>[] => [
  {
    key: "name",
    label: "Full name",
    type: "text",
    placeholder: "Enter your name",
    required: true,
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    placeholder: "ejemplo@correo.com",
    required: true,
    keyboardType: "email-address",
  },
  {
    key: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter a secure password",
    required: true,
    secureTextEntry: true,
  },
  {
    key: "personId",
    label: "Person",
    type: "select",
    placeholder: "Select a person",
    required: true,
    options: persons.map((person) => ({
      label: `${person.firstName} ${person.lastName}`,
      value: person.id,
    })),
  },
];
