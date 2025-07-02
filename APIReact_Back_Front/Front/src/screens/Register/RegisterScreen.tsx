import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import GenericForm from "../../components/GenericForm";
import { authService } from "../../api/services/loginService";
import { IRegister } from "../../api/types/IRegister";
import { registerFields } from "../../constants/Form/registerFields";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [form, setForm] = useState<IRegister>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (key: keyof IRegister, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const validateForm = (): string | null => {
    const { name, email, password, confirmPassword } = form;

    if (!name || name.trim().length < 2) {
      return "Name must be at least 2 characters.";
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address.";
    }

    if (!password || password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return null;
  };

  const handleRegister = async () => {
    const errorMessage = validateForm();

    if (errorMessage) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: errorMessage,
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    try {
      await authService.register(form);

      Toast.show({
        type: "success",
        text1: "Registration successful",
        text2: "You can now log in with your credentials.",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });

      navigation.navigate("Login" as never);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Registration failed",
        text2: "The user could not be registered. Try again later.",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  const goToLogin = () => {
    navigation.navigate("Login" as never);
  };

  return (
    <ImageBackground
      source={require("../../../assets/img/fondo.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <GenericForm
          form={form}
          fields={registerFields}
          onChange={handleChange}
        />

        <Button title="Registrarse" onPress={handleRegister} />

        <TouchableOpacity onPress={goToLogin} style={styles.linkContainer}>
          <Text style={styles.linkText}>
            Already have an account?{" "}
            <Text style={styles.linkTextBold}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <Toast />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  container: {
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.65)",
    margin: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  linkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: "#555",
  },
  linkTextBold: {
    color: "#1E90FF",
    fontWeight: "bold",
  },
});
