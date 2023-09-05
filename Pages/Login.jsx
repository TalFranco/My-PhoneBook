import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState} from "react";
import axios from "axios";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../useUserContext";


export default function Login() {
  const navigation = useNavigation();
  const { serverURL} = useUserContext();

  //user info
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  function logIn() {
    const userData = {
      email: userEmail,
      password: userPassword,
      action: "login", // Indicate that this is a login action
    };

    axios
      .post(serverURL, userData)
      .then((response) => {
        if (response.data.message === "Login successful") {
          setUserEmail("");
          setUserPassword("");
          navigation.navigate("My PhoneBook", { user: userData });
        } else {
          Alert.alert("Login Failed", "Invalid email or password.");
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "An error occurred while logging in.");
        console.log(error.message);
      });
  }
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.form}>
        <Text style={styles.mainHeader}>Welcome</Text>
        <Text style={styles.secondHeader}>Log in to your phonebook</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Your email"
          onChangeText={(text) => setUserEmail(text)}
          value={userEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(text) => setUserPassword(text)}
          value={userPassword}
          secureTextEntry={true}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.loginButton} onPress={logIn}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F0E5",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "100%",
    aspectRatio: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    alignItems: "center",
  },
  mainHeader: {
    fontSize: 24,
    color: "#102C57",
    marginBottom: 14,
    textTransform: "capitalize",
  },
  secondHeader: {
    fontSize: 16,
    color: "#102C57",
    marginBottom: 30,
  },
  textInput: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#DAC0A3",
    borderRadius: 25,
    paddingHorizontal: 25,
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
    textAlign: "left",
    paddingLeft: 10,
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#DAC0A3",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#ffff",
  },
});
