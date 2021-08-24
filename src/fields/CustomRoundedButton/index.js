import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Image} from 'react-native';

import styles from './CustomRoundedButton.style';
import {
  convertObjectToStyleSheet,
  combineStyles,
} from '../../utils/styleHelper';

function CustomRoundedButton({
  icon,
  onPress,
  dynamicStyle,
  dynamicIconStyle,
  ...otherTouchableOpacityProps
}) {
  dynamicStyle = convertObjectToStyleSheet(dynamicStyle);
  const containerStyles = combineStyles(styles.container, dynamicStyle);

  dynamicIconStyle = convertObjectToStyleSheet(dynamicIconStyle);
  const iconStyles = combineStyles(styles.icon, dynamicIconStyle);

  return (
    <TouchableOpacity
      style={containerStyles}
      onPress={onPress}
      {...otherTouchableOpacityProps}>
      <Image style={iconStyles} source={icon} />
    </TouchableOpacity>
  );
}

export default CustomRoundedButton;

CustomRoundedButton.propTypes = {
  icon: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  dynamicStyle: PropTypes.object,
  dynamicIconStyle: PropTypes.object,
};
