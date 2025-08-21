import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserParamsList } from "../../navigations/types";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import { CreateUserDTO } from "../../api/types/IUser";
import { userService } from "../../api/services/userService";
import { buildUserFields } from "../../constants/Form/userFormFields";
import { View, Button, Text, StyleSheet, Alert } from "react-native";
import GenericForm from "../../components/generic-form/GenericForm";
import { FieldDefinition } from "../../components/types/FieldDefinition";
import { showToast } from "../../components/util/toastHelper";
import FormActionButtons from "../../components/generic-buttons/FormActionButtons";
import { IPerson } from "../../api/types/IPerson";
import { personService } from "../../api/services/personService";

const UserRegisterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<UserParamsList>>();

  const [persons, setPersons] = useState<IPerson[]>([]);

  const [form, setForm] = useState<CreateUserDTO>({
    name: "",
    email: "",
    password: "",
    personId: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const personsData = await personService.getAll();
        setPersons(personsData);
      } catch (err) {
        console.error("Error loading data", err);
        Alert.alert("Error", "Could not load data");
      }
    })();
  }, []);

  const fields = useMemo(() => buildUserFields(persons), [persons]);

  const handleChange = (key: keyof CreateUserDTO, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: typeof value === "string" && key !== 'personId' ? value : Number(value),
    }));
  };

  const validateForm = (): boolean => {
    for (const field of fields as FieldDefinition<CreateUserDTO>[]) {
      const value = form[field.key];

      if (field.required && !value) {
        showToast.validation(field.label);
        return false;
      }

      if (
        field.type === "email" &&
        value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))
      ) {
        showToast.error(
          "Invalid email",
          "You must enter a valid email address."
        );
        return false;
      }

      if (field.key === "password") {
        const password = String(value);
        if (password.length < 8) {
          showToast.error(
            "Very short password",
            "The password must be at least 8 characters."
          );
          return false;
        }
        if (!/[A-Z]/.test(password)) {
          showToast.error(
            "Invalid password",
            "The password must contain at least one capital letter."
          );
          return false;
        }
        if (!/[a-z]/.test(password)) {
          showToast.error(
            "Invalid password",
            "The password must contain at least one lowercase letter."
          );
          return false;
        }
        if (!/\d/.test(password)) {
          showToast.error(
            "Invalid password",
            "The password must contain at least one number."
          );
          return false;
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
          showToast.error(
            "Invalid password",
            "The password must contain at least one special character."
          );
          return false;
        }
      }
    }

    return true;
  };

  const registerUser = async () => {
    if (!validateForm()) return;

    try {
      await userService.create(form);

      showToast.success("User created", "The user was registered successfully");
      navigation.replace("UserList");
    } catch (error) {
      console.error("Error creating user:", error);
      showToast.error(
        "Error registering",
        "Please check the data and try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register User</Text>
      <GenericForm form={form} fields={fields} onChange={handleChange} />

      <FormActionButtons
        onSubmit={registerUser}
        onCancel={() => navigation.goBack()}
        submitLabel="Register"
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

export default UserRegisterScreen;
