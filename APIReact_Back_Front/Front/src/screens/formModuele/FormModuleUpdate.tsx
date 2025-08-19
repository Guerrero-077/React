import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";

import GenericForm from "../../components/generic-form/GenericForm";

import { IForm } from "../../api/types/IForm";
import { IModule } from "../../api/types/IModule";
import { formModuleParamsList } from "../../navigations/types";

import { formModuleService } from "../../api/services/formModuleService";
import { formService } from "../../api/services/formService";
import { rolService } from "../../api/services/rolService";

import FormActionButtons from "../../components/generic-buttons/FormActionButtons";
import { FieldDefinition } from "../../components/types/FieldDefinition";
import { showToast } from "../../components/util/toastHelper";
import { buildFormModuleFields } from "../../constants/Form/formModuleFields";
import { IUpdateFormModule } from "../../api/types/IFormModule";
import { moduleService } from "../../api/services/moduleService";

type UpdateRouteProp = RouteProp<formModuleParamsList, "FormModuleUpdate">;
type NavigationProp = NativeStackNavigationProp<formModuleParamsList>;

export default function FormModuleUpdateScreen() {
  const route = useRoute<UpdateRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  const [modules, setModules] = useState<IModule[]>([]);
  const [forms, setForms] = useState<IForm[]>([]);

  const [form, setForm] = useState<IUpdateFormModule>({
    id: id,
    formId: 0,
    moduleId: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [moduleData, formsData, formModuleData] = await Promise.all([
          formService.getAll(),
          moduleService.getAll(),
          formModuleService.getById(id),
        ]);
        setModules(moduleData);
        setForms(formsData);
        setForm({
          id: (formModuleData as any).id,
          formId: (formModuleData as any).formid,
          moduleId: (formModuleData as any).moduleid,
        });
      } catch (err) {
        console.error("Error loading data", err);
        Alert.alert("Error", "No se pudieron cargar los datos");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const fields = useMemo(
    () => buildFormModuleFields(modules, forms),
    [modules, forms]
  );

  const handleChange = (key: keyof IUpdateFormModule, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: typeof value === "string" ? Number(value) : value,
    }));
  };

  const validateForm = (): boolean => {
    for (const field of fields as FieldDefinition<IUpdateFormModule>[]) {
      const raw = form[field.key];
      const value = typeof raw === "number" ? raw : Number(raw);
      if (field.required && (!value || Number.isNaN(value))) {
        showToast.validation(field.label);
        return false;
      }
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;
    try {
      await formModuleService.update(id, form);
      showToast.success(
        "Actualizado",
        "El Form Module fue actualizado correctamente."
      );
      navigation.goBack();
    } catch (error) {
      console.error("Error updating permission:", error);
      showToast.error("Error", "No se pudo actualizar el Form Module.");
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="purple"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Form Module</Text>

      <GenericForm form={form} fields={fields} onChange={handleChange} />

      <FormActionButtons
        onSubmit={handleUpdate}
        onCancel={() => navigation.goBack()}
        submitLabel="Update"
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
