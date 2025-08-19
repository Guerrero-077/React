import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { personService } from "../../api/services/personService";
import { IPerson } from "../../api/types/IPerson";
import FormActionButtons from "../../components/generic-buttons/FormActionButtons";
import GenericForm from "../../components/generic-form/GenericForm";
import { showToast } from "../../components/util/toastHelper";
import { personFields } from "../../constants/Form/PersonFormFields";
import { personParamsList } from "../../navigations/types";

type UpdateRouteProp = RouteProp<personParamsList, "PersonUpdate">;
type NavigationProp = NativeStackNavigationProp<personParamsList>;

export const PersonUpdateScreen = () => {
  const route = useRoute<UpdateRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  const [persons, setPersons] = useState<IPerson>({
    id: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  const handleChange = (field: keyof IPerson, value: string) => {
    setPersons((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const loadRol = async () => {
      try {
        const data = await personService.getById(id);
        setPersons(data);
      } catch (error) {
        console.error("Error loading persons:", error);
        showToast.error("Load failed", "The role could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    loadRol();
  }, [id]);

  const validateRol = (): boolean => {
    if (persons.phoneNumber.length < 10) {
      showToast.error(
        "Validation failed",
        "Phone number must be at least 10 digits."
      );
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validateRol()) return;

    try {
      await personService.update(persons.id, persons);
      showToast.success(
        "persons updated",
        "The persons has been updated successfully."
      );
      navigation.replace("PersonList");
    } catch (error) {
      console.error("Error updating persons:", error);
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
      <Text style={styles.title}>Edit persons</Text>

      <GenericForm
        form={persons}
        fields={personFields}
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
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, textAlign: "center", marginBottom: 20 },
});
