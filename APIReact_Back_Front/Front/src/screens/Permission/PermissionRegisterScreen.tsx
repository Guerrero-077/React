import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { IPermission } from "../../api/types/IPermission";
import { permissionParamsList } from "../../navigations/types";
import { PermissionService } from "../../api/services/permissionService";
import { PermissionFields } from "../../constants/Form/permissionFormFields";
import GenericForm from "../../components/generic-form/GenericForm";
import { FieldDefinition } from "../../components/types/FieldDefinition";
import { showToast } from "../../components/util/toastHelper";
import FormActionButtons from "../../components/generic-buttons/FormActionButtons";

const PermissionRegisterScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<permissionParamsList>>();

  const [permission, setPermission] = useState<IPermission>({
    id: 0,
    name: "",
    description: "",
  });

  const handleChange = (key: keyof IPermission, value: string) => {
    setPermission((prev) => ({ ...prev, [key]: value }));
  };

  const validatePermission = (): boolean => {
    for (const field of PermissionFields as FieldDefinition<IPermission>[]) {
      const value = String(permission[field.key] ?? "").trim();

      if (field.required && !value) {
        showToast.validation(field.label);
        return false;
      }
    }
    return true;
  };

  const handleCreate = async () => {
    if (!validatePermission()) return;

    try {
      await PermissionService.create(permission);

      showToast.success(
        "Permission created",
        "The permission has been successfully created."
      );
      navigation.navigate("PermissionList");
    } catch (error) {
      console.error("Error creating permission:", error);
      showToast.error(
        "Creation failed",
        "Please check the input data and try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Permission</Text>

      <GenericForm
        form={permission}
        fields={PermissionFields}
        onChange={handleChange}
      />

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
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default PermissionRegisterScreen;
