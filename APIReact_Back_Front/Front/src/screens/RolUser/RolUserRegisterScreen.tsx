import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useState } from "react";
import { IRol } from "../../api/types/IRol";
import { CreateRolUserDTO } from "../../api/types/IRolUser";
import { UserDTO } from "../../api/types/IUser";
import { rolUserParamsList } from "../../navigations/types";
import { rolService } from "../../api/services/rolService";
import { userService } from "../../api/services/userService";
import { Alert } from "react-native";
import { RolUserFields } from "../../constants/Form/rolUserFormFields";
import { FieldDefinition } from "../../components/types/FieldDefinition";
import { showToast } from "../../components/util/toastHelper";
import { rolUserService } from "../../api/services/rolUserService";
import { View, Text, StyleSheet } from "react-native";
import GenericForm from "../../components/generic-form/GenericForm";
import FormActionButtons from "../../components/generic-buttons/FormActionButtons";

export default function RolUserScreen() {
  const navegation =
    useNavigation<NativeStackNavigationProp<rolUserParamsList>>();

  const [roles, setRoles] = useState<IRol[]>([]);
  const [users, setUsers] = useState<UserDTO[]>([]);

  const [form, setForm] = useState<CreateRolUserDTO>({
    userId: 0,
    rolId: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const [rolesData, userData] = await Promise.all([
          rolService.getAll(),
          userService.getAll(),
        ]);
        setRoles(rolesData);
        setUsers(userData);
      } catch (err) {
        console.error("Error loading data", err);
        Alert.alert("Error", "No se pudieron cargar los datos");
      }
    })();
  }, []);

  const fields = useMemo(() => RolUserFields(roles, users), [roles, users]);

  const handleChange = (key: keyof CreateRolUserDTO, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: typeof value === "string" ? Number(value) : value,
    }));
  };

  const validateForm = (): boolean => {
    for (const field of fields as FieldDefinition<CreateRolUserDTO>[]) {
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
      await rolUserService.create(form);
      showToast.success("Create", "RolUser created successfully.");
      navegation.goBack();
    } catch (error) {
      console.error("Error creating RolUser:", error);
      showToast.error("Error", "No was possible to create the RolUser.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asignate Rol a Usuario</Text>
      <GenericForm form={form} fields={fields} onChange={handleChange} />

      <FormActionButtons
        onSubmit={handleCreate}
        onCancel={() => navegation.goBack()}
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
