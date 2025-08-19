import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { IPermission } from "../../api/types/IPermission";
import { permissionParamsList } from "../../navigations/types";
import GenericCard from "../../components/generic-card/GenericCard";
import FloatingActionButton from "../../components/generic-buttons/FloatingActionButton";
import Loader from "../../components/util/Loader";
import DeleteConfirmationDialog from "../../components/util/DeleteConfirmationDialog";
import { PermissionService } from "../../api/services/permissionService";

const PermissionListScreen = () => {
  const [permissions, setPermissions] = useState<IPermission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedPermission, setSelectedPermission] =
    useState<IPermission | null>(null);

  const isFocused = useIsFocused();
  const navigation =
    useNavigation<NativeStackNavigationProp<permissionParamsList>>();

  const loadPermissions = async () => {
    try {
      const data = await PermissionService.getAll();
      setPermissions(data);
    } catch (error) {
      console.error("Error loading permissions:", error);
      Alert.alert("Error", "Failed to load permissions.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadPermissions();
    }
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPermissions();
  }, []);

  const showDeleteDialog = (permission: IPermission) => {
    setSelectedPermission(permission);
    setDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setDialogVisible(false);
    setSelectedPermission(null);
  };

  const confirmDelete = async () => {
    if (selectedPermission) {
      try {
        await PermissionService.delete(selectedPermission.id);
        await loadPermissions();
      } catch (error) {
        console.error("Error deleting permission:", error);
        Alert.alert("Error", "Permission could not be deleted.");
      } finally {
        hideDeleteDialog();
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Permission List</Text>
      <FlatList
        data={permissions}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <GenericCard
            title={item.name}
            subtitle={item.description}
            onEdit={() =>
              navigation.navigate("PermissionUpdate", { id: item.id })
            }
            onDelete={() => showDeleteDialog(item)}
          />
        )}
      />
      <FloatingActionButton
        onPress={() => navigation.navigate("PermissionRegister")}
        iconName="add"
        backgroundColor="#4a90e2"
      />

      {/* Confirm delete dialog */}
      <DeleteConfirmationDialog
        visible={dialogVisible}
        title="Delete Permission?"
        description="Are you sure you want to delete"
        itemName={selectedPermission?.name}
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

export default PermissionListScreen;
