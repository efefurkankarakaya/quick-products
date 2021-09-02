import axios from 'axios';
import {logError, logOutput} from '../../utils/logHelpers';
import {convertJSONToQueryString} from '../../utils/objectHelpers';

// TODO: Add JSdocs
async function sendGetFormsRequest(appKey) {
  const scopes = ['formController', 'sendGetFormsRequest'];
  const limit = 100;
  const endpoint = `https://api.jotform.com/user/forms?limit=${limit}`;

  const config = {
    headers: {
      apiKey: appKey,
    },
  };

  try {
    const {data} = await axios.get(endpoint, config);
    const {content, responseCode} = data;
    if (responseCode !== 200) {
      const message = 'Network error: ' + responseCode;
      logError(scopes, message);
      return [];
    }

    // Remove deleted (not purged yet) forms from the array.
    const filterStatus = 'deleted';
    const activeForms = content.filter(
      item => item.status.toLowerCase() !== filterStatus,
    );
    return activeForms;
  } catch (err) {
    const {message} = err.response.data;
    logError(scopes, message);
    logError(scopes, err.message);
  }
}

// TODO: Add JSdocs
async function sendCreateFormRequest(appKey, formTitle) {
  const scopes = ['formController', 'sendCreateFormRequest'];
  const endpoint = `https://api.jotform.com/user/forms?apiKey=${appKey}`;

  const formData = convertJSONToQueryString({
    'properties[title]': formTitle,
  });

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const {data} = await axios.post(endpoint, formData, config);
    const {content, responseCode} = data;
    if (responseCode !== 200) {
      const message = 'Network error: ' + responseCode;
      logError(scopes, message);
      return [];
    }
    return content;
  } catch (err) {
    logError(scopes, err.message);
  }
}

// TODO: Add JSdocs
async function sendDeleteFormRequest(appKey, formId) {
  const scopes = ['formController', 'sendDeleteFormRequest'];
  const endpoint = `https://api.jotform.com/form/${formId}?apiKey=${appKey}`;

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const {data} = await axios.delete(endpoint, config);
    const {responseCode, content} = data;
    const {status} = content;
    const isDeleted = status?.toLowerCase() === 'deleted';
    if (responseCode !== 200) {
      const message = 'Network error: ' + responseCode;
      logError(scopes, message);
      return isDeleted;
    }
    return isDeleted;
  } catch (err) {
    logError(scopes, err.message);
  }
}

export {sendCreateFormRequest, sendDeleteFormRequest, sendGetFormsRequest};
