// export type FieldType = "text" | "number" | "textarea" | "email";

// export interface FieldDefinition<T> {
//     key: keyof T;
//     label: string;
//     type: FieldType;
//     placeholder?: string;
// }

// src/types/FieldDefinition.ts
export type FieldType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "multiline"
  | "select"; // para futuros campos con opciones

export interface FieldOption {
  label: string;
  value: string | number;
}

export interface FieldDefinition<T> {
  key: keyof T;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  keyboardType?: "default" | "numeric" | "email-address";
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  disabled?: boolean;
  options?: FieldOption[]; // útil si agregas selects en el futuro
}
