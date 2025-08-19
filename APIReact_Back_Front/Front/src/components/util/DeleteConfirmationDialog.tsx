import React from "react";
import { Dialog, Portal, Button } from "react-native-paper";
import { Text } from "react-native";

interface DeleteConfirmationDialogProps {
  visible: boolean;
  title?: string;
  description?: string;
  itemName?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  visible,
  title = "Delete item?",
  description = "Are you sure you want to delete",
  itemName = "this item",
  onCancel,
  onConfirm,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text>
            {description} "{itemName}"?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>Cancel</Button>
          <Button onPress={onConfirm}>Delete</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DeleteConfirmationDialog;
