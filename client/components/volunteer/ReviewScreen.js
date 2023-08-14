import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import RatingPicker from './RatingPicker';

const ReviewScreen = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('1');

  const handlePost = () => {
    if (feedback.trim() === '' || rating === '') {
      Alert.alert('Error', 'Please fill in all the fields');
    } else {
      // Handle the posting of the review here
      Alert.alert('Success', 'Your review has been posted');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leave a Review</Text>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setFeedback(text)}
        value={feedback}
        multiline
        numberOfLines={4}
        placeholder="Write your review here"
      />

      <Text style={styles.label}>Rate this organization from 1 to 5</Text>
      <RatingPicker
        selectedValue={rating}
        onValueChange={(itemValue) => setRating(itemValue)}
      />

      <TouchableOpacity style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>
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
    color: '#000000',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    marginLeft: 20,
    marginTop: 2,
  },
  label: {
    fontSize: 16,
    marginLeft: 5,
    marginTop: 10,
    color: '#000000',
  },
  input: {
    height: 100,
    borderColor: '#C4C4C4',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
    borderRadius: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: '#009CE0',
    borderRadius: 5,
    height: 55,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
  },
});

export default ReviewScreen;
