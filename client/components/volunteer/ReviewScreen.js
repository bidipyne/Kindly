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
import { useRoute, useNavigation } from '@react-navigation/native';
import { host } from '../constants';


const ReviewScreen = () => {
  const route = useRoute();
  const { organizationId, userId } = route.params;
  const navigation = useNavigation();

  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('1');

  const handlePost = () => {
    if (feedback.trim() === '' || rating === '') {
      Alert.alert('Error', 'Please fill in all the fields');
    } else {
      var myHeaders = new Headers();
      myHeaders.append("userid", userId);
      myHeaders.append("Content-Type", "application/json");

      console.log("rating ", rating);
      console.log("feedback ", feedback);

      var raw = JSON.stringify({
        "rating": rating,
        "description": feedback
      });


      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      console.log("UserId passed "+ userId);
      console.log("organizationId passed "+ organizationId);

      fetch(host+"/organizations/"+organizationId+"/review", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log("result organization " + result.organization);
          Alert.alert('Success', 'Your review has been posted');
          navigation.navigate("OrganizationDetailsScreen", {organization: result.organization});
        })
        .catch(error => console.log('error', error));



      

    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leave a Review</Text>
      <Text style={{...styles.label, marginTop: 30}}>Description</Text>
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
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 30,
    color: '#000000',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    marginTop: 2,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
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
    padding: 10,
    marginVertical: 20,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#009CE0',
    borderRadius: 5,
    height: 55,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
  },
});

export default ReviewScreen;
