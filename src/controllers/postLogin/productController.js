import axios from 'axios';

const endpoint = 'https://api.jotform.com/user/product';

// JSDocs
async function getProducts(appKey, formId) {
  const config = {
    headers: {
      apiKey: appKey,
      formId: formId,
    },
  };

  const {data} = await axios.get(endpoint, config);
  console.log(data);
}
