import { useCallback, useEffect, useState } from "react";
import { IModule } from "../../api/types/IModule";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { moduleParamsList } from "../../navigations/types";
import { moduleService } from "../../api/services/moduleService";
import { showToast } from "../../components/util/toastHelper";
import Loader from "../../components/util/Loader";
import { View, FlatList, RefreshControl, Text, StyleSheet } from "react-native";
import DeleteConfirmationDialog from "../../components/util/DeleteConfirmationDialog";
import FloatingActionButton from "../../components/generic-buttons/FloatingActionButton";
import GenericCard from "../../components/generic-card/GenericCard";

const ModuleListScreen = () => {
  const [modules, setModules] = useState<IModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState<IModule | null>(null);

  const isFocused = useIsFocused();
  const navigation =
    useNavigation<NativeStackNavigationProp<moduleParamsList>>();

  const loadModules = async () => {
    try {
      const data = await moduleService.getAll();
      setModules(data);
    } catch (error) {
      console.error("Error loading modules:", error);
      showToast.error("Load failed", "Failed to load modules.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadModules();
    }
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadModules();
  }, []);

  const showDeleteDialog = (module: IModule) => {
    setSelectedModule(module);
    setDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setDialogVisible(false);
    setSelectedModule(null);
  };

  const confirmDelete = async () => {
    if (!selectedModule) return;
    try {
      await moduleService.delete(selectedModule.id);
      showToast.success("Deleted", "Module deleted successfully.");
      loadModules();
    } catch (error) {
      console.error("Error deleting module:", error);
      showToast.error("Delete failed", "Could not delete the module.");
    } finally {
      hideDeleteDialog();
    }
  };

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Module List</Text>

      <FlatList
        data={modules}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <GenericCard
            title={item.name}
            subtitle={item.description}
            onEdit={() => navigation.navigate("ModuleUpdate", { id: item.id })}
            onDelete={() => showDeleteDialog(item)}
          />
        )}
      />

      <FloatingActionButton
        onPress={() => navigation.navigate("ModuleRegister")}
        iconName="add"
        backgroundColor="#4a90e2"
      />

      <DeleteConfirmationDialog
        visible={dialogVisible}
        title="Delete Module?"
        description="Are you sure you want to delete this module?"
        itemName={selectedModule?.name}
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
export default ModuleListScreen;
