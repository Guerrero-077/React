import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import RolListScreen from "../screens/Rol/RolListScreen";
import RolRegisterScreen from "../screens/Rol/RolRegisterScreen";
import RolUpdateScreen from "../screens/Rol/RolUpdateScreen";
import UserListScreen from "../screens/User/UserListScreen";
import UserRegisterScreen from "../screens/User/UserRegisterScreen";
import UserUpdateScreen from "../screens/User/UserUpdateScreen";
import { RolParamsList, UserParamsList } from "./types";
import { useAuth } from "../contexts/AuthContext";

const Drawer = createDrawerNavigator();
const RolStack = createNativeStackNavigator<RolParamsList>();
const UserStack = createNativeStackNavigator<UserParamsList>();

function RolStackNavigator() {
  return (
    <RolStack.Navigator screenOptions={{ headerShown: false }}>
      <RolStack.Screen name="RolList" component={RolListScreen} />
      <RolStack.Screen name="RolRegister" component={RolRegisterScreen} />
      <RolStack.Screen name="RolUpdate" component={RolUpdateScreen} />
    </RolStack.Navigator>
  );
}

function UserStackNavigator() {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="UserList" component={UserListScreen} />
      <UserStack.Screen name="UserRegister" component={UserRegisterScreen} />
      <UserStack.Screen name="UserUpdate" component={UserUpdateScreen} />
    </UserStack.Navigator>
  );
}

export default function MainDrawer() {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Sign out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign out", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <Drawer.Navigator
      initialRouteName="UserStack"
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#1E90FF",
        drawerInactiveTintColor: "#555",
        drawerStyle: { backgroundColor: "#f0f8ff" },
        headerStyle: { backgroundColor: "#1E90FF" },
        headerTintColor: "#fff",
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
            <MaterialIcons name="logout" size={24} color="#fff" />
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="UserStack"
        component={UserStackNavigator}
        options={{
          drawerLabel: "List Users",
          drawerIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="RolStack"
        component={RolStackNavigator}
        options={{
          drawerLabel: "List Roles",
          drawerIcon: ({ color, size }) => (
            <AntDesign name="book" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
