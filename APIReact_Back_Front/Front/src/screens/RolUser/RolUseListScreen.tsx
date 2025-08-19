import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { rolService } from "../../api/services/rolService";
import { IRolUser } from "../../api/types/IRolUser";
import DeleteConfirmationDialog from "../../components/util/DeleteConfirmationDialog";
import FloatingActionButton from "../../components/generic-buttons/FloatingActionButton";
import GenericCard from "../../components/generic-card/GenericCard";
import Loader from "../../components/util/Loader";
import { rolUserService } from "../../api/services/rolUserService";
import { rolUserParamsList } from "../../navigations/types";

const RolUserListScreen = () => {
  const [rolUser, setRolUser] = useState<IRolUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedRolUser, setSelectedRolUser] = useState<IRolUser | null>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<rolUserParamsList>>();
  const isFocused = useIsFocused();

  const loadRolUsers = async () => {
    try {
      const data = await rolUserService.getAllDynamic();
      setRolUser(data);
    } catch (error) {
      console.error("Error loading rolUsers:", error);
      Alert.alert("Error", "Failed to load rolUsers.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadRolUsers();
    }
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadRolUsers();
  }, []);

  const showDeleteDialog = (rolUser: IRolUser) => {
    setSelectedRolUser(rolUser);
    setDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setDialogVisible(false);
    setSelectedRolUser(null);
  };

  const confirmDelete = async () => {
    if (!selectedRolUser) return;

    try {
      await rolUserService.delete(selectedRolUser.id);
      loadRolUsers();
    } catch (error) {
      console.error("Error deleting rol:", error);
      Alert.alert("Delete Failed", "There was an error deleting the rol.");
    } finally {
      hideDeleteDialog();
    }
  };

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rol Form Permission List</Text>
      <FlatList
        data={rolUser}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <GenericCard
            title={`User: ${item.userName}`}
            subtitle={`Rol: ${item.rolName}`}
            onEdit={() => navigation.navigate("RolUserUpdate", { id: item.id })}
            onDelete={() => showDeleteDialog(item)}
          />
        )}
      />

      <FloatingActionButton
        onPress={() => navigation.navigate("RolUserRegister")}
        iconName="add"
        backgroundColor="#4a90e2"
      />

      <DeleteConfirmationDialog
        visible={dialogVisible}
        title="Delete Rol User?"
        description="Are you sure you want to delete"
        itemName={selectedRolUser?.userName}
        onCancel={hideDeleteDialog}
        onConfirm={confirmDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default RolUserListScreen;
