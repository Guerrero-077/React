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
import FloatingActionButton from "../../components/FloatingActionButton";
import { RolParamsList } from "../../navigations/types";
import Loader from "../../components/Loader";

export default function RolListScreen() {
  const [roles, setRoles] = useState<IRol[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isFocused = useIsFocused(); // ✅ detecta si la pantalla está activa

  const navigation = useNavigation<NativeStackNavigationProp<RolParamsList>>();

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
    return <Loader />;
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

      {/* Boton flotante */}

      <FloatingActionButton
        onPress={() => navigation.navigate("RolRegister")}
        iconName="add"
        backgroundColor="#4a90e2"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 16,
    textAlign: "center",
  },
});
