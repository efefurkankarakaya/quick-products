import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';

import styles from './CustomText.styles';
import {
  convertObjectToStyleSheet,
  combineStyles,
} from '../../utils/styleHelper';

function CustomText({
  label,
  onPress,
  dynamicStyle,
  dynamicTextStyle,
  ...otherProps
}) {
  dynamicTextStyle = convertObjectToStyleSheet(dynamicTextStyle);

  const combinedTextStyles = combineStyles(styles.text, dynamicTextStyle);

  return (
    <Text style={combinedTextStyles} onPress={onPress} {...otherProps}>
      {label}
    </Text>
  );
}

export default CustomText;

CustomText.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  dynamicStyle: PropTypes.object,
  dynamicTextStyle: PropTypes.object,
};
