import axios from 'axios';
import {convertJSONToQueryString} from '../../utils/objectHelpers';

// Accept: Query String
const endpoint = 'https://m-baydogan.jotform.dev/intern-api/user/login';

/**
 * @param {object} loginData - Data to be sent to the server.
 * @returns {object} - Returns the user's login status and appKey.
 */
async function sendLoginRequest(loginData) {
  console.log('Login Data: ' + JSON.stringify(loginData)); // TODO: Remove this line.
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
      console.error('Connection error: ' + responseCode);
      return loginStatus;
    }

    const {userInfo} = content;

    // Check returned data and if the array which contains user informations length less than 1,
    // then credentials are invalid.
    const isNotLoginSuccessful = Object.keys(userInfo).length < 1;
    if (isNotLoginSuccessful) {
      console.log('Username or password is invalid.');
      return loginStatus;
    }
    // If not error occurs within informations, then credentials are valid.
    loginStatus.isLoggedIn = true;
    loginStatus.appKey = userInfo.appKey; // TODO: \?/ Should its existence be checked?
    return loginStatus;
  } catch (err) {
    console.error(err);
  }
}

export {sendLoginRequest};
