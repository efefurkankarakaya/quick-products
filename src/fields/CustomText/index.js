import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';

import styles from './CustomText.styles';
import {
  convertObjectToStyleSheet,
  combineStyles,
} from '../../utils/styleHelpers';

function CustomText({label, onPress, dynamicTextStyle, ...otherProps}) {
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
  dynamicTextStyle: PropTypes.object,
};
