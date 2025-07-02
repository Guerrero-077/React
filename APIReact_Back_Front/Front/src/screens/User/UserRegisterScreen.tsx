import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserParamsList } from "../../navigations/types";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { IUser } from "../../api/types/IUser";
import { userService } from "../../api/services/userService";
import Toast from "react-native-toast-message";
import { userFields } from "../../constants/Form/userFormFields";
import { View, Button, Text, StyleSheet } from "react-native";
import GenericForm from "../../components/GenericForm";
import { FieldDefinition } from "../../components/types/FieldDefinition";

const UserRegisterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<UserParamsList>>();

  const [form, setForm] = useState<IUser>({
    id: 0,
    name: "",
    email: "",
    password: "",
  });

  // Detectar cambios
  const handleChange = (key: keyof IUser, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Validación básica del formulario
  const validateForm = (): boolean => {
    for (const field of userFields as FieldDefinition<IUser>[]) {
      const value = String(form[field.key] ?? "").trim();

      // Validar campos requeridos
      if (field.required && !value) {
        Toast.show({
          type: "error",
          text1: "Required field",
          text2: `The "${field.label}" field is required.`,
        });
        return false;
      }

      // Validar formato de email
      if (
        field.type === "email" &&
        value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        Toast.show({
          type: "error",
          text1: "Invalid email",
          text2: "You must enter a valid email address.",
        });
        return false;
      }

      // Validar longitud mínima de contraseña
      if (field.key === "password" && value.length < 6) {
        Toast.show({
          type: "error",
          text1: "Very short password",
          text2: "The password must be at least 6 characters.",
        });
        return false;
      }
    }

    return true;
  };

  const registerUser = async () => {
    if (!validateForm()) return;

    try {
      await userService.create(form);

      Toast.show({
        type: "success",
        text1: "User created",
        text2: "The user was registered successfully",
      });

      navigation.navigate("UserList");
    } catch (error) {
      console.error("Error creating user:", error);

      Toast.show({
        type: "error",
        text1: "Error registering",
        text2: "Please check the data and try again.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register User</Text>

      <GenericForm form={form} fields={userFields} onChange={handleChange} />
      <Button title="Guardar" onPress={registerUser} />
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
