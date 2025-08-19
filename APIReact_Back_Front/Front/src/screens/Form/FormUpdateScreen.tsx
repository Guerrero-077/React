import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { formService } from "../../api/services/formService";
import { IForm } from "../../api/types/IForm";
import GenericForm from "../../components/generic-form/GenericForm";
import { FormFields } from "../../constants/Form/FormFormFields";
import { formParamsList } from "../../navigations/types";
import { showToast } from "../../components/util/toastHelper";
import FormActionButtons from "../../components/generic-buttons/FormActionButtons";

type UpdateRouteProp = RouteProp<formParamsList, "FormUpdate">;
type NavigationProp = NativeStackNavigationProp<formParamsList>;

const FormUpdateScreen = () => {
  const route = useRoute<UpdateRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  const [form, setForm] = useState<IForm>({
    id: 0,
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  const handleChange = (field: keyof IForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const loadForm = async () => {
      try {
        const data = await formService.getById(id);
        setForm(data);
      } catch (error) {
        console.error("Error loading form:", error);
        showToast.error("Load error", "Failed to load the form data.");
      } finally {
        setLoading(false);
      }
    };

    loadForm();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await formService.update(form.id, form);
      showToast.success("Form updated", "The form was updated successfully.");
      navigation.navigate("FormList");
    } catch (error) {
      console.error("Error updating form:", error);
      showToast.error(
        "Update failed",
        "There was a problem updating the form."
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
      <GenericForm form={form} fields={FormFields} onChange={handleChange} />
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

export default FormUpdateScreen;
