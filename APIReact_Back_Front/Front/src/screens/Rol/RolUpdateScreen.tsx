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
import { RolParamsList } from "../../navigations/types";
import { IRol } from "../../api/types/IRol";
import { rolService } from "../../api/services/rolService";
import BookForm from "../../components/RolForm";
import GenericForm from "../../components/GenericForm";
import { rolFields } from "../../constants/Form/rolFormFields";

type UpdateRouteProp = RouteProp<RolParamsList, "RolUpdate">;
type NavigationProp = NativeStackNavigationProp<RolParamsList>;

const RolUpdateScreen = () => {
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
      <GenericForm form={form} fields={rolFields} onChange={handleChange} />
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, textAlign: "center", marginBottom: 20 },
});

export default RolUpdateScreen;
