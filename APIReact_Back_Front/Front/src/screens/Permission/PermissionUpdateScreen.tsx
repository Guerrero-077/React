import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { PermissionService } from "../../api/services/permissionService";
import { IPermission } from "../../api/types/IPermission";
import GenericForm from "../../components/generic-form/GenericForm";
import { PermissionFields } from "../../constants/Form/permissionFormFields";
import { permissionParamsList } from "../../navigations/types";
import { showToast } from "../../components/util/toastHelper";
import FormActionButtons from "../../components/generic-buttons/FormActionButtons";

type UpdateRouteProp = RouteProp<permissionParamsList, "PermissionUpdate">;
type NavigationProp = NativeStackNavigationProp<permissionParamsList>;

const PermissionUpdateScreen = () => {
  const route = useRoute<UpdateRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  const [permission, setPermission] = useState<IPermission>({
    id: 0,
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  const handleChange = (field: keyof IPermission, value: string) => {
    setPermission((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const loadPermission = async () => {
      try {
        const data = await PermissionService.getById(id);
        setPermission(data);
      } catch (error) {
        console.error("Error loading permission:", error);
        showToast.error("Load failed", "The permission could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    loadPermission();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await PermissionService.update(permission.id, permission);
      showToast.success(
        "Permission updated",
        "The permission was updated successfully."
      );
      navigation.replace("PermissionList");
    } catch (error) {
      console.error("Error updating permission:", error);
      showToast.error(
        "Update failed",
        "There was a problem updating the permission."
      );
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Permission</Text>

      <GenericForm
        form={permission}
        fields={PermissionFields}
        onChange={handleChange}
      />

      <FormActionButtons
        onSubmit={handleUpdate}
        onCancel={handleCancel}
        submitLabel="Update"
        cancelLabel="Cancel"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PermissionUpdateScreen;
