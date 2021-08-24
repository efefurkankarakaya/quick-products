import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, TextInput, View} from 'react-native';

import styles from './CustomTextInput.styles';
import {
  convertObjectToStyleSheet,
  combineStyles,
} from '../../utils/styleHelpers';

function CustomTextInput({dynamicTextInputStyle, ...otherTextInputProps}, ref) {
  dynamicTextInputStyle = convertObjectToStyleSheet(dynamicTextInputStyle);

  const combinedTextInputStyles = combineStyles(
    styles.textInput,
    dynamicTextInputStyle,
  );

  return (
    <TextInput
      style={combinedTextInputStyles}
      placeholderTextColor="rgba(34, 62, 75, 0.7)"
      {...otherTextInputProps}
      ref={ref}
    />
  );
}

export default forwardRef(CustomTextInput);

CustomTextInput.propTypes = {
  dynamicTextInputStyle: PropTypes.object,
};
