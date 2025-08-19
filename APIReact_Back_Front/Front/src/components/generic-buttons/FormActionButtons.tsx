import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { COLORS } from "../../constants/colors";

interface Props {
  onSubmit: () => void;
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}

const FormActionButtons: React.FC<Props> = ({
  onSubmit,
  onCancel,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
}) => {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={onSubmit}
        buttonColor={COLORS.primaryBlue}
        textColor="white"
      >
        {submitLabel}
      </Button>
      <View style={{ height: 10 }} />
      <Button
        mode="outlined"
        onPress={onCancel}
        textColor={COLORS.primaryBlue}
        style={{
          borderColor: COLORS.primaryBlue,
          borderWidth: 1.5,
        }}
      >
        {cancelLabel}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default FormActionButtons;
