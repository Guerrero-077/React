import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { rolService } from "../../api/services/rolService";
import { IRol } from "../../api/types/IRol";
import GenericForm from "../../components/generic-form/GenericForm";
import { rolFields } from "../../constants/Form/rolFormFields";
import { RolParamsList } from "../../navigations/types";
import { showToast } from "../../components/util/toastHelper";
import FormActionButtons from "../../components/generic-buttons/FormActionButtons";

type UpdateRouteProp = RouteProp<RolParamsList, "RolUpdate">;
type NavigationProp = NativeStackNavigationProp<RolParamsList>;

const RolUpdateScreen = () => {
  const route = useRoute<UpdateRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  const [rol, setRol] = useState<IRol>({
    id: 0,
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  const handleChange = (field: keyof IRol, value: string) => {
    setRol((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const loadRol = async () => {
      try {
        const data = await rolService.getById(id);
        setRol(data);
      } catch (error) {
        console.error("Error loading rol:", error);
        showToast.error("Load failed", "The role could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    loadRol();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await rolService.update(rol.id, rol);
      showToast.success(
        "Rol updated",
        "The rol has been updated successfully."
      );
      navigation.replace("RolList");
    } catch (error) {
      console.error("Error updating rol:", error);
      showToast.error("Update failed", "The role could not be updated.");
    }
  };

  const handleCancel = () => {
    navigation.goBack();
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
      <Text style={styles.title}>Edit Rol</Text>

      <GenericForm form={rol} fields={rolFields} onChange={handleChange} />

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
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, textAlign: "center", marginBottom: 20 },
});

export default RolUpdateScreen;
