import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';

import styles from './CustomText.styles';

function CustomText({
  label,
  onPress,
  dynamicStyle,
  dynamicTextStyle,
  ...otherProps
}) {
  dynamicTextStyle = StyleSheet.flatten(dynamicTextStyle);
  return (
    <Text
      style={[styles.text, dynamicTextStyle]}
      onPress={onPress}
      {...otherProps}>
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
