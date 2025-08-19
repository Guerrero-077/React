import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { formService } from "../../api/services/formService";
import { IForm } from "../../api/types/IForm";
import GenericForm from "../../components/generic-form/GenericForm";
import { FieldDefinition } from "../../components/types/FieldDefinition";
import { FormFields } from "../../constants/Form/FormFormFields";
import { formParamsList } from "../../navigations/types";
import { showToast } from "../../components/util/toastHelper";
import FormActionButtons from "../../components/generic-buttons/FormActionButtons";

const FormRegisterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<formParamsList>>();

  const [form, setForm] = useState<IForm>({
    id: 0,
    name: "",
    description: "",
  });

  const handleChange = (key: keyof IForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = (): boolean => {
    for (const field of FormFields as FieldDefinition<IForm>[]) {
      const value = String(form[field.key] ?? "").trim();
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
      await formService.create(form);
      showToast.success(
        "Form created",
        "The form has been successfully created."
      );
      navigation.navigate("FormList");
    } catch (error) {
      console.error("Error creating form:", error);
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
      <Text style={styles.title}>Create Form</Text>
      <GenericForm form={form} fields={FormFields} onChange={handleChange} />
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

export default FormRegisterScreen;
