import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Image} from 'react-native';

import styles from './CustomImage.style';
import {
  convertObjectToStyleSheet,
  combineStyles,
} from '../../utils/styleHelpers';

function CustomImage({
  source,
  dynamicStyle,
  dynamicImageStyle,
  ...otherTouchableOpacityProps
}) {
  dynamicStyle = convertObjectToStyleSheet(dynamicStyle);
  dynamicImageStyle = convertObjectToStyleSheet(dynamicImageStyle);

  const combinedStyles = combineStyles(styles.container, dynamicStyle);
  const combinedImageStyles = combineStyles(styles.image, dynamicImageStyle);

  return (
    <TouchableOpacity style={combinedStyles} {...otherTouchableOpacityProps}>
      <Image source={source} style={combinedImageStyles} />
    </TouchableOpacity>
  );
}

export default CustomImage;

CustomImage.propTypes = {
  source: PropTypes.node.isRequired,
  dynamicStyle: PropTypes.object,
  dynamicImageStyle: PropTypes.object,
};
