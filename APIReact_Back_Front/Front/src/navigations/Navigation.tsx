import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/login/LoginScreen";
import RegisterScreen from "../screens/Register/RegisterScreen";
import MainDrawer from "./MainDrawer";
import { useAuth, AuthProvider } from "../contexts/AuthContext";
import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MainDrawer />
      ) : (
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
