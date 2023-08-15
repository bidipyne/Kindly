import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import OrganizationCard from './OrganizationCard'; // Import the OrganizationCard component
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { host } from '../constants';


const ListOfOrganizationsScreen = () => {
  const navigation = useNavigation();
  const [organizationsData, setOrganizationsData] = useState([]);

  useEffect(() => {
    // Fetch organizations data from the API
    const fetchOrganizationsData = async () => {
      try {
        const response = await axios.get(host+'/organizations');
        setOrganizationsData(response.data);
      } catch (error) {
        console.log('Error fetching organizations data:', error);
      }
    };

    fetchOrganizationsData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={organizationsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrganizationCard
            organization={item}
            onPress={() => {
              console.log('Item pressed', item); // Logging the item
              navigation.navigate('OrganizationDetailsScreen', { organization: item });
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
});

export default ListOfOrganizationsScreen;