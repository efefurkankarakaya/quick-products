import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import styles from './CustomButton.styles';

function CustomButton({label, onPress, dynamicStyle, dynamicTextStyle}) {
  dynamicStyle = StyleSheet.flatten(dynamicStyle);
  dynamicTextStyle = StyleSheet.flatten(dynamicTextStyle);
  return (
    <TouchableOpacity
      style={[styles.container, dynamicStyle]}
      onPress={onPress}>
      <Text style={[styles.label, dynamicTextStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default CustomButton;

CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  dynamicStyle: PropTypes.object,
  dynamicTextStyle: PropTypes.object,
};
