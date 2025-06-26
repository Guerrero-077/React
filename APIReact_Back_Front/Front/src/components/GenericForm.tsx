import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { FieldDefinition } from "./types/FieldDefinition";

interface Props<T> {
  form: T;
  fields: FieldDefinition<T>[];
  onChange: (key: keyof T, value: string) => void;
}

export default function GenericForm<T>({ form, fields, onChange }: Props<T>) {
  return (
    <View>
      {fields.map((field) => (
        <View key={String(field.key)} style={styles.inputContainer}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            style={styles.input}
            value={String(form[field.key] ?? "")}
            placeholder={field.placeholder ?? ""}
            onChangeText={(text) => onChange(field.key, text)}
            keyboardType={field.type === "number" ? "numeric" : "default"}
            multiline={field.type === "textarea"}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: { marginBottom: 16 },
  label: { fontWeight: "bold", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
  },
});
