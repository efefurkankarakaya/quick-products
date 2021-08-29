import qs from 'qs';

/**
 * @param {Object} params - Parameters as an object to be converted to a query string.
 */
export function convertJSONToQueryString(params) {
  return qs.stringify(params);
}

/**
 * @param {Object} params - Parameters as an object to be converted to a string.
 */
export function convertJSONToString(params) {
  return JSON.stringify(params);
}
