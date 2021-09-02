import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, Image} from 'react-native';

import styles from './CustomCard.style';
import {
  convertObjectToStyleSheet,
  combineStyles,
} from '../../utils/styleHelpers';
import {Default} from '../../assets';

function CustomCard({
  source,
  title,
  description,
  dynamicStyle,
  dynamicImageStyle,
  dynamicTitleStyle,
  dynamicDescriptionStyle,
  ...otherTouchableOpacityProps
}) {
  dynamicStyle = convertObjectToStyleSheet(dynamicStyle);
  dynamicImageStyle = convertObjectToStyleSheet(dynamicImageStyle);
  dynamicTitleStyle = convertObjectToStyleSheet(dynamicTitleStyle);
  dynamicDescriptionStyle = convertObjectToStyleSheet(dynamicDescriptionStyle);

  const combinedStyles = combineStyles(styles.container, dynamicStyle);
  const combinedImageStyles = combineStyles(styles.image, dynamicImageStyle);
  const combinedTitleStyles = combineStyles(styles.title, dynamicTitleStyle);
  const combinedDescriptionStyles = combineStyles(
    styles.description,
    dynamicDescriptionStyle,
  );

  let dynamicSource = Default;
  if (source) {
    dynamicSource = typeof source === 'string' ? {uri: source} : source;
  }

  console.log('Source: ' + source);
  console.log('Dynamic Source: ' + dynamicSource);
  return (
    <TouchableOpacity style={combinedStyles} {...otherTouchableOpacityProps}>
      <Image style={combinedImageStyles} source={dynamicSource} />
      <Text style={combinedTitleStyles}>{title}</Text>
      <Text style={combinedDescriptionStyles}>{description}</Text>
    </TouchableOpacity>
  );
}

export default CustomCard;

CustomCard.propTypes = {
  source: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  dynamicStyle: PropTypes.object,
  dynamicImageStyle: PropTypes.object,
  dynamicTitleStyle: PropTypes.object,
  dynamicDescriptionStyle: PropTypes.object,
};

CustomCard.defaultProps = {
  source: Default,
};
