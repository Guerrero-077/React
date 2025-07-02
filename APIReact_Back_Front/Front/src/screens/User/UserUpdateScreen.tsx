import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { userService } from "../../api/services/userService";
import { IUser } from "../../api/types/IUser";
import Loader from "../../components/Loader";
import { UserParamsList } from "../../navigations/types";
import GenericForm from "../../components/GenericForm";
import { userFields } from "../../constants/Form/userFormFields";

type UpdateRouteProp = RouteProp<UserParamsList, "UserUpdate">;
type NavigationProp = NativeStackNavigationProp<UserParamsList>;

const UserUpdateScreen = () => {
  const route = useRoute<UpdateRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  const [form, setForm] = useState<IUser>({
    id: 0,
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);

  const handleChange = (field: keyof IUser, value: string) => {
    setForm({ ...form, [field]: value });
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await userService.getById(id); // ✅ tu servicio debe tener esto
        setForm(data);
      } catch (error) {
        console.error("Error al cargar user:", error);
        Alert.alert("Error", "No se pudo cargar el user");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await userService.update(form); // envías el objeto entero
      Alert.alert("Éxito", "user actualizado correctamente", [
        { text: "OK", onPress: () => navigation.navigate("UserList") },
      ]);
    } catch (error) {
      console.error("Error al actualizar user:", error);
      Alert.alert("Error", "No se pudo actualizar el user");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update User</Text>
      <GenericForm form={form} fields={userFields} onChange={handleChange} />

      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, textAlign: "center", marginBottom: 20 },
});

export default UserUpdateScreen;
