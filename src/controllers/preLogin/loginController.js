import axios from 'axios';
import {logError, logOutput} from '../../utils/logHelpers';
import {convertJSONToQueryString} from '../../utils/objectHelpers';

/**
 * @param {object} loginData - Data to be sent to the server.
 * @returns {object} - Returns the user's login status and appKey.
 */
async function sendLoginRequest(loginData) {
  const scopes = ['loginController', 'sendLoginRequest'];
  // Accept: Query String
  const endpoint = 'https://m-baydogan.jotform.dev/intern-api/user/login';

  const loginDataMessage = 'Login Data: ' + JSON.stringify(loginData); // TODO: Remove this line.
  logOutput(scopes, loginDataMessage);

  // The loginData to be posted as query string
  loginData = convertJSONToQueryString(loginData);

  // Axios Config
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const loginStatus = {
    isLoggedIn: false,
    appKey: null,
  };

  try {
    const {data} = await axios.post(endpoint, loginData, config);
    const {responseCode, content} = data;
    if (responseCode != 200) {
      const message = 'Network error: ' + responseCode;
      logError(scopes, message);
      return loginStatus;
    }

    const {userInfo} = content;

    // Check returned data and if the array which contains user informations length less than 1,
    // then credentials are invalid.
    const isNotLoginSuccessful = Object.keys(userInfo).length < 1;
    if (isNotLoginSuccessful) {
      const message = 'Username or password is invalid.';
      logOutput(scopes, message);
      return loginStatus;
    }
    // If not error occurs within informations, then credentials are valid.
    loginStatus.isLoggedIn = true;
    loginStatus.appKey = userInfo.appKey;
    return loginStatus;
  } catch (err) {
    logError(scopes, err.message);
  }
}

export {sendLoginRequest};
