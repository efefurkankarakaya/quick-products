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
  dynamicIconStyle = convertObjectToStyleSheet(dynamicIconStyle);

  const combinedStyles = combineStyles(styles.container, dynamicStyle);
  const combinedIconStyles = combineStyles(styles.icon, dynamicIconStyle);

  return (
    <TouchableOpacity
      style={combinedStyles}
      onPress={onPress}
      {...otherTouchableOpacityProps}>
      <Image style={combinedIconStyles} source={icon} />
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
