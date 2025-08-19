import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { IRol } from "../../api/types/IRol";
import { rolService } from "../../api/services/rolService";
import { RolParamsList } from "../../navigations/types";
import { rolFields } from "../../constants/Form/rolFormFields";
import { FieldDefinition } from "../../components/types/FieldDefinition";

import GenericForm from "../../components/generic-form/GenericForm";
import { showToast } from "../../components/util/toastHelper";
import FormActionButtons from "../../components/generic-buttons/FormActionButtons";

const RolRegisterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RolParamsList>>();

  const [rol, setRol] = useState<IRol>({
    id: 0,
    name: "",
    description: "",
  });

  const handleChange = (key: keyof IRol, value: string) => {
    setRol((prev) => ({ ...prev, [key]: value }));
  };

  const validateRol = (): boolean => {
    for (const field of rolFields as FieldDefinition<IRol>[]) {
      const value = String(rol[field.key] ?? "").trim();
      if (field.required && !value) {
        showToast.validation(field.label);
        return false;
      }
    }
    return true;
  };

  const handleCreate = async () => {
    if (!validateRol()) return;

    try {
      await rolService.create(rol);
      showToast.success(
        "Rol created",
        "The rol has been registered successfully."
      );
      navigation.replace("RolList");
    } catch (error) {
      console.error("Error creating rol:", error);
      showToast.error(
        "Creation failed",
        "Please check the input data and try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Rol</Text>
      <GenericForm form={rol} fields={rolFields} onChange={handleChange} />

      <FormActionButtons
        onSubmit={handleCreate}
        onCancel={() => navigation.goBack()}
        submitLabel="Create"
        cancelLabel="Cancel"
      />
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
