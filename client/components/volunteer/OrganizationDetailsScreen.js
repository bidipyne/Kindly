import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Assuming you're using FontAwesome icons for rating
import { useNavigation } from '@react-navigation/native';

const OrganizationDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { organization } = route.params;

  const handleLeaveReview = () => {
   navigation.navigate('ReviewScreen'); // Replace with the actual screen name for LeaveReview
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Organisation Details</Text>
      <Text style={styles.subtitle}>{organization.name}</Text>
      {/* Rating */}
      <View style={styles.rating}>
        <Icon name="star" size={18} color="#FFD700" />
        <Icon name="star" size={18} color="#FFD700" />
        <Icon name="star" size={18} color="#FFD700" />
        <Icon name="star" size={18} color="#FFD700" />
        <Icon name="star" size={18} color="#FFD700" />
      </View>
      {/* Organization Image */}
      <View style={styles.orgImageContainer}>
        <Image source={organization.image} style={styles.orgImage} />
      </View>
      {/* About Us */}
      <Text style={styles.sectionTitle}>About Us</Text>
      <Text style={styles.sectionText}>{organization.about}</Text>
      {/* Location */}
      <Text style={styles.sectionTitle}>Location</Text>
      <Text style={styles.sectionText}>{organization.location}</Text>
      {/* Contact */}
      <Text style={styles.sectionTitle}>Contact</Text>
      <Text style={styles.sectionText}>{organization.contact}</Text>
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
            <Text style={styles.reviewUsername}>{review.username}</Text>
            <View style={styles.rating}>
              {[...Array(review.rating)].map((_, i) => (
                <Icon key={i} name="star" size={18} color="#FFD700" />
              ))}
            </View>
          </View>
          <Text style={styles.reviewText}>{review.feedback}</Text>
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
