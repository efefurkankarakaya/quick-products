import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Image} from 'react-native';

import styles from './CustomRoundedButton.style';
import {
  convertObjectToStyleSheet,
  combineStyles,
} from '../../utils/styleHelper';

function CustomRoundedButton({icon, onPress, dynamicStyle, dynamicIconStyle}) {
  dynamicStyle = convertObjectToStyleSheet(dynamicStyle);
  const containerStyles = combineStyles(styles.container, dynamicStyle);

  dynamicIconStyle = convertObjectToStyleSheet(dynamicIconStyle);
  const iconStyles = combineStyles(styles.icon, dynamicIconStyle);

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress}>
      <Image style={iconStyles} source={icon} />
    </TouchableOpacity>
  );
}

export default CustomRoundedButton;
