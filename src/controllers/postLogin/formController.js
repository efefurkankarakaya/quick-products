import axios from 'axios';

// let endpoint = `https://api.jotform.com/user/forms?apiKey=${appKey}`;
const endpoint = 'https://api.jotform.com/user/forms';

// TODO: Add docs
async function getForms(appKey) {
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

async function createForm() {}

export {createForm, getForms};
