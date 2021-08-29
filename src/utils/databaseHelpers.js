import AsyncStorage from '@react-native-async-storage/async-storage';
import {isObject} from './objectHelpers';

/**
 * @param {string} key - Key to store the value.
 * @param {number|string|object} value - The value to pair with key.
 * @returns {void} - Returns nothing.
 */
export async function setItem(key, value) {
  try {
    // If value is object, then stringify it
    if (isObject(value)) {
      value = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.error(err);
  }
}

/**
 * @param {string} key - Key to get the value.
 * @returns {string|object} - Returns the value paired with key.
 */
export async function getItem(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (err) {
      return value;
    }
  } catch (err) {
    console.error(err);
  }
}

/**
 * @param {string} key - Key to remove the pair.
 * @returns {void} - Returns nothing.
 */
export async function removeItem(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
}
