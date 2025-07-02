import { IUser } from "../../api/types/IUser";
import { FieldDefinition } from "../../components/types/FieldDefinition";

export const userFields: FieldDefinition<IUser>[] = [
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
];
