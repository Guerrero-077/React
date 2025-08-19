
import { IPerson } from "../../api/types/IPerson";
import { FieldDefinition } from "../../components/types/FieldDefinition";

export const personFields: FieldDefinition<IPerson>[] = [
    {
        key: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "John",
        required: true,
    },
    {
        key: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Doe",
        required: true,
    },
    {
        key: "phoneNumber",
        label: "Phone Number",
        type: "text",
        placeholder: "123-456-7890",
        required: true,
        keyboardType: "phone-pad",
    },
    {
        key: "address",
        label: "Address",
        placeholder: "AV Siempre Viva 123",
        type: "text",
        required: true,
    },
];
