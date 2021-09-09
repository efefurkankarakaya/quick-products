/**
 * @param {string} string - String that contains an array.
 * @returns {string[] | number[] | object[]} - Returns parsed array.
 */
export function parseStringToArray(string) {
  return Array.from(JSON.parse(string));
}
