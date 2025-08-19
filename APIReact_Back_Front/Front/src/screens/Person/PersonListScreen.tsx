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

import { IPerson } from "../../api/types/IPerson";
import { personParamsList } from "../../navigations/types";

import FloatingActionButton from "../../components/generic-buttons/FloatingActionButton";
import GenericCard from "../../components/generic-card/GenericCard";
import DeleteConfirmationDialog from "../../components/util/DeleteConfirmationDialog";
import Loader from "../../components/util/Loader";
import { personService } from "../../api/services/personService";

export default function PersonListScreen() {
  const [persons, setPersons] = useState<IPerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedRol, setSelectedRol] = useState<IPerson | null>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<personParamsList>>();
  const isFocused = useIsFocused();

  const loadRoles = async () => {
    try {
      const data = await personService.getAll();
      setPersons(data);
    } catch (error) {
      console.error("Error loading persons:", error);
      Alert.alert("Error", "Failed to load persons.");
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

  const showDeleteDialog = (Person: IPerson) => {
    setSelectedRol(Person);
    setDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setDialogVisible(false);
    setSelectedRol(null);
  };

  const confirmDelete = async () => {
    if (!selectedRol) return;

    try {
      await personService.delete(selectedRol.id);
      loadRoles();
    } catch (error) {
      console.error("Error deleting Person:", error);
      Alert.alert("Delete Failed", "There was an error deleting the Person.");
    } finally {
      hideDeleteDialog();
    }
  };

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Person List</Text>
      <FlatList
        data={persons}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <GenericCard
            title={`${item.firstName} ${item.lastName}`}
            subtitle={`${item.phoneNumber} - ${item.address}`}
            onEdit={() => navigation.navigate("PersonUpdate", { id: item.id })}
            onDelete={() => showDeleteDialog(item)}
          />
        )}
      />

      <FloatingActionButton
        onPress={() => navigation.navigate("PersonRegister")}
        iconName="add"
        backgroundColor="#4a90e2"
      />

      <DeleteConfirmationDialog
        visible={dialogVisible}
        title="Delete Person?"
        description="Are you sure you want to delete"
        itemName={selectedRol?.firstName}
        onCancel={hideDeleteDialog}
        onConfirm={confirmDelete}
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
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 16,
    textAlign: "center",
  },
});
