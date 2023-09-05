import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { useUserContext } from "../useUserContext";
import { Alert } from "react-native";

// Custom TextInput component for this page
function CustomTextInput({
  title,
  value,
  onChangeText,
  placeholder,
  keyboardType,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>{title}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
}

export default function EditOrAdd() {
  /// this component is for edit user or add new one
  const { setUsers, serverURL } = useUserContext();
  const navigation = useNavigation();
  const route = useRoute();
  /// here im checking if the user want to edit or add new user
  const isEdit = route.params?.isEdit || false;
  const existingUser = route.params?.user || {
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      city: "",
    },
    company: {
      name: "",
    },
  };

  const [user, setUser] = useState(existingUser);

  const handleSave = () => {
    if (
      !user.name ||
      !user.username ||
      !user.email ||
      !user.phone ||
      !user.website ||
      !user.address.street ||
      !user.address.city ||
      !user.company.name
    ) {
      Alert.alert(
        "Validation Error",
        "Please fill in all required fields.",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
      return; // Exit the function if any required field is empty
    } else {
      if (isEdit) {
        // Handle editing existing user
        axios
          .put(`${serverURL}/${user.id}`, { action: "edit", user })
          .then((response) => {
            setUsers(response.data.users);
            Alert.alert(
              "Success!",
              "User updated successfully.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    navigation.goBack();
                  },
                },
              ],
              { cancelable: false }
            );
          })
          .catch((error) => {
            console.error("Error updating user:", error);
          });
      } else {
        // Handle adding a new user

        axios
          .post(serverURL, { action: "add", user })
          .then((response) => {
            setUsers(response.data.users);
            Alert.alert(
              "Success!",
              "User added successfully.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    navigation.goBack();
                  },
                },
              ],
              { cancelable: false }
            );
          })
          .catch((error) => {
            console.error("Error creating user:", error);
          });
      }
    }
  };

  // Handle cancel button press for edit mode
  const handleCancel = () => {
    // You can navigate back or take any other action here
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator="false"
      >
        <View style={styles.form}>
          <Text style={styles.title}>
            {isEdit ? "Edit Contact" : "Add Contact"}
          </Text>
          <CustomTextInput
            title="Name"
            value={user.name}
            onChangeText={(text) => setUser({ ...user, name: text })}
          />
          <CustomTextInput
            title="Username"
            value={user.username}
            onChangeText={(text) => setUser({ ...user, username: text })}
          />
          <CustomTextInput
            title="Email"
            value={user.email}
            onChangeText={(text) => setUser({ ...user, email: text })}
          />
          <CustomTextInput
            title="Phone"
            value={user.phone}
            onChangeText={(text) => setUser({ ...user, phone: text })}
            keyboardType="numeric"
          />
          <CustomTextInput
            title="Website"
            value={user.website}
            onChangeText={(text) => setUser({ ...user, website: text })}
          />
          <CustomTextInput
            title="Street"
            value={user.address.street}
            onChangeText={(text) =>
              setUser({ ...user, address: { ...user.address, street: text } })
            }
          />
          <CustomTextInput
            title="City"
            value={user.address.city}
            onChangeText={(text) =>
              setUser({ ...user, address: { ...user.address, city: text } })
            }
          />
          <CustomTextInput
            title="Company Name"
            value={user.company.name}
            onChangeText={(text) =>
              setUser({ ...user, company: { ...user.company, name: text } })
            }
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          {isEdit && ( // Render Cancel button only in edit mode
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F0E5",
    padding: 16,
    marginTop: 30,
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    width: "100%",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#102C57",
    marginBottom: 16,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputTitle: {
    fontSize: 18,
    color: "#102C57",
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    fontSize: 18,
    color: "#102C57",
    borderBottomWidth: 1,
    borderColor: "#102C57",
    paddingVertical: 8,
  },
  saveButton: {
    backgroundColor: "#102C57",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 16,
  },
  saveButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  cancelButton: {
    backgroundColor: "#FF0000", // Red color for the cancel button
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 16,
  },
  cancelButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    width: "90%",
  },
});
