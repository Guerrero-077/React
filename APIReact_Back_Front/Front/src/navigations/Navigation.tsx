import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AntDesign } from "@expo/vector-icons";

// Pantallas
import BookListScreen from "../screens/Rol/RolList";
import BookRegisterScreen from "../screens/Rol/RolRegisterScreen";
import BookUpdateScreen from "../screens/Rol/RolUpdateScreen";
import { BooktackParamsList } from "./types";

// Stack interno
const BookStack = createNativeStackNavigator<BooktackParamsList>();

function BookStackNavigator() {
  return (
    <BookStack.Navigator
      initialRouteName="RolList"
      screenOptions={{ headerShown: false }} // Esto oculta el header duplicado
    >
      <BookStack.Screen name="RolList" component={BookListScreen} />
      <BookStack.Screen name="RolRegister" component={BookRegisterScreen} />

      <BookStack.Screen name="RolUpdate" component={BookUpdateScreen} />
    </BookStack.Navigator>
  );
}

// Drawer Navigator
const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="RolList"
      screenOptions={{
        drawerActiveTintColor: "purple",
        headerShown: true,
      }}
    >
      <Drawer.Screen
        name="RolList"
        component={BookStackNavigator}
        options={{
          drawerLabel: "Listado de Roles",
          drawerIcon: ({ color, size }) => (
            <AntDesign name="book" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="RolUpdate"
        component={BookRegisterScreen}
        options={{
          drawerLabel: "Registrar Rol",
          drawerIcon: ({ color, size }) => (
            <AntDesign name="pluscircleo" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// Contenedor principal
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <MainDrawer />
    </NavigationContainer>
  );
}
