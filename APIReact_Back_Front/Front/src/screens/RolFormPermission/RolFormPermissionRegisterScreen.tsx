import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import GenericForm from "../../components/generic-form/GenericForm";

import { RolParamsList } from "../../navigations/types";
import { ICreateRolFormPermission } from "../../api/types/IRolFormPermission";
import { IRol } from "../../api/types/IRol";
import { IForm } from "../../api/types/IForm";
import { IPermission } from "../../api/types/IPermission";

import { rolService } from "../../api/services/rolService";
import { formService } from "../../api/services/formService";
import { rolFormPermissionService } from "../../api/services/rolFormPermissionService";
import { PermissionService } from "../../api/services/permissionService";

import { FieldDefinition } from "../../components/types/FieldDefinition";
import { showToast } from "../../components/util/toastHelper";
import { buildRolFormPermissionFields } from "../../constants/Form/IRolFormPermissionFields";
import FormActionButtons from "../../components/generic-buttons/FormActionButtons";

export default function RolFormPermissionRegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RolParamsList>>();

  const [roles, setRoles] = useState<IRol[]>([]);
  const [forms, setForms] = useState<IForm[]>([]);
  const [permissions, setPermissions] = useState<IPermission[]>([]);

  const [form, setForm] = useState<ICreateRolFormPermission>({
    rolId: 0,
    formId: 0,
    permissionId: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const [rolesData, formsData, permissionsData] = await Promise.all([
          rolService.getAll(),
          formService.getAll(),
          PermissionService.getAll(),
        ]);
        setRoles(rolesData);
        setForms(formsData);
        setPermissions(permissionsData);
      } catch (err) {
        console.error("Error loading data", err);
        Alert.alert("Error", "No se pudieron cargar los datos");
      }
    })();
  }, []);

  // fields con options (memo para evitar recalcular en cada render)
  const fields = useMemo(
    () => buildRolFormPermissionFields(roles, forms, permissions),
    [roles, forms, permissions]
  );

  // onChange genérico: convierte string → number para IDs
  const handleChange = (key: keyof ICreateRolFormPermission, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: typeof value === "string" ? Number(value) : value,
    }));
  };

  const validateForm = (): boolean => {
    for (const field of fields as FieldDefinition<ICreateRolFormPermission>[]) {
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
      await rolFormPermissionService.create(form);
      showToast.success("Create", "The RolFormPermisson was created.");
      navigation.goBack();
    } catch (error) {
      console.error("Error creating permission:", error);
      showToast.error("Error", "No was possible to create the RolFormPermission.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asignar Permiso a Rol</Text>

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
