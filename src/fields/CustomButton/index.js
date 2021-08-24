import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import styles from './CustomButton.styles';
import {
  convertObjectToStyleSheet,
  combineStyles,
} from '../../utils/styleHelper';

function CustomButton({label, onPress, dynamicStyle, dynamicLabelStyle}) {
  dynamicStyle = convertObjectToStyleSheet(dynamicStyle);
  dynamicLabelStyle = convertObjectToStyleSheet(dynamicLabelStyle);

  const combinedStyles = combineStyles(styles.container, dynamicStyle);
  const combinedLabelStyles = combineStyles(styles.label, dynamicLabelStyle);

  return (
    <TouchableOpacity style={combinedStyles} onPress={onPress}>
      <Text style={combinedLabelStyles}>{label}</Text>
    </TouchableOpacity>
  );
}

export default CustomButton;

CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  dynamicStyle: PropTypes.object,
  dynamicLabelStyle: PropTypes.object,
};
