import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { personService } from "../../api/services/personService";
import { IPerson } from "../../api/types/IPerson";
import { FieldDefinition } from "../../components/types/FieldDefinition";
import { rolFields } from "../../constants/Form/rolFormFields";
import { personParamsList } from "../../navigations/types";

import FormActionButtons from "../../components/generic-buttons/FormActionButtons";
import GenericForm from "../../components/generic-form/GenericForm";
import { showToast } from "../../components/util/toastHelper";
import { personFields } from "../../constants/Form/PersonFormFields";

export const PersonRegisterScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<personParamsList>>();

  const [persons, serPersons] = useState<IPerson>({
    id: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  });

  const handleChange = (key: keyof IPerson, value: string) => {
    serPersons((prev) => ({ ...prev, [key]: value }));
  };

  const validateRol = (): boolean => {
    for (const field of personFields as FieldDefinition<IPerson>[]) {
      const value = String(persons[field.key] ?? "").trim();
      if (field.required && !value) {
        showToast.validation(field.label);
        return false;
      }
    }
    return true;
  };

  const handleCreate = async () => {
    if (!validateRol()) return;

    try {
      await personService.create(persons);
      showToast.success(
        "persons created",
        "The persons has been registered successfully."
      );
      navigation.replace("PersonList");
    } catch (error) {
      console.error("Error creating persons:", error);
      showToast.error(
        "Creation failed",
        "Please check the input data and try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create persons</Text>
      <GenericForm
        form={persons}
        fields={personFields}
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
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
  },
});
