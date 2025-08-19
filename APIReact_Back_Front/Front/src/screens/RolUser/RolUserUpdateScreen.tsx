import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";

import GenericForm from "../../components/generic-form/GenericForm";

import { IRol } from "../../api/types/IRol";
import { rolUserParamsList } from "../../navigations/types";

import { rolFormPermissionService } from "../../api/services/rolFormPermissionService";
import { rolService } from "../../api/services/rolService";

import { rolUserService } from "../../api/services/rolUserService";
import { userService } from "../../api/services/userService";
import { UpdateRolUserDTO } from "../../api/types/IRolUser";
import { UserDTO } from "../../api/types/IUser";
import FormActionButtons from "../../components/generic-buttons/FormActionButtons";
import { FieldDefinition } from "../../components/types/FieldDefinition";
import { showToast } from "../../components/util/toastHelper";
import { RolUserFields } from "../../constants/Form/rolUserFormFields";

type UpdateRouteProp = RouteProp<rolUserParamsList, "RolUserUpdate">;
type NavigationProp = NativeStackNavigationProp<rolUserParamsList>;

const RolUserUpdateScreen = () => {
  const route = useRoute<UpdateRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  const [roles, setRoles] = useState<IRol[]>([]);
  const [users, setUsers] = useState<UserDTO[]>([]);

  const [form, setForm] = useState<UpdateRolUserDTO>({
    id: id,
    rolId: 0,
    userId: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [rolesData, usersData, rolUserData] = await Promise.all([
          rolService.getAll(),
          userService.getAll(),
          rolUserService.getById(id),
        ]);
        setRoles(rolesData);
        setUsers(usersData);
        setForm({
          id: (rolUserData as any).id,
          rolId: (rolUserData as any).rolId,
          userId: (rolUserData as any).userId,
        });
      } catch (err) {
        console.error("Error loading data", err);
        Alert.alert("Error", "No se pudieron cargar los datos");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const fields = useMemo(() => RolUserFields(roles, users), [roles, users]);

  const handleChange = (key: keyof UpdateRolUserDTO, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: typeof value === "string" ? Number(value) : value,
    }));
  };

  const validateForm = (): boolean => {
    for (const field of fields as FieldDefinition<UpdateRolUserDTO>[]) {
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
      await rolUserService.update(id, form);
      showToast.success("Actualizado", "El Rol User update sucefully.");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating rol User:", error);
      showToast.error("Error", "No was possible to update the Rol User.");
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
      <Text style={styles.title}>Editar Permiso de Rol</Text>

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

export default RolUserUpdateScreen;
