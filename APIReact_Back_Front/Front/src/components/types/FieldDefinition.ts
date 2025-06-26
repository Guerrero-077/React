// src/types/FieldDefinition.ts
export type FieldType = "text" | "number" | "textarea" | "email";

export interface FieldDefinition<T> {
    key: keyof T;
    label: string;
    type: FieldType;
    placeholder?: string;
}
