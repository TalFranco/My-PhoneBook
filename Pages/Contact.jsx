import { View, Text, StyleSheet, Linking } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Contact() {
  const route = useRoute();
  const contact = route.params.user;

  const handlePhoneNumberPress = async () => {
    if (contact?.phone) {
      try {
        const phoneNumber = `tel:${contact.phone.replace(/[^0-9]/g, "")}`;
        await Linking.openURL(phoneNumber);
      } catch (error) {
        console.error("Error opening phone number:", error);
      }
    }
  };

  const handleWebsitePress = async () => {///open websit
    if (contact?.website) {
      try {
        let formattedWebsite = contact.website.toLowerCase();
        if (
          !formattedWebsite.startsWith("http://") &&
          !formattedWebsite.startsWith("https://")
        ) {
          formattedWebsite = `http://${formattedWebsite}`;
        }
        await Linking.openURL(formattedWebsite);
      } catch (error) {
        console.error("Error opening website:", error);
      }
    }
  };

  const handleLocationPress = async () => {///open google maps
    if (contact?.address?.geo?.lat && contact?.address?.geo?.lng) {
      try {
        const latitude = contact.address.geo.lat;
        const longitude = contact.address.geo.lng;
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        await Linking.openURL(googleMapsUrl);
      } catch (error) {
        console.error("Error opening Google Maps:", error);
      }
    }
  };

  const handleEmailPress = async () => {///open email
    if (contact?.email) {
      try {
        const emailAddress = `mailto:${contact.email}`;
        await Linking.openURL(emailAddress);
      } catch (error) {
        console.error("Error opening email:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Contact Information</Text>
        <Text style={styles.labelText}>Name:</Text>
        <Text style={styles.text}>{contact.name}</Text>
        <Text style={styles.labelText}>Username:</Text>
        <Text style={styles.text}>{contact.username}</Text>
        <Text style={styles.labelText}>Email:</Text>
        <Text style={styles.text}>{contact.email}</Text>
        <Text style={styles.labelText}>Company:</Text>
        <Text style={styles.text}>{contact.company.name}</Text>

        <View style={styles.iconContainer}>
          {contact?.address?.geo?.lat &&
            contact?.address?.geo?.lng && ( // Check if location info exists (in new users dosent)
              <>
                <TouchableOpacity onPress={handleLocationPress}>
                  <Icon
                    name="map-marker"
                    size={50}
                    color="#FF5733"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </>
            )}
          <TouchableOpacity onPress={handlePhoneNumberPress}>
            <Icon name="phone" size={50} color="#228B22" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleWebsitePress}>
            <Icon name="globe" size={50} color="#102C57" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEmailPress}>
            <Icon
              name="envelope"
              size={50}
              color="#007bff"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F0E5",
    padding: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    width: "90%",
    height: "70%",
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
  labelText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#102C57",
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
    color: "#102C57",
    marginBottom: 8,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 70,
  },
  icon: {
    marginHorizontal: 16,
  },
});
