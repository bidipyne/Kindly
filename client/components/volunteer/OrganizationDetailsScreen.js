import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Assuming you're using FontAwesome icons for rating
import { useNavigation } from '@react-navigation/native';
import { host } from '../constants';
import axios from 'axios';

const OrganizationDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { organization } = route.params;
  const [userEmails, setUserEmails] = useState({});
  const [curUserId, setCurUserId] = useState('');
  
  const fetchUser = async () => {
    let userId = await AsyncStorage.getItem('userId');
    setCurUserId(userId)
  }

  React.useEffect(() => {
    fetchUser();
  }, []);

  const handleLeaveReview = () => {
   
   console.log("userId "+JSON.stringify(curUserId));
   navigation.navigate('ReviewScreen', {
    organizationId: organization._id, // Pass organization._id
    userId: curUserId, // Pass the logged-in user id
  });
  };

  // Fetch user data for all userIds in reviews when the component mounts
  useEffect(() => {
    console.log("Org details "+JSON.stringify(organization))
    const userIds = organization.reviews.map(review => review.userId);
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: host+'/users',
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        const userEmailMapping = {};
        //console.log('Response :: '+JSON.stringify(response.data));
        response.data.data.forEach(user => {
          if (userIds.includes(user._id)) {
            const email = user.email.split('@');
            userEmailMapping[user._id] = email[0];
          }
        });
        setUserEmails(userEmailMapping);
      })
      .catch((error) => {
        console.log('Error fetching user data:', error);
      });
  }, []);

  const calculateAverageRating = () => {
    if (!organization.reviews || organization.reviews.length === 0) {
      return 'N/A';
    }

    const totalRating = organization.reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / organization.reviews.length;

    // Ensure averageRating is a positive integer or return 0 if it's not valid
    return isNaN(averageRating) || averageRating <= 0 ? 0 : Math.floor(averageRating);
  };

  const averageRating = calculateAverageRating();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Organisation Details</Text>
      <Text style={styles.subtitle}>{organization.name}</Text>
      {/* Average Rating */}
      <View style={styles.rating}>
        {averageRating === 'N/A' ? (
          <Text>No Reviews</Text>
        ) : (
          [...Array(Math.floor(averageRating))].map((_, i) => (
            <Icon key={i} name="star" size={18} color="#FFD700" />
          ))
        )}
      </View>
      {/* Organization Image */}
      <View style={styles.orgImageContainer}>
        <Image source={{ uri:  host+'/'+organization.profileImage}} style={styles.orgImage} />
      </View>
      {/* About Us */}
      <Text style={styles.sectionTitle}>About Us</Text>
      <Text style={styles.sectionText}>{organization.about}</Text>
      {/* Location */}
      <Text style={styles.sectionTitle}>Location</Text>
      <Text style={styles.sectionText}>{organization.city}, {organization.province}</Text>
      {/* Contact */}
      <Text style={styles.sectionTitle}>Contact</Text>
      <Text style={styles.sectionText}>{organization.contactInfo}</Text>
      {/* Website */}
      <Text style={styles.sectionTitle}>Website</Text>
      <Text style={styles.sectionText}>{organization.website}</Text>
      {/* Leave Review */}
      <Text style={styles.reviewQuestion}>How was your volunteer experience?</Text>
      <TouchableOpacity style={styles.leaveReviewButton} onPress={handleLeaveReview}>
        <Text style={styles.leaveReviewButtonText}>Leave Review</Text>
      </TouchableOpacity>

      {/* Reviews Section */}
      <Text style={styles.sectionTitle}>Reviews</Text>
      {organization.reviews.map((review, index) => (
        <View key={index} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewUsername}>
              {userEmails[review.userId] || 'Anonymous User'}
            </Text>
            <View style={styles.rating}>
              {[...Array(review.rating)].map((_, i) => (
                <Icon key={i} name="star" size={18} color="#FFD700" />
              ))}
            </View>
          </View>
          <Text style={styles.reviewText}>{review.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 30,
    fontWeight: 'regular',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 29,
    marginBottom: 20,
    fontWeight: '500',
    color: '#009CE0'
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  orgImageContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  orgImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 29,
    fontWeight: 'regular',
    marginTop: 10,
    color: '#009CE0'
  },
  sectionText: {
    fontSize: 12,
    marginBottom: 20,
  },
  reviewQuestion: {
    fontSize: 18,
    fontWeight: 'regular',
    marginTop: 20,
  },
  leaveReviewButton: {
    marginTop: 10,
    backgroundColor: '#009CE0',
    paddingVertical: 17.5,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
  },
  leaveReviewButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  reviewCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewUsername: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewText: {
    fontSize: 16,
  },
});

export default OrganizationDetailsScreen;
