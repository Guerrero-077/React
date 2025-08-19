import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import GenericForm from "../../components/generic-form/GenericForm";

import { IForm } from "../../api/types/IForm";
import { IModule } from "../../api/types/IModule";
import { formModuleParamsList } from "../../navigations/types";

import { formService } from "../../api/services/formService";
import { moduleService } from "../../api/services/moduleService";
import { formModuleService } from "../../api/services/formModuleService";

import FormActionButtons from "../../components/generic-buttons/FormActionButtons";
import { FieldDefinition } from "../../components/types/FieldDefinition";
import { showToast } from "../../components/util/toastHelper";
import { buildFormModuleFields } from "../../constants/Form/formModuleFields";
import { ICreateFormModule } from "../../api/types/IFormModule";

export default function FormModuleRegisterScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<formModuleParamsList>>();

  const [forms, setForms] = useState<IForm[]>([]);
  const [modules, setModules] = useState<IModule[]>([]);

  const [form, setForm] = useState<ICreateFormModule>({
    formId: 0,
    moduleId: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const [modulesData, formsData] = await Promise.all([
          formService.getAll(),
          moduleService.getAll(),
        ]);
        setForms(formsData);
        setModules(modulesData);
      } catch (err) {
        console.error("Error loading data", err);
        Alert.alert("Error", "No se pudieron cargar los datos");
      }
    })();
  }, []);

  // fields con options (memo para evitar recalcular en cada render)
  const fields = useMemo(
    () => buildFormModuleFields(modules, forms),
    [modules, forms]
  );

  // onChange genérico: convierte string → number para IDs
  const handleChange = (key: keyof ICreateFormModule, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: typeof value === "string" ? Number(value) : value,
    }));
  };

  const validateForm = (): boolean => {
    for (const field of fields as FieldDefinition<ICreateFormModule>[]) {
      const raw = form[field.key];
      const value = typeof raw === "number" ? raw : Number(raw);
      if (field.required && (!value || Number.isNaN(value))) {
        showToast.validation(field.label);
        return false;
      }
    }
    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;
    try {
      await formModuleService.create(form);
      showToast.success("Create", "The Form Module was created.");
      navigation.goBack();
    } catch (error) {
      console.error("Error creating permission:", error);
      showToast.error(
        "Error",
        "No was possible to create the Form Module."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Module</Text>

      <GenericForm form={form} fields={fields} onChange={handleChange} />

      <FormActionButtons
        onSubmit={handleCreate}
        onCancel={() => navigation.goBack()}
        submitLabel="Save"
        cancelLabel="Cancel"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "700",
  },
});
