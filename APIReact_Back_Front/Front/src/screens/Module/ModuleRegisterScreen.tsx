import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { moduleService } from "../../api/services/moduleService";
import { IModule } from "../../api/types/IModule";
import FormActionButtons from "../../components/generic-buttons/FormActionButtons";
import GenericForm from "../../components/generic-form/GenericForm";
import { FieldDefinition } from "../../components/types/FieldDefinition";
import { moduleFields } from "../../constants/Form/moduleFormFields";
import { moduleParamsList } from "../../navigations/types";
import { showToast } from "../../components/util/toastHelper";

const ModuleRegisterScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<moduleParamsList>>();

  const [module, setModule] = useState<IModule>({
    id: 0,
    name: "",
    description: "",
  });

  const handleChange = (key: keyof IModule, value: string) => {
    setModule((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = (): boolean => {
    for (const field of moduleFields as FieldDefinition<IModule>[]) {
      const value = String(module[field.key] ?? "").trim();
      if (field.required && !value) {
        showToast.validation(field.label);
        return false;
      }
    }
    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    try {
      await moduleService.create(module);
      showToast.success(
        "Module created",
        "The Module has been successfully created."
      );
      navigation.navigate("ModuleList");
    } catch (error) {
      console.error("Error creating Module:", error);
      showToast.error(
        "Creation failed",
        "Please check the input data and try again."
      );
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Module</Text>
      <GenericForm
        form={module}
        fields={moduleFields}
        onChange={handleChange}
      />
      <FormActionButtons
        onSubmit={handleCreate}
        onCancel={handleCancel}
        submitLabel="Save"
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
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default ModuleRegisterScreen;
