// src/navigations/Navigation.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/login/LoginScreen";
import MainDrawer from "./MainDrawer";
import { useAuth, AuthProvider } from "../contexts/AuthContext";
import RegisterScreen from "../screens/Register/RegisterScreen";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? (

        <MainDrawer />
        
      ) : 
      (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default function Navigation() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
