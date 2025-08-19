import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AntDesign,
  MaterialIcons,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import {
  Portal,
  Text,
  Dialog,
  Button,
  Provider as PaperProvider,
} from "react-native-paper";

import { useAuth } from "../contexts/AuthContext";

// 👇 Screens

// 👇 Tipos de navegación
import {
  formModuleParamsList,
  formParamsList,
  moduleParamsList,
  permissionParamsList,
  personParamsList,
  rolFormPermissionParamsList,
  RolParamsList,
  rolUserParamsList,
  UserParamsList,
} from "./types";
import ModuleListScreen from "../screens/Module/ModuleListScreen";
import ModuleUpdateScreen from "../screens/Module/ModuleUpdateScreen";
import ModuleRegisterScreen from "../screens/Module/ModuleRegisterScreen";
import RolFormPermissionRegisterScreen from "../screens/RolFormPermission/RolFormPermissionRegisterScreen";
import RolFormPermissionUpdateScreen from "../screens/RolFormPermission/RolFormPermissionUpdateScreen";
import RolFormPermissionListScreen from "../screens/RolFormPermission/RolFormPermissionListScreen";
import FormListScreen from "../screens/Form/FormListScreen";
import FormRegisterScreen from "../screens/Form/FormRegisterScreen";
import FormUpdateScreen from "../screens/Form/FormUpdateScreen";
import PermissionListScreen from "../screens/Permission/PermissionListScreen";
import PermissionRegisterScreen from "../screens/Permission/PermissionRegisterScreen";
import PermissionUpdateScreen from "../screens/Permission/PermissionUpdateScreen";
import RolListScreen from "../screens/Rol/RolListScreen";
import RolRegisterScreen from "../screens/Rol/RolRegisterScreen";
import RolUpdateScreen from "../screens/Rol/RolUpdateScreen";
import UserListScreen from "../screens/User/UserListScreen";
import UserRegisterScreen from "../screens/User/UserRegisterScreen";
import UserUpdateScreen from "../screens/User/UserUpdateScreen";
import RolUserListScreen from "../screens/RolUser/RolUseListScreen";
import RolUserScreen from "../screens/RolUser/RolUserRegisterScreen";
import RolUserUpdateScreen from "../screens/RolUser/RolUserUpdateScreen";
import FormModuleListScreen from "../screens/formModuele/FormModuleListScreen";
import FormModuleRegisterScreen from "../screens/formModuele/FormModuleRegister";
import FormModuleUpdateScreen from "../screens/formModuele/FormModuleUpdate";
import PersonListScreen from "../screens/Person/PersonListScreen";
import { PersonRegisterScreen } from "../screens/Person/PersonRegisterScreen";
import { PersonUpdateScreen } from "../screens/Person/PersonUpdateScreen";

// 🧱 Stacks por módulo
const Drawer = createDrawerNavigator();
const RolStack = createNativeStackNavigator<RolParamsList>();
const UserStack = createNativeStackNavigator<UserParamsList>();
const PermissionStack = createNativeStackNavigator<permissionParamsList>();
const FormStack = createNativeStackNavigator<formParamsList>();
const ModuleStack = createNativeStackNavigator<moduleParamsList>();
const RolFormPermissionStack =
  createNativeStackNavigator<rolFormPermissionParamsList>();
const RolUserStack = createNativeStackNavigator<rolUserParamsList>();
const FormModuleStack = createNativeStackNavigator<formModuleParamsList>();
const PersonStack = createNativeStackNavigator<personParamsList>();

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

function PermissionStackNavigator() {
  return (
    <PermissionStack.Navigator screenOptions={{ headerShown: false }}>
      <PermissionStack.Screen
        name="PermissionList"
        component={PermissionListScreen}
      />
      <PermissionStack.Screen
        name="PermissionRegister"
        component={PermissionRegisterScreen}
      />
      <PermissionStack.Screen
        name="PermissionUpdate"
        component={PermissionUpdateScreen}
      />
    </PermissionStack.Navigator>
  );
}

function FormStackNavigator() {
  return (
    <FormStack.Navigator screenOptions={{ headerShown: false }}>
      <FormStack.Screen name="FormList" component={FormListScreen} />
      <FormStack.Screen name="FormRegister" component={FormRegisterScreen} />
      <FormStack.Screen name="FormUpdate" component={FormUpdateScreen} />
    </FormStack.Navigator>
  );
}

function ModuleStackNavigator() {
  return (
    <ModuleStack.Navigator screenOptions={{ headerShown: false }}>
      <ModuleStack.Screen name="ModuleList" component={ModuleListScreen} />
      <ModuleStack.Screen
        name="ModuleRegister"
        component={ModuleRegisterScreen}
      />
      <ModuleStack.Screen name="ModuleUpdate" component={ModuleUpdateScreen} />
    </ModuleStack.Navigator>
  );
}
function RolFormPermissionStackNavigator() {
  return (
    <RolFormPermissionStack.Navigator
      initialRouteName="RolFormPermissionList"
      screenOptions={{ headerShown: false }}
    >
      <RolFormPermissionStack.Screen
        name="RolFormPermissionList"
        component={RolFormPermissionListScreen}
      />
      <RolFormPermissionStack.Screen
        name="RolFormPermissionRegister"
        component={RolFormPermissionRegisterScreen}
      />
      <RolFormPermissionStack.Screen
        name="RolFormPermissionUpdate"
        component={RolFormPermissionUpdateScreen}
      />
    </RolFormPermissionStack.Navigator>
  );
}

function RolUserNavigator() {
  return (
    <RolUserStack.Navigator screenOptions={{ headerShown: false }}>
      <RolUserStack.Screen
        name="RolUserList"
        component={RolUserListScreen}
      ></RolUserStack.Screen>
      <RolUserStack.Screen
        name="RolUserRegister"
        component={RolUserScreen}
      ></RolUserStack.Screen>
      <RolUserStack.Screen
        name="RolUserUpdate"
        component={RolUserUpdateScreen}
      ></RolUserStack.Screen>
    </RolUserStack.Navigator>
  );
}
function FormModuleNavigator() {
  return (
    <FormModuleStack.Navigator screenOptions={{ headerShown: false }}>
      <FormModuleStack.Screen
        name="FormModuleList"
        component={FormModuleListScreen}
      ></FormModuleStack.Screen>
      <FormModuleStack.Screen
        name="FormModuleRegister"
        component={FormModuleRegisterScreen}
      ></FormModuleStack.Screen>
      <FormModuleStack.Screen
        name="FormModuleUpdate"
        component={FormModuleUpdateScreen}
      ></FormModuleStack.Screen>
    </FormModuleStack.Navigator>
  );
}
function PersonStackNavigator() {
  return (
    <PersonStack.Navigator screenOptions={{ headerShown: false }}>
      <PersonStack.Screen
        name="PersonList"
        component={PersonListScreen}
      ></PersonStack.Screen>
      <PersonStack.Screen
        name="PersonRegister"
        component={PersonRegisterScreen}
      ></PersonStack.Screen>
      <PersonStack.Screen
        name="PersonUpdate"
        component={PersonUpdateScreen}
      ></PersonStack.Screen>
    </PersonStack.Navigator>
  );
}

export default function MainDrawer() {
  const { logout } = useAuth();
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleLogoutPress = () => setDialogVisible(true);
  const confirmLogout = () => {
    setDialogVisible(false);
    logout();
  };
  const cancelLogout = () => setDialogVisible(false);

  return (
    <PaperProvider>
      <>
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 15,
                }}
              >
                <TouchableOpacity onPress={handleLogoutPress}>
                  <MaterialIcons name="logout" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            ),
          }}
        >
          <Drawer.Screen
            name="UserStack"
            component={UserStackNavigator}
            options={{
              drawerLabel: "Users",
              drawerIcon: ({ color, size }) => (
                <AntDesign name="user" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="PersonStack"
            component={PersonStackNavigator}
            options={{
              drawerLabel: "Persons",
              drawerIcon: ({ color, size }) => (
                <AntDesign name="user" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="RolStack"
            component={RolStackNavigator}
            options={{
              drawerLabel: "Roles",
              drawerIcon: ({ color, size }) => (
                <FontAwesome5 name="shield-alt" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="PermissionStack"
            component={PermissionStackNavigator}
            options={{
              drawerLabel: "Permissions",
              drawerIcon: ({ color, size }) => (
                <Feather name="lock" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="FormStack"
            component={FormStackNavigator}
            options={{
              drawerLabel: "Forms",
              drawerIcon: ({ color, size }) => (
                <AntDesign name="form" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="ModuleStack"
            component={ModuleStackNavigator}
            options={{
              drawerLabel: "Module",
              drawerIcon: ({ color, size }) => (
                <MaterialIcons name="view-module" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="RolFormPermissionStack"
            component={RolFormPermissionStackNavigator}
            options={{
              drawerLabel: "Rol Form Permission",
              drawerIcon: ({ color, size }) => (
                <MaterialIcons name="verified-user" size={size} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="RolUserStack"
            component={RolUserNavigator}
            options={{
              drawerLabel: "Rol User",
              drawerIcon: ({ color, size }) => (
                <MaterialIcons name="people" size={size} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="FormModuleStack"
            component={FormModuleNavigator}
            options={{
              drawerLabel: "Form Module",
              drawerIcon: ({ color, size }) => (
                <MaterialIcons name="input" size={size} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>

        {/* Diálogo de logout */}
        <Portal>
          <Dialog
            visible={dialogVisible}
            onDismiss={cancelLogout}
            style={{ backgroundColor: "#1E1E1E" }}
          >
            <Dialog.Title>
              <Text style={{ color: "#fff", fontSize: 20 }}>Sign out</Text>
            </Dialog.Title>
            <Dialog.Content>
              <Text style={{ color: "#fff", fontSize: 16 }}>
                Are you sure you want to log out?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button textColor="#bbb" onPress={cancelLogout}>
                Cancel
              </Button>
              <Button textColor="#FF6B6B" onPress={confirmLogout}>
                Sign out
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </>
    </PaperProvider>
  );
}
