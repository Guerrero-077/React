import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { IForm } from "../../api/types/IForm";
import { formService } from "../../api/services/formService";
import { formParamsList } from "../../navigations/types";

import GenericCard from "../../components/generic-card/GenericCard";
import FloatingActionButton from "../../components/generic-buttons/FloatingActionButton";
import DeleteConfirmationDialog from "../../components/util/DeleteConfirmationDialog";
import Loader from "../../components/util/Loader";
import { showToast } from "../../components/util/toastHelper";

const FormListScreen = () => {
  const [forms, setForms] = useState<IForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedForm, setSelectedForm] = useState<IForm | null>(null);

  const isFocused = useIsFocused();
  const navigation = useNavigation<NativeStackNavigationProp<formParamsList>>();

  const loadForms = async () => {
    try {
      const data = await formService.getAll();
      setForms(data);
    } catch (error) {
      console.error("Error loading forms:", error);
      showToast.error("Load failed", "Failed to load forms.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadForms();
    }
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadForms();
  }, []);

  const showDeleteDialog = (form: IForm) => {
    setSelectedForm(form);
    setDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setDialogVisible(false);
    setSelectedForm(null);
  };

  const confirmDelete = async () => {
    if (!selectedForm) return;

    try {
      await formService.delete(selectedForm.id);
      showToast.success("Deleted", "Form deleted successfully.");
      loadForms();
    } catch (error) {
      console.error("Error deleting form:", error);
      showToast.error("Delete failed", "Could not delete the form.");
    } finally {
      hideDeleteDialog();
    }
  };

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form List</Text>

      <FlatList
        data={forms}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <GenericCard
            title={item.name}
            subtitle={item.description}
            onEdit={() => navigation.navigate("FormUpdate", { id: item.id })}
            onDelete={() => showDeleteDialog(item)}
          />
        )}
      />

      <FloatingActionButton
        onPress={() => navigation.navigate("FormRegister")}
        iconName="add"
        backgroundColor="#4a90e2"
      />

      <DeleteConfirmationDialog
        visible={dialogVisible}
        title="Delete Form?"
        description="Are you sure you want to delete this form?"
        itemName={selectedForm?.name}
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

export default FormListScreen;
