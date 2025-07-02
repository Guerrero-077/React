
import { ILogin } from "../../api/types/ILogin";
import { FieldDefinition } from "../../components/types/FieldDefinition";

export const loginFields: FieldDefinition<ILogin>[] = [
  {
    key: "email",
    label: "Email",
    type: "email",
    placeholder: "usuario@correo.com",
    required: true,
    keyboardType: "email-address",
  },
  {
    key: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
    secureTextEntry: true,
  },
];
