// import React from "react";
// import { View, Text, TextInput, StyleSheet } from "react-native";
// import { FieldDefinition } from "./types/FieldDefinition";

// interface Props<T> {
//   form: T;
//   fields: FieldDefinition<T>[];
//   onChange: (key: keyof T, value: string) => void;
// }

// export default function GenericForm<T>({ form, fields, onChange }: Props<T>) {
//   return (
//     <View>
//       {fields.map((field) => (
//         <View key={String(field.key)} style={styles.inputContainer}>
//           <Text style={styles.label}>{field.label}</Text>
//           <TextInput
//             style={styles.input}
//             value={String(form[field.key] ?? "")}
//             placeholder={field.placeholder ?? ""}
//             onChangeText={(text) => onChange(field.key, text)}
//             keyboardType={field.type === "number" ? "numeric" : "default"}
//             multiline={field.type === "textarea"}
//           />
//         </View>
//       ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   inputContainer: { marginBottom: 16 },
//   label: { fontWeight: "bold", marginBottom: 4 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 6,
//     padding: 10,
//   },
// });

import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { FieldDefinition } from "./types/FieldDefinition";

interface Props<T> {
  form: T;
  fields: FieldDefinition<T>[];
  onChange: (key: keyof T, value: string) => void;
}

export default function GenericForm<T>({ form, fields, onChange }: Props<T>) {
  return (
    <View>
      {fields.map((field) => {
        const {
          key,
          label,
          placeholder,
          required,
          type,
          keyboardType,
          secureTextEntry,
          multiline,
          numberOfLines,
          disabled,
        } = field;

        const inputProps: TextInputProps = {
          value: String(form[key] ?? ""),
          onChangeText: (text) => onChange(key, text),
          placeholder: placeholder ?? "",
          editable: disabled ? false : true,
          keyboardType: keyboardType ?? getKeyboardTypeFromType(type),
          secureTextEntry: secureTextEntry ?? type === "password",
          multiline: multiline ?? type === "multiline",
          numberOfLines: numberOfLines ?? (type === "multiline" ? 4 : 1),
          style: [
            styles.input,
            disabled && styles.disabledInput,
            multiline && { height: numberOfLines ? numberOfLines * 24 : 100 },
          ],
        };

        return (
          <View key={String(key)} style={styles.inputContainer}>
            <Text style={styles.label}>
              {label} {required ? "*" : ""}
            </Text>
            <TextInput {...inputProps} />
          </View>
        );
      })}
    </View>
  );
}

function getKeyboardTypeFromType(type: string): TextInputProps["keyboardType"] {
  switch (type) {
    case "email":
      return "email-address";
    case "number":
      return "numeric";
    default:
      return "default";
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: "#f0f0f0",
    color: "#999",
  },
});
