import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { IRol } from "../../api/types/IRol";
import { rolService } from "../../api/services/rolService";
import GenericCard from "../../components/GenericCard";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BooktackParamsList } from "../../navigations/types";

export default function RolListScreen() {
  const [roles, setRoles] = useState<IRol[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isFocused = useIsFocused(); // ✅ detecta si la pantalla está activa

  const navigation =
    useNavigation<NativeStackNavigationProp<BooktackParamsList>>();

  const loadRoles = async () => {
    try {
      const data = await rolService.getAll();
      setRoles(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true); // opcional: mostrar loader si vuelves
      loadRoles();
    }
  }, [isFocused]); // ✅ recarga cada vez que la pantalla se vuelve visible

  const handleEdit = (rol: IRol) => {
    console.log("Editar rol:", rol);
  };

  const handleDelete = (rol: IRol) => {
    Alert.alert("¿Eliminar rol?", `¿Eliminar "${rol.name}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await rolService.delete(rol.id);
            loadRoles();
          } catch (error) {
            console.error("Error al eliminar:", error);
          }
        },
      },
    ]);
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
      <Text style={styles.title}>Lista de Roles</Text>
      <FlatList
        data={roles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GenericCard
            title={item.name}
            subtitle={item.description}
            onEdit={() => navigation.navigate("RolUpdate", { id: item.id })}
            onDelete={() => handleDelete(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
