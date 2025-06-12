import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function FormScreen() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleShowAlert = () => {
    Alert.alert("Datos ingresados", `nombre: ${input1}\Apellido: ${input2}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Text>Form Screen</Text>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mi Menú</Text>
      </View>

      {/* Formulario */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Ingrese Su nombre"
          value={input1}
          onChangeText={setInput1}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese Su Apellido"
          value={input2}
          onChangeText={setInput2}
        />
      </View>

      {/* Botón / Acción */}
      <View style={styles.actions}>
        <Button title="Mostrar Datos" onPress={handleShowAlert} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Pressable: {
    backgroundColor: "#d0f5ea",
    borderRadius: 5,
    paddingLeft: 5,
    height: 35,
    width: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  menu: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  actions: {
    alignItems: "center",
  },
});
