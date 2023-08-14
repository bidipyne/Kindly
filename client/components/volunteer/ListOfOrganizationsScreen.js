import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import OrganizationCard from './OrganizationCard'; // Import the OrganizationCard component
import { useNavigation } from '@react-navigation/native';

const organizationsData = [
  {
    id: '1',
    name: 'Organization X',
    image: require('../../assets/icon.png'),
    reviews: []
  },
  {
    id: '2',
    name: 'Organization Y',
    image: require('../../assets/icon.png'),
    reviews: []
  },
  // Add more organization data here
];

const ListOfOrganizationsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={organizationsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrganizationCard
            organization={item}
            onPress={() => {
              console.log("Item pressed", item); // Logging the item
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
