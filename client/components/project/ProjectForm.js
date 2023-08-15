import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import qs from 'qs';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import ReviewProjectDetails from './ReviewProjectDetails';

const ProjectForm = ({ navigation }) => {
  const [logo, setLogo] = React.useState(null);
  const [projectTitle, setProjectTitle] = React.useState('');
  const [details, setDetails] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [status, setStatus] = React.useState('ongoing');
  const [location, setLocation] = React.useState('');
  const [contactInfo, setContactInfo] = React.useState('');
  const [weNeed, setWeNeed] = React.useState('volunteers');

  const [showReview, setShowReview] = React.useState(false);

  const handleSubmit = () => {

    let data = new FormData();
    data.append('title', projectTitle);
    data.append('details', details);
    data.append('startDate', startDate);
    data.append('endDate', endDate);
    data.append('status', status);
    data.append('location', location);
    data.append('contactInfo', contactInfo);
    data.append('lookingFor', weNeed);

    if (logo) {
      const fileUriParts = logo.split('.');
      const fileType = fileUriParts[fileUriParts.length - 1];

      data.append('profileImage', {
        uri: logo,
        name: `logo.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:3001/projects',
      headers: {
        'userid': '64d03d68b6d32edbc1c126d8',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      console.log('Success: ', JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  };

  const onEdit = (flag) => {
    setShowReview(flag);
  };

  const handleDateChange = (type, text) => {
    const cleanedText = text.replace(/[^\d]/g, '');
    console.log('t', type, text)

    if (cleanedText.length >= 1 && cleanedText.length <= 8) {
      let formattedText = cleanedText;

      if (cleanedText.length >= 3) {
        formattedText = `${formattedText.substring(0, 2)}-${formattedText.substring(2)}`;
      }
      if (cleanedText.length >= 5) {
        formattedText = `${formattedText.substring(0, 5)}-${formattedText.substring(5)}`;
      }
      if (type === 'startDate') {
        setStartDate(formattedText);
      }

      if (type === 'endDate') {
        setEndDate(formattedText);
      }
    } else {
      if (type === 'startDate') {
        setStartDate('');
      }

      if (text === 'endDate') {
        setEndDate('');
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setLogo(result.uri);
    }
  };

  if (showReview) {
    return <ReviewProjectDetails
      formData={{
        projectTitle,
        details,
        startDate,
        endDate,
        status,
        location,
        contactInfo,
        weNeed,
        logo
      }}
      onConfirm={handleSubmit}
      onEdit={onEdit}
    />;
  } else {
    return (
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={styles.container}>
          <Text style={styles.title}>Create a new project</Text>

          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setProjectTitle(text)}
            value={projectTitle}
          />

          <TouchableOpacity onPress={pickImage} style={styles.imageUpload}>
            {logo && (
              <Image source={{ uri: logo }} style={styles.image} />
            )}
            <Text style={styles.label}>Add Image &nbsp;</Text>
            <Icon name="images" size={30} color="#000" style={styles.imageIcon} />
          </TouchableOpacity>

          <Text style={styles.label}>Details</Text>
          <TextInput
            style={styles.textArea}
            onChangeText={text => setDetails(text)}
            value={details}
            multiline
          />
          <View style={styles.dateContainer}>
            <View style={{
              flexDirection: 'column',
              flex: 1
            }}>
              <Text style={styles.label}>Start Date</Text>
              <TextInput
                style={styles.dateInput}
                placeholder="DD-MM-YYYY"
                value={startDate}
                maxLength={10}
                onChangeText={(text) => {
                  handleDateChange('startDate', text);
                }}
              />
            </View>
            <View style={{
              flexDirection: 'column',
              flex: 1,
              marginLeft: 10
            }}>
              <Text style={styles.label}>End Date</Text>
              <TextInput
                style={styles.dateInput}
                placeholder="DD-MM-YYYY"
                value={endDate}
                maxLength={10}
                onChangeText={(text) => {
                  handleDateChange('endDate', text);
                }}
              />

            </View>
          </View>

          <Text style={styles.label}>Status</Text>
          <Dropdown
            style={styles.dropdown}
            data={[{ label: 'Ongoing', value: 'ongoing' },
            { label: 'Closed', value: 'closed' },]}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            value={status}
            onChange={item => {
              setStatus(item.value);
            }}
          />

          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setLocation(text)}
            value={location}
          />

          <Text style={styles.label}>Contact Info</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setContactInfo(text)}
            value={contactInfo}
          />

          <Text style={styles.label}>We need:</Text>
          <Dropdown
            style={styles.dropdown}
            data={[{ label: 'Volunteers', value: 'volunteers' },
            { label: 'Donations', value: 'donations' },]}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            value={weNeed}
            onChange={item => {
              setWeNeed(item.value);
            }}
          />

          <TouchableOpacity style={styles.button} onPress={() => {
            setShowReview(true);
          }}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 20,
    paddingBottom: 60,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 29,
    fontWeight: '600',
    marginVertical: 20,
    color: '#000000',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
    color: '#000000',
    fontWeight: '600'
  },
  input: {
    height: 48,
    borderColor: '#C4C4C4',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
    borderRadius: 10,
  },
  dateInput: {
    height: 48,
    borderColor: '#C4C4C4',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
    borderRadius: 10,
  },
  textArea: {
    height: 100,
    borderColor: '#C4C4C4',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
    borderRadius: 10,
  },
  button: {
    marginVertical: 30,
    width: '100%',
    padding: 10,
    backgroundColor: '#009CE0',
    borderRadius: 5,
    height: 55,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFF',
    textAlign: 'center',
  },
  createAccountLink: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    position: 'absolute',
    bottom: 450,
    left: 0,
    right: 0,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  imageUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
    borderRadius: 5
  },
});

export default ProjectForm;
