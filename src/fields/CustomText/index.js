import React from 'react';
import {View, Text} from 'react-native';

import styles from './CustomText.styles';

function CustomText({label, onPress, dynamicStyle, dynamicTextStyle}) {
  return (
    <View style={[styles.container, dynamicStyle]}>
      <Text style={[styles.text, dynamicTextStyle]} onPress={onPress}>
        {label}
      </Text>
    </View>
  );
}

export default CustomText;
