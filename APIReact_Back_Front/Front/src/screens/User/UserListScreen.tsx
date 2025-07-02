import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { userService } from "../../api/services/userService";
import { IUser } from "../../api/types/IUser";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  View,
  Text,
} from "react-native";
import FloatingActionButton from "../../components/FloatingActionButton";
import GenericCard from "../../components/GenericCard";
import { UserParamsList } from "../../navigations/types";
import Loader from "../../components/Loader";
export default function UserListScreen() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isFocused = useIsFocused(); // ✅ detecta si la pantalla está activa

  const navigation = useNavigation<NativeStackNavigationProp<UserParamsList>>();

  const loadRoles = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadRoles();
    }
  }, [isFocused]);
  const handleEdit = (user: IUser) => {
    console.log("Editar User:", user);
  };

  const handleDelete = (user: IUser) => {
    Alert.alert("¿Eliminar rol?", `¿Eliminar "${user.name}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await userService.delete(user.id);
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
      <Text style={styles.title}>List Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GenericCard
            title={item.name}
            subtitle={item.email}
            imageUrl={require("../../../assets/img/user.png")}
            onEdit={() => navigation.navigate("UserUpdate", { id: item.id })}
            onDelete={() => handleDelete(item)}
          />
        )}
      />

      {/* Boton flotante */}

      <FloatingActionButton
        onPress={() => navigation.navigate("UserRegister")}
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
