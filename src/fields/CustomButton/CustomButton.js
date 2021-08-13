import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import styles from './CustomButton.styles';

function CustomButton({label, onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
