import axios from 'axios';
import FormData from 'form-data';
// import imageToBase64 from 'image-to-base64';
import {parseStringToArray} from '../../utils/arrayHelpers';
import {convertJSONToQueryString} from '../../utils/objectHelpers';
import {logError, logOutput} from '../../utils/logHelpers';

// TODO: JSDocs
async function sendGetProductsRequest(appKey, formId) {
  const scopes = ['productController', 'sendGetProductsRequest'];
  const endpoint = `https://m-baydogan.jotform.dev/intern-api/product/${appKey}/${formId}`;

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

// TODO: JSdocs
async function sendCreateProductRequest(appKey, formId, product) {
  const scopes = ['productController', 'sendCreateProductRequest'];
  const endpoint = `https://m-baydogan.jotform.dev/intern-api/product/${appKey}/${formId}`;

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  // TODO: Don't forget to parse Image Array
  const products = await sendGetProductsRequest(appKey, formId);
  const {length} = products;
  product.pid = 1000 + length;
  products.push(product);
  const productsData = convertJSONToQueryString({
    products: JSON.stringify(products),
  });

  try {
    const {data} = await axios.post(endpoint, productsData, config);
    logOutput(scopes, data);
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

async function sendUpdateProductRequest(appKey, formId, product) {
  const scopes = ['productController', 'sendUpdateProductRequest'];
  const endpoint = `https://m-baydogan.jotform.dev/intern-api/product/${appKey}/${formId}`;

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  // Don't forget to parse Image Array
  const products = await sendGetProductsRequest(appKey, formId);
  const index = product.pid - 1000;
  products[index] = product;
  // TODO: At that night that you added first, they might cause some problems because their id don't start from 1000.

  // ERROR  [ERROR] [formController -> sendGetFormsRequest] API-Limit exceeded
  // ERROR  [ERROR] [formController -> sendGetFormsRequest] Request failed with status code 403
  // ERROR  [ERROR] [productController -> sendGetProductsRequest] Request failed with status code 500
  // No products returned and that causes error too.

  const productsData = convertJSONToQueryString({
    products: JSON.stringify(products),
  });

  try {
    const {data} = await axios.post(endpoint, productsData, config);
    logOutput(scopes, JSON.stringify(data));
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

async function sendDeleteProductRequest(appKey, formId) {
  const scopes = ['productController', 'sendDeleteProductRequest'];
  // update product -> remove item from array
}

async function sendUploadImageRequest(appKey, formId, productId, image) {
  const scopes = ['productController', 'sendImageUploadRequest'];
  const endpoint = `https://m-baydogan.jotform.dev/intern-api/image/${appKey}/${formId}`;

  // https://heartbeat.fritz.ai/how-to-upload-images-in-a-react-native-app-4cca03ded855
  // https://www.reactnativeschool.com/how-to-upload-images-from-react-native

  const {assets} = image;
  const {uri, fileName, type} = assets[0];
  const formData = new FormData();
  formData.append('image', {
    name: fileName,
    type: type,
    uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
  });
  formData.append('productID', productId);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  logOutput(scopes, productId);
  try {
    const {data} = await axios.post(endpoint, formData, config);
    logOutput(scopes, JSON.stringify(data));
  } catch (err) {
    logError(scopes, JSON.stringify(err.response));
    logError(scopes, err.message);
    logError(scopes, err.responseCode);
  }
}

async function sendGetImagesRequest(appKey, formId, productId) {
  const scopes = ['productController', 'sendGetImagesRequest'];
  const endpoint = `https://m-baydogan.jotform.dev/intern-api/product/images/${appKey}/${formId}/${productId}`;

  const config = {
    headers: {
      Accept: 'application/json',
    },
  };
  logOutput(scopes, productId);
  try {
    const {data} = await axios.get(endpoint, config);
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

export {
  sendCreateProductRequest,
  sendDeleteProductRequest,
  sendUploadImageRequest,
  sendGetImagesRequest,
  sendGetProductsRequest,
  sendUpdateProductRequest,
};
