import {StyleSheet} from 'react-native';

/**
 * @param {object} styleObject - Style object to be converted to a StyleSheet (by React Native).
 * @returns {StyleSheet} - A StyleSheet object.
 */
export const convertObjectToStyleSheet = styleObject => {
  return StyleSheet.flatten(styleObject);
};

/**
 * @param {StyleSheet | StyleSheet[]} initial - StyleSheet object or an array of StyleSheet objects.
 * @param {StyleSheet} styleSheet - The StyleSheet object to be combined with initial StyleSheets.
 * @returns {StyleSheet[]} - An array of StyleSheet objects.
 */
export const combineStyles = (initial, styleSheet) => {
  return Array.isArray(initial)
    ? [...initial, styleSheet]
    : [initial, styleSheet];
};
