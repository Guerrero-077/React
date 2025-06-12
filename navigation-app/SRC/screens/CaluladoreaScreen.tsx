import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function CalculadoraScreen() {
  const [input, setInput] = useState("");

  const handlePress = (value: string) => {
    switch (value) {
      case "=":
        try {
          const evalResult = eval(input); // ⚠️ Solo para pruebas personales
          setInput(evalResult.toString());
        } catch {
          setInput("Error");
        }
        break;
      case "C":
        setInput("");
        break;
      case "Borrar":
        setInput((prev) => prev.slice(0, -1));
        break;
      default:
        setInput((prev) => prev + value);
        break;
    }
  };

  const renderButton = (value: string, index: number) => (
    <TouchableOpacity
      key={`${value}-${index}`}
      style={styles.button}
      onPress={() => handlePress(value)}
    >
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );

  const rows = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
    ["C", "Borrar"],
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Display único */}
      <View style={styles.display}>
        <Text style={styles.displayText}>{input || "0"}</Text>
      </View>

      {/* Botones */}
      {rows.map((row, rowIndex) => (
        <View style={styles.row} key={`row-${rowIndex}`}>
          {row.map((btnValue, btnIndex) =>
            renderButton(btnValue, btnIndex + rowIndex * 10)
          )}
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    justifyContent: "flex-end",
    padding: 20,
  },
  display: {
    minHeight: 100,
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 30,
  },
  displayText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#fff",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
