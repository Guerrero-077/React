
import { IRegister } from "../../api/types/IRegister";
import { FieldDefinition } from "../../components/types/FieldDefinition";

export const registerFields: FieldDefinition<IRegister>[] = [
    {
        key: "name",
        label: "Name",
        type: "text",
        placeholder: "Your full name",
        required: true,
    },
    {
        key: "email",
        label: "Email",
        type: "email",
        keyboardType: "email-address",
        placeholder: "ejemplo@email.com",
        required: true,
    },
    {
        key: "password",
        label: "Password",
        type: "password",
        placeholder: "********",
        secureTextEntry: true,
        required: true,
    },
    {
        key: "confirmPassword",
        label: "Confirm Password",
        placeholder: "********",
        type: "password",
        secureTextEntry: true,
        required: true,
    },
];
