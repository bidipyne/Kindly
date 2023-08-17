import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

import { host } from '../constants'
import ReviewProjectDetails from './ReviewProjectDetails';

const ProjectForm = ({ navigation, route }) => {
  const [logo, setLogo] = React.useState(null);
  const [projectTitle, setProjectTitle] = React.useState('');
  const [details, setDetails] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [status, setStatus] = React.useState('Ongoing');
  const [location, setLocation] = React.useState('');
  const [contactInfo, setContactInfo] = React.useState('');
  const [weNeed, setWeNeed] = React.useState('Volunteers');

  const [showReview, setShowReview] = React.useState(false);

  const projectId = route?.params?.projectId;

  React.useEffect(() => {
    if (projectId) {

      axios.get(`${host}/projects/${projectId}`)
        .then(response => {
          const projectData = response?.data?.data;

          console.log('pro', projectData);

          setProjectTitle(projectData.title);
          setDetails(projectData.details);
          setStartDate(formatDate(projectData.startDate));
          setEndDate(formatDate(projectData.endDate));
          setStatus(projectData.status);
          setLocation(projectData.location);
          setContactInfo(projectData.contactInfo);
          setWeNeed(projectData.lookingFor);
          setLogo(`${host}/${projectData.profileImage}`);

          // Any other necessary state updates...
        })
        .catch(error => {
          console.log('Error fetching project:', error);
        });
    }
  }, [projectId]);

  const handleSubmit = async () => {
    const userId = await AsyncStorage.getItem('userId');

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

    if (projectId) {
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: host+'/projects/'+projectId,
        headers: {
          'userid': userId,
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          navigation.navigate('OrganizationWelcomeScreen');
        })
        .catch((error) => {
          console.log(error);
        });

    } else {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: host+'/projects',
        headers: {
          'userid': userId,
        },
        data: data
      };
      console.log('config ' +JSON.stringify(config));

      axios.request(config)
        .then((response) => {
          navigation.navigate('OrganizationWelcomeScreen');
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  };

  const onEdit = () => {
    setShowReview(false);
  };

  const handleDateChange = (type, text) => {
    const cleanedText = text.replace(/[^\d]/g, '');

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

    if (!result.canceled) {
      setLogo(result.uri);
    }
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };

  let formTitle = 'Create a new project';
  let imageLabel = 'Add image';
  let buttonName = 'Create';

  if (projectId) {
    formTitle = 'Update a project';
    imageLabel = 'Update image';
    buttonName = 'Update';
  }

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
          <Text style={styles.title}>{formTitle}</Text>

          <Text style={styles.label}>Title <Text style={{
            color: 'red'
          }}>*</Text></Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setProjectTitle(text)}
            value={projectTitle}
          />

          <TouchableOpacity onPress={pickImage} style={styles.imageUpload}>
            {logo && (
              <Image source={{ uri: logo }} style={styles.image} />
            )}
            <Text style={styles.label}>{imageLabel} &nbsp;</Text>
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
            data={[{ label: 'Ongoing', value: 'Ongoing' },
            { label: 'Closed', value: 'Closed' },]}
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
            data={[{ label: 'Volunteers', value: 'Volunteers' },
            { label: 'Donations', value: 'Donations' },]}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            value={weNeed}
            onChange={item => {
              setWeNeed(item.value);
            }}
          />

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: projectTitle ? '#009CE0' : '#A0A0A0',
                opacity: projectTitle ? 1 : 0.5
              },
            ]}
            onPress={() => {
              const startDateParts = startDate.split('-');
              const endDateParts = endDate.split('-');

              const startDateObj = new Date(
                parseInt(startDateParts[2]),
                parseInt(startDateParts[1]) - 1,
                parseInt(startDateParts[0])
              );

              const endDateObj = new Date(
                parseInt(endDateParts[2]),
                parseInt(endDateParts[1]) - 1,
                parseInt(endDateParts[0])
              );

              if (endDateObj < startDateObj) {
                Alert.alert('Error', 'End date cannot be smaller than start date');
                return;
              }
              setShowReview(true);
            }}
            disabled={!projectTitle}
          >
            <Text style={styles.buttonText}>{buttonName}</Text>
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
