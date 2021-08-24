import React from 'react';
import {View, Text} from 'react-native';

import styles from './CustomText.styles';

function CustomText({label, onPress, dynamicStyle, dynamicTextStyle}) {
  return (
    <Text style={[styles.text, dynamicTextStyle]} onPress={onPress}>
      {label}
    </Text>
  );
}

export default CustomText;
