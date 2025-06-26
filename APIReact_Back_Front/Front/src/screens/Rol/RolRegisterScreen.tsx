import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import GenericForm from "../../components/GenericForm";
import { IRol } from "../../api/types/IRol";
import { rolService } from "../../api/services/rolService";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { rolFields } from "../../constants/forms/rolFormFields"; // 👈
import { BooktackParamsList } from "../../navigations/types";

const BookRegisterScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<BooktackParamsList>>();

  const [form, setForm] = useState<IRol>({
    id: 0,
    name: "",
    description: "",
  });

  const handleChange = (key: keyof IRol, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const registerBook = async () => {
    try {
      await rolService.create(form);
      Alert.alert("Rol creado", "El rol fue registrado correctamente", [
        {
          text: "OK",
          onPress: () => navigation.navigate("RolList"),
        },
      ]);
    } catch (error) {
      console.error("Error al crear rol:", error);
      Alert.alert("Error", "No se pudo registrar el rol");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Rol</Text>
      <GenericForm form={form} fields={rolFields} onChange={handleChange} />
      <Button title="Guardar" onPress={registerBook} />
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

export default BookRegisterScreen;
