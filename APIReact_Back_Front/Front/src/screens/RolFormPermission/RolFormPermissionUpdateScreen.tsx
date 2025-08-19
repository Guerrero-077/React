import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import GenericForm from "../../components/generic-form/GenericForm";

import { rolFormPermissionParamsList } from "../../navigations/types";
import {
  IUpdateRolFormPermission,
  IRolFormPermission,
} from "../../api/types/IRolFormPermission";
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

type UpdateRouteProp = RouteProp<
  rolFormPermissionParamsList,
  "RolFormPermissionUpdate"
>;
type NavigationProp = NativeStackNavigationProp<rolFormPermissionParamsList>;

const RolFormPermissionUpdateScreen = () => {
  const route = useRoute<UpdateRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  const [roles, setRoles] = useState<IRol[]>([]);
  const [forms, setForms] = useState<IForm[]>([]);
  const [permissions, setPermissions] = useState<IPermission[]>([]);

  const [form, setForm] = useState<IUpdateRolFormPermission>({
    id: id,
    rolId: 0,
    formId: 0,
    permissionId: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [rolesData, formsData, permissionsData, rolFormPermissionData] =
          await Promise.all([
            rolService.getAll(),
            formService.getAll(),
            PermissionService.getAll(),
            rolFormPermissionService.getById(id),
          ]);
        setRoles(rolesData);
        setForms(formsData);
        setPermissions(permissionsData);
        setForm({
          id: (rolFormPermissionData as any).id,
          rolId: (rolFormPermissionData as any).rolid,
          formId: (rolFormPermissionData as any).formid,
          permissionId: (rolFormPermissionData as any).permissionid,
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
    () => buildRolFormPermissionFields(roles, forms, permissions),
    [roles, forms, permissions]
  );

  const handleChange = (key: keyof IUpdateRolFormPermission, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: typeof value === "string" ? Number(value) : value,
    }));
  };

  const validateForm = (): boolean => {
    for (const field of fields as FieldDefinition<IUpdateRolFormPermission>[]) {
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
      await rolFormPermissionService.update(id, form);
      showToast.success(
        "Actualizado",
        "El permiso fue actualizado correctamente."
      );
      navigation.goBack();
    } catch (error) {
      console.error("Error updating permission:", error);
      showToast.error("Error", "No se pudo actualizar el permiso.");
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
      <Text style={styles.title}>Update Rol Form Permission</Text>

      <GenericForm form={form} fields={fields} onChange={handleChange} />

      <FormActionButtons
        onSubmit={handleUpdate}
        onCancel={() => navigation.goBack()}
        submitLabel="Update"
        cancelLabel="Cancel"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "700",
  },
});

export default RolFormPermissionUpdateScreen;
