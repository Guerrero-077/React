export type FieldType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "multiline"
  | "select";

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
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  disabled?: boolean;
  options?: FieldOption[];
}
