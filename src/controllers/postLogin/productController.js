import axios from 'axios';
import {logError, logOutput} from '../../utils/logHelpers';

// https://app.swaggerhub.com/apis/BaydoganMirac/JotFormMobilAppApi/1.0.0#/
// Parameters can't be passed as headers, endpoint needs to be accessed with absolute path.
const mainURI = 'https://m-baydogan.jotform.dev/intern-api/product';
const getEndPoint = (appKey, formId) => `${mainURI}/${appKey}/${formId}`;

// TODO: JSDocs
async function sendGetProductsRequest(appKey, formId) {
  const scopes = ['productController', 'sendGetProductsRequest'];
  const endpoint = getEndPoint(appKey, formId);

  const config = {
    headers: {
      Accept: 'application/json',
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
    if (!Array.isArray(content)) {
      const message = 'No products found.';
      logOutput(scopes, message);
      return [];
    }
    return content;
  } catch (err) {
    logError(scopes, err.message);
  }
}

async function sendCreateProductRequest() {}

export {sendGetProductsRequest};
