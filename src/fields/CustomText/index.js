import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import styles from './CustomText.styles';

function CustomText({label, onPress, dynamicStyle, dynamicTextStyle}) {
  dynamicTextStyle = StyleSheet.flatten(dynamicTextStyle);
  return (
    <Text style={[styles.text, dynamicTextStyle]} onPress={onPress}>
      {label}
    </Text>
  );
}

export default CustomText;
