import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Alert,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { IRol } from "../../api/types/IRol";
import { rolService } from "../../api/services/rolService";
import { RolParamsList } from "../../navigations/types";

import GenericCard from "../../components/generic-card/GenericCard";
import FloatingActionButton from "../../components/generic-buttons/FloatingActionButton";
import DeleteConfirmationDialog from "../../components/util/DeleteConfirmationDialog";
import Loader from "../../components/util/Loader";

const RolListScreen = () => {
  const [roles, setRoles] = useState<IRol[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedRol, setSelectedRol] = useState<IRol | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<RolParamsList>>();
  const isFocused = useIsFocused();

  const loadRoles = async () => {
    try {
      const data = await rolService.getAll();
      setRoles(data);
    } catch (error) {
      console.error("Error loading roles:", error);
      Alert.alert("Error", "Failed to load roles.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadRoles();
    }
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadRoles();
  }, []);

  const showDeleteDialog = (rol: IRol) => {
    setSelectedRol(rol);
    setDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setDialogVisible(false);
    setSelectedRol(null);
  };

  const confirmDelete = async () => {
    if (!selectedRol) return;

    try {
      await rolService.delete(selectedRol.id);
      loadRoles();
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
      <Text style={styles.title}>Rol List</Text>
      <FlatList
        data={roles}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <GenericCard
            title={item.name}
            subtitle={item.description}
            onEdit={() => navigation.navigate("RolUpdate", { id: item.id })}
            onDelete={() => showDeleteDialog(item)}
          />
        )}
      />

      <FloatingActionButton
        onPress={() => navigation.navigate("RolRegister")}
        iconName="add"
        backgroundColor="#4a90e2"
      />

      <DeleteConfirmationDialog
        visible={dialogVisible}
        title="Delete Rol?"
        description="Are you sure you want to delete"
        itemName={selectedRol?.name}
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

export default RolListScreen;
