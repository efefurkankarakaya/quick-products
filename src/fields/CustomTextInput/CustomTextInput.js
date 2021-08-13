import React, {forwardRef} from 'react';
import {SafeAreaView, TextInput, View} from 'react-native';

import styles from './CustomTextInput.styles';

function CustomTextInput(props, ref) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <TextInput
          placeholderTextColor="rgba(34, 62, 75, 0.7)"
          {...props}
          ref={ref}
        />
      </View>
    </SafeAreaView>
  );
}

export default forwardRef(CustomTextInput);
