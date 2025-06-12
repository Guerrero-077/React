import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

export default function App() {
  const onPress = () => {
    alert("Hola mundo2");
  };

  return (
    <View style={styles.container}>
      <Button title="Saludar" onPress={() => alert("Hola mundo")} />

      <TouchableHighlight
        onPress={onPress}
        underlayColor="#014996ad"
        style={styles.button}
      >
        <View>
          <Text>Hola crack</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#00b3ff",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});
