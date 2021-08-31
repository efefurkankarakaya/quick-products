var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
  products:
    '{"cid":"","connectedCategories":"[]","connectedProducts":"[]","corder":"","customPrice":"","customPriceSource":"0","description":"1251231234","fitImageToCanvas":"Yes","hasExpandedOption":"","hasQuantity":"","hasSpecialPricing":"","icon":"","images":"[\\"https://jotform.com/images/security_certificate_seal_comodo.png\\",\\"https://m-baydogan.jotform.dev/intern-api/image/baydoganmirac-1950-Kapak.jpg\\"]","isLowStockAlertEnabled":"No","isStockControlEnabled":"No","lowStockValue":"","name":"HAYDAAA","options":"[]","period":"Monthly","pid":"1000","price":"123","recurringtimes":"No Limit","required":"","setupfee":"","showSubtotal":"0","stockQuantityAmount":"","trial":""},{"cid":"","connectedCategories":"[]","connectedProducts":"[]","corder":"","customPrice":"","customPriceSource":"0","description":"2112421421213","fitImageToCanvas":"Yes","hasExpandedOption":"","hasQuantity":"","hasSpecialPricing":"","icon":"","images":"[\\"https://www.jotform.com/uploads/baydoganmirac/form_files/test1.png\\",\\"https://www.jotform.com/uploads/baydoganmirac/form_files/Kapak.jpg\\"]","isLowStockAlertEnabled":"No","isStockControlEnabled":"No","lowStockValue":"","name":"SADASDASDASD","options":"[]","period":"Monthly","pid":"1001","price":"123","recurringtimes":"No Limit","required":"","selected":"","setupfee":"","showSubtotal":"0","stockQuantityAmount":"","trial":""},{"description":"\'TEST DENEME33\'","icon":"","images":"[\\"http://45.143.97.29/plesk-site-preview/mumigiyim.com/https/45.143.97.29/40/us-polo-assn-kisa-kollu-yuvarlak-yaka-siyah-t-shirt.jpg\\"]","name":"\'TEST1\'","pid":1002,"price":"100","cid":"","connectedCategories":"[]","connectedProducts":"[]","corder":"","customPrice":"","customPriceSource":"0","fitImageToCanvas":"Yes","hasExpandedOption":"","hasQuantity":"","hasSpecialPricing":"","isLowStockAlertEnabled":"No","isStockControlEnabled":"No","lowStockValue":"","options":"[]","period":"Monthly","recurringtimes":"No Limit","required":"","selected":"","setupfee":"","showSubtotal":"0","stockQuantityAmount":"","trial":""},{"description":"\'TEST DENEME2\'","icon":"","images":"[\\"http://45.143.97.29/plesk-site-preview/mumigiyim.com/https/45.143.97.29/37/us-polo-assn-kisa-kollu-yuvarlak-yaka-lacivert-t-shirt.jpg\\"]","name":"\'TEST2\'","pid":1003,"price":"245","cid":"","connectedCategories":"[]","connectedProducts":"[]","corder":"","customPrice":"","customPriceSource":"0","fitImageToCanvas":"Yes","hasExpandedOption":"","hasQuantity":"","hasSpecialPricing":"","isLowStockAlertEnabled":"No","isStockControlEnabled":"No","lowStockValue":"","options":"[]","period":"Monthly","recurringtimes":"No Limit","required":"","selected":"","setupfee":"","showSubtotal":"0","stockQuantityAmount":"","trial":""}',
});
var config = {
  method: 'post',
  url: 'https://m-baydogan.jotform.dev/intern-api/updateproduct/ae1b2cc514e1eea503a85857f16123cf/212071704833045',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
