import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, Image, View} from 'react-native';

import styles from './CustomItem.style';
import {convertObjectToStyleSheet} from '../../utils/styleHelper';
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
  dynamicTitleStyle = convertObjectToStyleSheet(dynamicTitleStyle);
  dynamicSubTextStyle = convertObjectToStyleSheet(dynamicSubTextStyle);
  dynamicTextContainerStyle = convertObjectToStyleSheet(
    dynamicTextContainerStyle,
  );
  dynamicImageStyle = convertObjectToStyleSheet(dynamicImageStyle);

  return (
    <TouchableOpacity
      style={[styles.container, dynamicStyle]}
      onPress={onPress}
      {...otherTouchableOpacityProps}>
      <Image style={[styles.image, dynamicImageStyle]} source={image} />
      {/* TODO: \IDEA/ what if passed a component (eg: CustomImage) as a prop? */}
      <View styles={[styles.textContainer, dynamicTextContainerStyle]}>
        <Text style={[styles.title, dynamicTitleStyle]}>{title}</Text>
        <Text style={[styles.subText, dynamicSubTextStyle]}>{subText}</Text>
        {/* TODO: \REMEMBER/ Text-ellipsis for content overflow safety */}
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
