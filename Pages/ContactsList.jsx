import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ContactComp from "../Components/ContactComp";
import { FlatList } from "react-native-gesture-handler";
import { useUserContext } from "../useUserContext";

export default function ContactsList() {//rendring all contacts
  const { users} = useUserContext();

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={users}
        showsVerticalScrollIndicator='false'
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ContactComp user={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F0E5",
  },
  list: {
    alignItems: "center",
    margin: 10,
    padding: 50,
  },
});
