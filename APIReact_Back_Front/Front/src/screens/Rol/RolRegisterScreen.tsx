import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import GenericForm from "../../components/GenericForm";
import { IRol } from "../../api/types/IRol";
import { rolService } from "../../api/services/rolService";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { rolFields } from "../../constants/Form/rolFormFields";
import Toast from "react-native-toast-message";
import { RolParamsList } from "../../navigations/types";
import { FieldDefinition } from "../../components/types/FieldDefinition";

const RolRegisterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RolParamsList>>();

  const [form, setForm] = useState<IRol>({
    id: 0,
    name: "",
    description: "",
  });

  const handleChange = (key: keyof IRol, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = (): boolean => {
    for (const field of rolFields as FieldDefinition<IRol>[]) {
      const value = String(form[field.key] ?? "").trim();

      if (field.required && !value) {
        Toast.show({
          type: "error",
          text1: "Required field",
          text2: `The "${field.label}" field is required.`,
        });
        return false;
      }
    }

    return true;
  };

  const registerBook = async () => {
    if (!validateForm()) return;

    try {
      await rolService.create(form);

      Toast.show({
        type: "success",
        text1: "Created role",
        text2: "The role was registered successfully",
      });

      navigation.navigate("RolList");
    } catch (error) {
      console.error("Error creating role:", error);

      Toast.show({
        type: "error",
        text1: "Error registering",
        text2: "Please check the data and try again.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Rol</Text>
      <GenericForm form={form} fields={rolFields} onChange={handleChange} />
      <Button title="Save" onPress={registerBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default RolRegisterScreen;
