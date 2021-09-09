import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, Image, View} from 'react-native';

import styles from './CustomItem.style';
import {
  convertObjectToStyleSheet,
  combineStyles,
} from '../../utils/styleHelpers';

function CustomItem({
  title,
  subText,
  image,
  onPress,
  dynamicStyle,
  dynamicTitleStyle,
  dynamicSubTextStyle,
  dynamicTextContainerStyle,
  dynamicImageStyle,
  ...otherTouchableOpacityProps
}) {
  dynamicStyle = convertObjectToStyleSheet(dynamicStyle);
  dynamicImageStyle = convertObjectToStyleSheet(dynamicImageStyle);
  dynamicTitleStyle = convertObjectToStyleSheet(dynamicTitleStyle);
  dynamicSubTextStyle = convertObjectToStyleSheet(dynamicSubTextStyle);
  dynamicTextContainerStyle = convertObjectToStyleSheet(
    dynamicTextContainerStyle,
  );

  const combinedStyles = combineStyles(styles.container, dynamicStyle);
  const combinedImageStyles = combineStyles(styles.image, dynamicImageStyle);
  const combinedTitleStyles = combineStyles(styles.title, dynamicTitleStyle);
  const combinedSubTextStyles = combineStyles(
    styles.subText,
    dynamicSubTextStyle,
  );
  const combinedTextContainerStyles = combineStyles(
    styles.textContainer,
    dynamicTextContainerStyle,
  );

  return (
    <TouchableOpacity
      style={combinedStyles}
      onPress={onPress}
      {...otherTouchableOpacityProps}>
      <Image style={combinedImageStyles} source={image} />
      <View styles={combinedTextContainerStyles}>
        <Text style={combinedTitleStyles}>{title}</Text>
        <Text style={combinedSubTextStyles}>{subText}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default CustomItem;

CustomItem.propTypes = {
  title: PropTypes.string.isRequired,
  subText: PropTypes.string,
  image: PropTypes.node,
  onPress: PropTypes.func.isRequired,
  dynamicStyle: PropTypes.object,
  dynamicTitleStyle: PropTypes.object,
  dynamicSubTextStyle: PropTypes.object,
  dynamicTextContainerStyle: PropTypes.object,
  dynamicImageStyle: PropTypes.object,
};
