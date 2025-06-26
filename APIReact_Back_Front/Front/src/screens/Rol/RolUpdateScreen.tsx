import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BooktackParamsList } from "../../navigations/types";
import { IRol } from "../../api/types/IRol";
import { rolService } from "../../api/services/rolService";
import BookForm from "../../components/RolForm";

type UpdateRouteProp = RouteProp<BooktackParamsList, "RolUpdate">;
type NavigationProp = NativeStackNavigationProp<BooktackParamsList>;

const BookUpdateScreen = () => {
  const route = useRoute<UpdateRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  const [form, setForm] = useState<IRol>({
    id: 0,
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  const handleChange = (field: keyof IRol, value: string) => {
    setForm({ ...form, [field]: value });
  };

  useEffect(() => {
    const loadRol = async () => {
      try {
        const data = await rolService.getById(id); // ✅ tu servicio debe tener esto
        setForm(data);
      } catch (error) {
        console.error("Error al cargar rol:", error);
        Alert.alert("Error", "No se pudo cargar el rol");
      } finally {
        setLoading(false);
      }
    };

    loadRol();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await rolService.update(form); // envías el objeto entero
      Alert.alert("Éxito", "Rol actualizado correctamente", [
        { text: "OK", onPress: () => navigation.navigate("RolList") },
      ]);
    } catch (error) {
      console.error("Error al actualizar rol:", error);
      Alert.alert("Error", "No se pudo actualizar el rol");
    }
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
      <Text style={styles.title}>Editar Rol</Text>
      <BookForm form={form} handleChange={handleChange} />
      <Button title="Actualizar" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, textAlign: "center", marginBottom: 20 },
});

export default BookUpdateScreen;
