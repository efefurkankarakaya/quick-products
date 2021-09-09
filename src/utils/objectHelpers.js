import qs from 'qs';

/**
 * @param {object} params - Parameters as an object to be converted to a query string.
 * @returns {string} - Returns string as query string.
 */
export function convertJSONToQueryString(params) {
  return qs.stringify(params);
}

/**
 * @param {object} data - Check if data type is object.
 * @returns {boolean} - Returns true or false.
 */
export function isObject(data) {
  return data === Object(data);
}
