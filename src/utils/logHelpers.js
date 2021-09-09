/**
 * @param {string[]} scopes - An array that contains scopes.
 * @param {string} outputs - Texts to be logged.
 * @returns {void} - Nothing.
 */
export function logError(scopes, error) {
  const prefix = '[ERROR] [' + scopes.join(' -> ') + ']';
  const message = prefix + ' ' + error;
  console.error(message);
}

/**
 * @param {string[]} scopes - An array that contains scopes.
 * @param {string} outputs - Texts to be logged.
 * @returns {void} - Nothing.
 */
export function logOutput(scopes, ...outputs) {
  const prefix = '[' + scopes.join(' -> ') + ']';
  const output = outputs.join(' ');
  const message = prefix + ' ' + output;
  console.log(message);
}
