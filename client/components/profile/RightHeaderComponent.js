import React from 'react';
import {
  TouchableOpacity, Text, StyleSheet, View, Modal, Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import { host } from '../constants';

const HeaderIcon = ({ onPress }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [user, setUser] = React.useState('');
  const [tooltipVisible, setTooltipVisible] = React.useState(false);

  const toggleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };

  const openAccountScreen = async () => {
    let userId = await AsyncStorage.getItem('userId');

    setTooltipVisible(false);
    navigation.navigate('AccountDetailsScreen', { userId });
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userId');

      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
    setTooltipVisible(false);
  };

  React.useEffect(() => {
    fetchLoggedInUser();
  }, [isFocused]);

  const fetchLoggedInUser = async () => {
    const userId = await AsyncStorage.getItem('userId');

    console.log(`${host}/users/${userId}`);

    try {
      let response = await fetch(`${host}/users/${userId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let user = await response.json();

      setUser(user.data);
    } catch (error) {
      console.error("There was a problem fetching organization projects:", error.message);

      return error.message;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profile} onPress={toggleTooltip}>
        {user?.fullProfileImageUrl ? (
          <Image
            source={{ uri: user?.fullProfileImageUrl }}
            style={styles.image}
          />
        ) : (
          <Text style={styles.initials}>
            {(user.name || user.fullName)?.substring(0, 2)?.toUpperCase()}
          </Text>
        )}
      </TouchableOpacity>
      <Modal
        visible={tooltipVisible}
        transparent={true}
        onRequestClose={() => setTooltipVisible(false)}
      >
        <TouchableWithoutFeedback onPress={toggleTooltip}>
          <View style={styles.modalOverlay}>
            <View style={styles.tooltip}>
              <TouchableOpacity onPress={openAccountScreen} style={styles.menuItem}>
                <Text>Account</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={logout} style={styles.menuItem}>
                <Text>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  profile: {
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 40,
    marginRight: 10
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  initials: {
    color: '#009CE0',
    fontWeight: 'bold',
    fontSize: 18,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.09)',
  },
  tooltip: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    position: 'absolute',
    right: 10,
    top: 105,
    borderWidth: 1,

    borderColor: '#B1B1B1'
  },
  menuItem: {
    padding: 10,
  },
});

export default HeaderIcon;
