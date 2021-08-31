import React from 'react';
import PropTypes from 'prop-types';
import {Text, TextInput, View} from 'react-native';

import styles from './CustomEditableTextInput.style';
import {
  convertObjectToStyleSheet,
  combineStyles,
} from '../../utils/styleHelpers';

function CustomEditableTextInput({
  label,
  dynamicStyle,
  dynamicLabelStyle,
  dynamicTextInputStyle,
  ...otherTextInputProps
}) {
  dynamicStyle = convertObjectToStyleSheet(dynamicStyle);
  dynamicLabelStyle = convertObjectToStyleSheet(dynamicLabelStyle);
  dynamicTextInputStyle = convertObjectToStyleSheet(dynamicTextInputStyle);

  const combinedStyles = combineStyles(styles.container, dynamicStyle);
  const combinedLabelStyles = combineStyles(styles.label, dynamicLabelStyle);
  const combinedTextInputStyles = combineStyles(
    styles.textInput,
    dynamicTextInputStyle,
  );

  return (
    <View style={combinedStyles}>
      <Text style={combinedLabelStyles}>{label}</Text>
      <TextInput style={combinedTextInputStyles} {...otherTextInputProps} />
      <Text style={combinedLabelStyles}>Last edited on 13:54, 31.8.21</Text>
    </View>
  );
}

export default CustomEditableTextInput;

CustomEditableTextInput.propTypes = {
  label: PropTypes.string,
  dynamicStyle: PropTypes.object,
  dynamicLabelStyle: PropTypes.object,
  dynamicTextInputStyle: PropTypes.object,
};
