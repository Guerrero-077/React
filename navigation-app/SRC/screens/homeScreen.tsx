import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { HomeStackParmsList } from "../navigations/types";

type HomeNavigationProps = NativeStackNavigationProp<
  HomeStackParmsList,
  "Home"
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProps>();
  return (
    <View>
      <Text>Home Screen</Text>
      <Pressable
        onPress={() => navigation.navigate("Details", { id: "2" })}
        style={styles.Pressable}
      >
        <Text>Detail</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Form")}
        style={styles.Pressable}
      >
        <Text>Form</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Calculadora")}
        style={styles.Pressable}
      >
        <Text>Calculadora</Text>
      </Pressable>
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
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
