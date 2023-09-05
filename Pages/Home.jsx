import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';



export default function Home({ route, navigation }) {
  
  const { user } = route.params;
  const emailParts = user.email.split('@');
  const userName = emailParts[0].charAt(0).toUpperCase() + emailParts[0].slice(1);


  return (
    <>
    <View style={styles.container}>
      <Text style={styles.greetingText}>Welcome, {userName}!</Text>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('My Contacts')}
      >
        <Text style={styles.menuItemText}>My Contacts</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('EditOrAdd')}
      >
        <Text style={styles.menuItemText}>Add Contact</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.menuItemText}>Logout</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
      height:'100%',
      backgroundColor: '#F8F0E5',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:70,
    },
    greetingText: {
      fontSize: 24,
      color: '#102C57',
      marginBottom: 60,
      
    },
    menuItem: {
      backgroundColor: '#EADBC8',
      width: 200,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
      borderRadius: 20,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 2,
    },
    menuItemText: {
      fontSize: 18,
      color: '#102C57',
    },
  });