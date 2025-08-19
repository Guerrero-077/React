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

import GenericForm from "../../components/generic-form/GenericForm";
import { loginFields } from "../../constants/Form/loginFormFields";
import { ILogin } from "../../api/types/ILogin";
import { authService } from "../../api/services/loginService";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginScreen() {
  const navigation = useNavigation();
  const { login } = useAuth();

  const [form, setForm] = useState<ILogin>({
    email: "",
    password: "",
  });

  const handleChange = (key: keyof ILogin, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await authService.login(form);

      Toast.show({
        type: "success",
        text1: "Welcome!",
        text2: "You have logged in successfully.",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });

      login(); // Autenticación y redirección al Drawer
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: "Incorrect credentials. Please try again.",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  const goToRegister = () => {
    navigation.navigate("Register" as never);
  };

  return (
    <ImageBackground
      source={require("../../../assets/img/fondo.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <GenericForm form={form} fields={loginFields} onChange={handleChange} />

        <Button title="Sign In" onPress={handleLogin} />

        <TouchableOpacity onPress={goToRegister} style={styles.linkContainer}>
          <Text style={styles.linkText}>
            Don’t have an account?{" "}
            <Text style={styles.linkTextBold}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Toast debe ir aquí también por si este screen es aislado */}
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
