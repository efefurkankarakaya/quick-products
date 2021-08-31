import axios from 'axios';

// https://app.swaggerhub.com/apis/BaydoganMirac/JotFormMobilAppApi/1.0.0#/
// Parameters can't be passed as headers, endpoint needs to be accessed with absolute path.
const mainURI = 'https://m-baydogan.jotform.dev/intern-api/product';
const getEndPoint = (appKey, formId) => `${mainURI}/${appKey}/${formId}`;

// TODO: JSDocs
async function getProducts(appKey, formId) {
  const endpoint = getEndPoint(appKey, formId);

  const config = {
    headers: {
      Accept: 'application/json',
    },
  };
  try {
    console.log(endpoint);
    const {data} = await axios.get(endpoint, config);
    console.log(data);
    const {content, responseCode} = data;
    if (responseCode !== 200) {
      console.error('Network error: ' + responseCode);
      return [];
    }
    if (!Array.isArray(content)) {
      console.log('No products found');
      return [];
    }
    return content;
  } catch (err) {
    console.error(err);
  }
}

export {getProducts};
