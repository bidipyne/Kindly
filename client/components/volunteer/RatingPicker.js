import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const RatingPicker = ({ selectedValue, onValueChange }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[1, 2, 3, 4, 5].map((value) => (
          <TouchableOpacity
            key={value}
            style={[styles.option, selectedValue === value.toString() && styles.selectedOption]}
            onPress={() => onValueChange(value.toString())}
          >
            <Text style={styles.optionText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 10,
  },
  option: {
    padding: 10,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOption: {
    backgroundColor: '#C4C4C4',
  },
  optionText: {
    fontSize: 16,
  },
});

export default RatingPicker;