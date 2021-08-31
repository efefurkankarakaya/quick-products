import axios from 'axios';

import {convertJSONToQueryString} from '../../utils/objectHelpers';

async function getForms(appKey) {
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
    return content;
  } catch (err) {
    console.error(err);
  }
}

async function sendCreateFormRequest(appKey) {
  const endpoint = `https://api.jotform.com/user/forms?apiKey=${appKey}`;

  const formData = convertJSONToQueryString({
    'properties[title]': 'New Form',
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

export {sendCreateFormRequest, getForms};
