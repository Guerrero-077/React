import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { userService } from "../../api/services/userService";
import { UpdateUserDTO } from "../../api/types/IUser";
import GenericForm from "../../components/generic-form/GenericForm";
import Loader from "../../components/util/Loader";
import { buildUpdateUserFields } from "../../constants/Form/userFormFields";
import { UserParamsList } from "../../navigations/types";
import { showToast } from "../../components/util/toastHelper";
import FormActionButtons from "../../components/generic-buttons/FormActionButtons";
import { IPerson } from "../../api/types/IPerson";
import { personService } from "../../api/services/personService";
import { FieldDefinition } from "../../components/types/FieldDefinition";

type UpdateRouteProp = RouteProp<UserParamsList, "UserUpdate">;
type NavigationProp = NativeStackNavigationProp<UserParamsList>;

const UserUpdateScreen = () => {
  const route = useRoute<UpdateRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  const [form, setForm] = useState<UpdateUserDTO>({
    id: id,
    name: "",
    email: "",
    personId: 0,
  });

  const [persons, setPersons] = useState<IPerson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [userData, personsData] = await Promise.all([
          userService.getById(id),
          personService.getAll(),
        ]);
        setForm(userData);
        setPersons(personsData);
      } catch (err) {
        console.error("Error loading data", err);
        Alert.alert("Error", "Could not load data");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const fields = useMemo(() => buildUpdateUserFields(persons), [persons]);

  const handleChange = (key: keyof UpdateUserDTO, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: typeof value === "string" && key !== 'personId' ? value : Number(value),
    }));
  };

  const validateForm = (): boolean => {
    for (const field of fields as FieldDefinition<UpdateUserDTO>[]) {
      const value = form[field.key];

      if (field.required && !value) {
        showToast.validation(field.label);
        return false;
      }

      if (
        field.type === "email" &&
        value &&
        !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(String(value))
      ) {
        showToast.error(
          "Invalid email",
          "You must enter a valid email address."
        );
        return false;
      }
    }

    return true;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      await userService.update(form.id, form);
      showToast.success("User updated", "The user was updated successfully.");
      navigation.navigate("UserList");
    } catch (error) {
      console.error("Error updating user:", error);
      showToast.error("Update failed", "The user could not be updated.");
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update User</Text>

      <GenericForm<UpdateUserDTO> form={form} fields={fields} onChange={handleChange} />

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
  buttonGroup: { marginTop: 20 },
});

export default UserUpdateScreen;



