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
import { formModuleParamsList } from "../../navigations/types";

import { formModuleService } from "../../api/services/formModuleService";
import DeleteConfirmationDialog from "../../components/util/DeleteConfirmationDialog";
import FloatingActionButton from "../../components/generic-buttons/FloatingActionButton";
import GenericCard from "../../components/generic-card/GenericCard";
import Loader from "../../components/util/Loader";
import { IFormModule } from "../../api/types/IFormModule";

const FormModuleListScreen = () => {
  const [formModule, setFormModule] = useState<IFormModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedRolFormPermission, setSelectedRolFormPermission] =
    useState<IFormModule | null>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<formModuleParamsList>>();
  const isFocused = useIsFocused();

  const loadRolFormPermissions = async () => {
    try {
      const data = await formModuleService.getAllDynamic();
      setFormModule(data);
    } catch (error) {
      console.error("Error loading Form Module:", error);
      Alert.alert("Error", "Failed to load Form Module.");
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

  const showDeleteDialog = (formModule: IFormModule) => {
    setSelectedRolFormPermission(formModule);
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
        data={formModule}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <GenericCard
            title={`form: ${item.formName}`}
            subtitle={`module: ${item.moduleName ?? ""}`}
            onEdit={() =>
              navigation.navigate("FormModuleUpdate", {
                id: item.id,
              })
            }
            onDelete={() => showDeleteDialog(item)}
          />
        )}
      />

      <FloatingActionButton
        onPress={() => navigation.navigate("FormModuleRegister")}
        iconName="add"
        backgroundColor="#4a90e2"
      />

      <DeleteConfirmationDialog
        visible={dialogVisible}
        title="Delete Form Module?"
        description="Are you sure you want to delete"
        itemName={selectedRolFormPermission?.formName}
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

export default FormModuleListScreen;
