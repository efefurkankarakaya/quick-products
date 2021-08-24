import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, TextInput, View} from 'react-native';

import styles from './CustomTextInput.styles';
import {
  convertObjectToStyleSheet,
  combineStyles,
} from '../../utils/styleHelper';

function CustomTextInput(
  {
    dynamicStyle,
    dynamicBodyStyle,
    dynamicTextInputStyle,
    ...otherTextInputProps
  },
  ref,
) {
  dynamicStyle = convertObjectToStyleSheet(dynamicStyle);
  dynamicBodyStyle = convertObjectToStyleSheet(dynamicBodyStyle);
  dynamicTextInputStyle = convertObjectToStyleSheet(dynamicTextInputStyle);

  const combinedStyles = combineStyles(styles.container, dynamicStyle);
  const combinedBodyStyles = combineStyles(styles.body, dynamicBodyStyle);
  const combinedTextInputStyles = combineStyles(
    styles.textInput,
    dynamicTextInputStyle,
  );

  return (
    // TODO: Remove SafeAreaView
    // TODO: Remove View if possible
    // TODO: Remove their propTypes
    <SafeAreaView style={combinedStyles}>
      <View style={combinedBodyStyles}>
        <TextInput
          style={combinedTextInputStyles}
          placeholderTextColor="rgba(34, 62, 75, 0.7)"
          {...otherTextInputProps}
          ref={ref}
        />
      </View>
    </SafeAreaView>
  );
}

export default forwardRef(CustomTextInput);

CustomTextInput.propTypes = {
  dynamicStyle: PropTypes.object,
  dynamicBodyStyle: PropTypes.object,
  dynamicTextInputStyle: PropTypes.object,
};
