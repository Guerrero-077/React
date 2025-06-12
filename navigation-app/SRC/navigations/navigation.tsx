// Imports the screens

import  HomeScreen from "../screens/homeScreen";
import StacksScreen from "../screens/stacksScreen";
import SettingScreen  from "../screens/settingScreen";

import DetailsScreen from '../screens/detailsScreen'
import FormScreen from "../screens/formScreen";

import CalculadoraScreen from "../screens/CaluladoreaScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

// Iconos
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Crear objetos del button menu

const Tab = createBottomTabNavigator();

// Crear la función para cargar el objeto tap
function MyMenu() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={MyStack}
        options={{
          headerShown: false,
          headerLeft: () => <Ionicons name="home" size={24} color="black" />,

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-variant-outline"
              size={24}
              color="black"
            />
          ),
          tabBarBadge: 10, // Iconos para notificaciones
        }}
      />

      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerLeft: () => (
            <AntDesign name="setting" size={24} color="black" />
          ),

          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const HomeStackNavigator = createNativeStackNavigator();
function MyStack() {
  return (
    <HomeStackNavigator.Navigator initialRouteName="Home">
      <HomeStackNavigator.Screen name="Home" component={HomeScreen} />
      <HomeStackNavigator.Screen name="Stack" component={StacksScreen} />
      <HomeStackNavigator.Screen name="Details" component={DetailsScreen} />
      <HomeStackNavigator.Screen name="Form" component={FormScreen} />
      <HomeStackNavigator.Screen name="Calculadora" component={CalculadoraScreen} />
    </HomeStackNavigator.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyMenu />
    </NavigationContainer>
  );
}
