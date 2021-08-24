import {StyleSheet} from 'react-native';

/**
 * @param {Object} styleObject - Style object to be converted to a StyleSheet (by React Native).
 */
export const convertObjectToStyleSheet = styleObject => {
  return StyleSheet.flatten(styleObject);
};

/**
 * @param {StyleSheet, StyleSheet[]} initial - StyleSheet object or an array of StyleSheet objects.
 * @param {StyleSheet} style - StyleSheet object.
 */
export const combineStyles = (initial, styleSheet) => {
  return Array.isArray(initial)
    ? [...initial, styleSheet]
    : [initial, styleSheet];
};
