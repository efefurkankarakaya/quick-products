// TODO: JSdoc
export function logError(scopes, error) {
  const prefix = '[ERROR] [' + scopes.join(' -> ') + ']';
  const message = prefix + ' ' + error;
  console.error(message);
}

// TODO: JSdoc
export function logOutput(scopes, ...outputs) {
  const prefix = '[' + scopes.join(' -> ') + ']';
  const output = outputs.join(' ');
  const message = prefix + ' ' + output;
  console.log(message);
}
