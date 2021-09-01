import axios from 'axios';
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
async function sendCreateProductRequest(appKey, formId) {
  const scopes = ['productController', 'sendCreateProductRequest'];
  // update product -> add item to array
}

async function sendUpdateProductRequest(appKey, formId) {
  const scopes = ['productController', 'sendUpdateProductRequest'];
  const endpoint = `https://m-baydogan.jotform.dev/intern-api/product/${appKey}/${formId}`;

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  // Don't forget to parse Image Array
  const products = await sendGetProductsRequest(appKey, formId);
  const product = {
    cid: '',
    connectedCategories: '[]',
    connectedProducts: '[]',
    corder: '',
    customPrice: '',
    customPriceSource: '0',
    description: '2112421421213',
    fitImageToCanvas: 'Yes',
    hasExpandedOption: '',
    hasQuantity: '',
    hasSpecialPricing: '',
    icon: '',
    images:
      '["https://www.jotform.com/uploads/baydoganmirac/form_files/test1.png","https://www.jotform.com/uploads/baydoganmirac/form_files/Kapak.jpg"]',
    isLowStockAlertEnabled: 'No',
    isStockControlEnabled: 'No',
    lowStockValue: '',
    name: 'YENİ ÜRÜN',
    options: '[]',
    period: 'Monthly',
    pid: '1001',
    price: '123',
    recurringtimes: 'No Limit',
    required: '',
    selected: '',
    setupfee: '',
    showSubtotal: '0',
    stockQuantityAmount: '',
    trial: '',
  };
  products.push(product);
  const productsData = {
    products: convertJSONToQueryString(JSON.stringify(product)),
  };

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

async function sendDeleteProductRequest(appKey, formId) {
  const scopes = ['productController', 'sendDeleteProductRequest'];
  // update product -> remove item from array
}

export {
  sendCreateProductRequest,
  sendDeleteProductRequest,
  sendGetProductsRequest,
  sendUpdateProductRequest,
};
