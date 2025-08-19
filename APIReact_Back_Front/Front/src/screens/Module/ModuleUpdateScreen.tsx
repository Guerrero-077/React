import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { formService } from "../../api/services/formService";
import { moduleService } from "../../api/services/moduleService";
import { IModule } from "../../api/types/IModule";
import GenericForm from "../../components/generic-form/GenericForm";
import { FormFields } from "../../constants/Form/FormFormFields";
import { moduleParamsList } from "../../navigations/types";
import { showToast } from "../../components/util/toastHelper";
import FormActionButtons from "../../components/generic-buttons/FormActionButtons";

type UpdateRouteProp = RouteProp<moduleParamsList, "ModuleUpdate">;
type NavigationProp = NativeStackNavigationProp<moduleParamsList>;

const ModuleUpdateScreen = () => {
  const route = useRoute<UpdateRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  const [module, setModule] = useState<IModule>({
    id: 0,
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  const handleChange = (field: keyof IModule, value: string) => {
    setModule((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const loadModule = async () => {
      try {
        const data = await formService.getById(id);
        setModule(data);
      } catch (error) {
        console.error("Error loading form:", error);
        showToast.error("Load error", "Failed to load the form data.");
      } finally {
        setLoading(false);
      }
    };

    loadModule();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await moduleService.update(module.id, module);
      showToast.success(
        "Module updated",
        "The Module was updated successfully."
      );
      navigation.navigate("ModuleList");
    } catch (error) {
      console.error("Error updating Module:", error);
      showToast.error(
        "Update failed",
        "There was a problem updating the Module."
      );
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#4a90e2"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Form</Text>
      <GenericForm form={module} fields={FormFields} onChange={handleChange} />
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
  },
});

export default ModuleUpdateScreen;
