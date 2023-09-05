import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useUserContext } from "../useUserContext";

export default function ContactComp({ user }) {
  const navigation = useNavigation();
  const serverURL = "http://192.168.1.109:8000/server.php";
  const { setUsers } = useUserContext();

  const handlePhoneNumberPress = async () => {
    // when phone icon press
    if (user?.phone) {
      try {
        const phoneNumber = `tel:${user.phone.replace(/[^0-9]/g, "")}`;
        await Linking.openURL(phoneNumber);
      } catch (error) {
        console.error("Error opening phone number:", error);
      }
    }
  };

  const handleDeletePress = async () => {
    // when delete press
    try {
      // Send a DELETE request to the server with the user's ID
      const response = await axios.delete(`${serverURL}?id=${user.id}`);

      if (response.status === 200) {
        console.log("User deleted successfully");
        setUsers(response.data);
      } else {
        console.error("Error deleting user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <View style={styles.menuItem}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Contact", { user });
        }}
      >
        <View>
          <Text style={styles.menuItemText}>{user.name}</Text>
          <Text style={styles.secondaryText}>
            {user.address?.street}, {user.address?.city}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handlePhoneNumberPress}>
          <Icon name="phone" size={24} color="#228B22" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EditOrAdd", { user: user, isEdit: true })
          }
        >
          <Icon name="pencil" size={24} color="#104E8B" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeletePress}>
          <Icon name="trash" size={24} color="#FF0000" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    backgroundColor: "#EADBC8",
    width: 390,
    height: 90, // Increased height to accommodate street and city
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    borderRadius: 15,
    flexDirection: "row",
    paddingHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 20,
    color: "#102C57",
  },
  secondaryText: {
    fontSize: 16,
    color: "#102C57",
  },
});
