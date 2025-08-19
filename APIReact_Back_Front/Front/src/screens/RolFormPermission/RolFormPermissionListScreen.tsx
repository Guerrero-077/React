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
import { IRolFormPermission } from "../../api/types/IRolFormPermission";
import { rolFormPermissionParamsList } from "../../navigations/types";

import { rolFormPermissionService } from "../../api/services/rolFormPermissionService";
import DeleteConfirmationDialog from "../../components/util/DeleteConfirmationDialog";
import FloatingActionButton from "../../components/generic-buttons/FloatingActionButton";
import GenericCard from "../../components/generic-card/GenericCard";
import Loader from "../../components/util/Loader";

const RolFormPermissionListScreen = () => {
  const [rolFormPermission, setRolFormPermission] = useState<
    IRolFormPermission[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedRolFormPermission, setSelectedRolFormPermission] =
    useState<IRolFormPermission | null>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<rolFormPermissionParamsList>>();
  const isFocused = useIsFocused();

  const loadRolFormPermissions = async () => {
    try {
      const data = await rolFormPermissionService.getAllDynamic();
      setRolFormPermission(data);
    } catch (error) {
      console.error("Error loading rolFormPermissions:", error);
      Alert.alert("Error", "Failed to load rolFormPermissions.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadRolFormPermissions();
    }
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadRolFormPermissions();
  }, []);

  const showDeleteDialog = (rolFormPermission: IRolFormPermission) => {
    setSelectedRolFormPermission(rolFormPermission);
    setDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setDialogVisible(false);
    setSelectedRolFormPermission(null);
  };

  const confirmDelete = async () => {
    if (!selectedRolFormPermission) return;

    try {
      await rolService.delete(selectedRolFormPermission.id);
      loadRolFormPermissions();
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
        data={rolFormPermission}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <GenericCard
            title={`Rol ${item.rolName}`}
            subtitle={`Form: ${item.formName ?? ""} Permission: ${
              item.permissionName ?? ""
            }`.trim()}
            onEdit={() =>
              navigation.navigate("RolFormPermissionUpdate", {
                id: item.id,
              })
            }
            onDelete={() => showDeleteDialog(item)}
          />
        )}
      />

      <FloatingActionButton
        onPress={() => navigation.navigate("RolFormPermissionRegister")}
        iconName="add"
        backgroundColor="#4a90e2"
      />

      <DeleteConfirmationDialog
        visible={dialogVisible}
        title="Delete RolFormPermssion?"
        description="Are you sure you want to delete"
        itemName={selectedRolFormPermission?.rolName}
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

export default RolFormPermissionListScreen;
