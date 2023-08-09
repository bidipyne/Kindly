import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const VolunteerWelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Kindly!</Text>
      <Text style={styles.subtitle}>Search ways to help by:</Text>
      
      <View style={styles.cardRow}>
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardContent}>
            <Icon name="project-diagram" size={50} color="#000" />
            <Text style={styles.cardText}>Projects</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.cardRow}>
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardContent}>
            <Icon name="building" size={50} color="#000" />
            <Text style={styles.cardText}>Organisations</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 30,
    color: '#000000',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    marginLeft: 20,
    marginTop: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#000000',
    marginLeft: 20,
    marginTop: 30,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
  card: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    marginTop: 10,
    fontSize: 18,
    color: '#000',
    marginLeft: 10,
  },
});

export default VolunteerWelcomeScreen;
