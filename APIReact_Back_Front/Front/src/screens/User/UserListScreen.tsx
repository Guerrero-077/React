// src/screens/UserListScreen.tsx

import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-native-paper";

import { userService } from "../../api/services/userService";
import { UserDTO } from "../../api/types/IUser";
import DeleteConfirmationDialog from "../../components/util/DeleteConfirmationDialog";
import FloatingActionButton from "../../components/generic-buttons/FloatingActionButton";
import GenericCard from "../../components/generic-card/GenericCard";
import Loader from "../../components/util/Loader";
import { UserParamsList } from "../../navigations/types";

export default function UserListScreen() {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDTO | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();
  const navigation = useNavigation<NativeStackNavigationProp<UserParamsList>>();

  const loadUsers = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadUsers();
    }
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadUsers();
  }, []);

  const showDeleteDialog = (user: UserDTO) => {
    setSelectedUser(user);
    setDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setDialogVisible(false);
    setSelectedUser(null);
  };

  const confirmDelete = async () => {
    if (selectedUser) {
      try {
        await userService.delete(selectedUser.id);
        loadUsers();
      } catch (error) {
        console.error("Error al eliminar:", error);
      } finally {
        hideDeleteDialog();
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>List Users</Text>

        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <GenericCard
              title={item.name}
              subtitle={item.email}
              imageUrl={require("../../../assets/img/user.png")}
              onEdit={() => navigation.navigate("UserUpdate", { id: item.id })}
              onDelete={() => showDeleteDialog(item)}
            />
          )}
        />

        <FloatingActionButton
          onPress={() => navigation.navigate("UserRegister")}
          iconName="add"
          backgroundColor="#4a90e2"
        />
      </View>

      {/* Modal de confirmación */}
      <DeleteConfirmationDialog
        visible={dialogVisible}
        title="Delete user?"
        description="Are you sure you want to delete"
        itemName={selectedUser?.name}
        onCancel={hideDeleteDialog}
        onConfirm={confirmDelete}
      />
    </Provider>
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
