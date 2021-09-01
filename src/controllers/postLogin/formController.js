import axios from 'axios';

import {convertJSONToQueryString} from '../../utils/objectHelpers';

// TODO: Add JSdocs
async function sendGetFormsRequest(appKey) {
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
      console.error('Network error: ' + responseCode);
      return [];
    }

    // Remove deleted (not purged yet) forms from the array.
    const filterStatus = 'deleted';
    const activeForms = content.filter(
      item => item.status.toLowerCase() !== filterStatus,
    );
    return activeForms;
  } catch (err) {
    console.error(err);
  }
}

// TODO: Add JSdocs
async function sendCreateFormRequest(appKey, formTitle) {
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
      console.error('Network error: ' + responseCode);
      return [];
    }
    return content;
  } catch (err) {
    console.error(err);
  }
}

// TODO: Add JSdocs
// TODO: Connect with Dashboard
// TODO: Fix the bug that the deleted forms are still getting listed 'cause of they're not purged.
async function sendDeleteFormRequest(appKey, formId) {
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
      console.error('Network error: ' + responseCode);
      return isDeleted;
    }
    return isDeleted;
  } catch (err) {
    console.error(err);
  }
}

export {sendCreateFormRequest, sendDeleteFormRequest, sendGetFormsRequest};
