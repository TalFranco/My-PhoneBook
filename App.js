import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import ContactsList from "./Pages/ContactsList";
import Contact from "./Pages/Contact";
import EditOrAdd from "./Components/EditOrAdd";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProvider } from "./useUserContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="My PhoneBook"
          component={Home}
          options={({ navigation }) => ({
            headerLeft: () => null,
            gestureEnabled: false
          })}
        />
         <Stack.Screen
          name="My Contacts"
          component={ContactsList}
        />
        <Stack.Screen
          name="Contact"
          component={Contact}
        />
        <Stack.Screen
          name="EditOrAdd"
          component={EditOrAdd}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
