import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {updateActiveProduct} from '../../redux/reducers/productReducer';

import {launchImageLibrary} from 'react-native-image-picker';

import {getItem} from '../../utils/databaseHelpers';

import {
  CustomButton,
  CustomEditableTextInput,
  CustomImageList,
} from '../../components';

import {logOutput, logError} from '../../utils/logHelpers';
import {parseStringToArray} from '../../utils/arrayHelpers';

import styles from './ProductDetail.style';
import {
  sendCreateProductRequest,
  sendGetImagesRequest,
  sendUpdateProductRequest,
  sendUploadImageRequest,
} from '../../controllers';

async function createProduct(formId, product) {
  const scopes = ['ProductDetail', 'createProduct'];
  try {
    const {appKey} = await getItem('user');
    logOutput(scopes, `appKey: ${appKey}`);
    return await sendCreateProductRequest(appKey, formId, product);
  } catch (err) {
    logError(scopes, err.message);
  }
}

async function updateProduct(formId, product) {
  const scopes = ['ProductDetail', 'updateProduct'];
  try {
    const {appKey} = await getItem('user');
    logOutput(scopes, `appKey: ${appKey}`);
    return await sendUpdateProductRequest(appKey, formId, product);
  } catch (err) {
    logError(scopes, err.message);
  }
}

async function uploadImage(formId, productId, imageURI) {
  const scopes = ['ProductDetail', 'uploadImage'];
  try {
    const {appKey} = await getItem('user');
    logOutput(scopes, `appKey: ${appKey}`);
    return await sendUploadImageRequest(appKey, formId, productId, imageURI);
  } catch (err) {
    logError(scopes, err.message);
  }
}

async function loadImages(formId, productId) {
  const scopes = ['ProductDetail', 'loadImages'];
  try {
    const {appKey} = await getItem('user');
    logOutput(scopes, `appKey: ${appKey}`);
    return await sendGetImagesRequest(appKey, formId, productId);
  } catch (err) {
    logError(scopes, err.message);
  }
}

function ProductDetail() {
  const dispatch = useDispatch();
  const {formId} = useSelector(({form}) => form);
  const {
    productId,
    productName,
    productDescription,
    productPrice,
    productImages,
  } = useSelector(({product}) => product);
  // const parsedProductImages = parseStringToArray(productImages);

  const [productNameState, setProductNameState] = useState(productName);
  const [productDescriptionState, setProductDescriptionState] =
    useState(productDescription);
  const [productPriceState, setProductPriceState] = useState(productPrice);
  const [productImagesState, setProductImagesState] = useState(productImages);
  // console.log(productImages, parsedProductImages, productImagesState);

  const [isUploaded, setIsUploaded] = useState(false);
  useEffect(() => {
    // const isProductDoesNotExist = productId < 0 ? true : false;
    // const _productId = isProductDoesNotExist
    //   ? productId + 1000 + 1000
    //   : productId;
    loadImages(formId, productId).then(images => {
      console.log('LOADED');
      console.log('Images: ' + images);
      setProductImagesState(images);
    });
    setIsUploaded(false);
  }, [isUploaded]);

  const onAddImagePress = () => {
    const options = {
      mediaType: 'photo',
      noData: true,
    };
    launchImageLibrary(options, res => {
      const scope = ['ProdutDetail', 'onAddImagePress', 'launchImageLibrary'];
      if (res.didCancel) {
        logOutput(scope, 'Image not selected.');
        return;
      }
      const message = 'Image selected';
      // const {uri} = assets;
      // logOutput(scope, message);
      // logOutput(scope, JSON.stringify(assets));
      logOutput(scope, JSON.stringify(res));
      logOutput(scope, productId);
      // const _productId = productId < 1000 ? productId + 1000 + 1000 : productId;
      uploadImage(formId, productId, res)
        .then(() => setIsUploaded(true))
        .catch(() => setIsUploaded(false));
    });
  };

  const onSavePress = () => {
    const scope = ['ProductDetail', 'onSavePress'];
    const product = {
      pid: productId,
      name: productNameState,
      description: productDescriptionState,
      price: productPriceState,
      images: JSON.stringify(productImagesState),
    };
    console.log('PRODUCT IMAGES:' + product.images);
    console.log('PRODUCT ID: ' + product.pid);
    logOutput(scope, productId);
    // if (productId < 0) {
    //   createProduct(formId, product).then(res => {
    //     logOutput(scope, JSON.stringify(res));
    //   });
    // } else {
    //   product.pid = productId;
    updateProduct(formId, product).then(res => {
      logOutput(scope, JSON.stringify(res));
    });
    // }
    console.log('Product ID: ' + productId + '; PID:' + product.pid);
    dispatch(
      updateActiveProduct({
        productId: product.pid,
        productName: productNameState,
        productDescription: productDescriptionState,
        productPrice: productPriceState,
        productImages: productImagesState,
      }),
    );
    const message = 'Saved.';
    logOutput(scope, message);
  };

  const renderImage = ({item, index}) => (
    <Image
      style={styles.image}
      source={{
        uri: item,
      }}
    />
  );
  const extractKey = (_, index) => index;

  return (
    <View style={styles.container}>
      <CustomEditableTextInput
        style={styles.dark}
        label="Name"
        value={productNameState}
        onChangeText={value => setProductNameState(value)}
      />
      <CustomEditableTextInput
        style={(styles.dark, styles.descriptionHeight)}
        textAlignVertical="top"
        label="Description"
        value={productDescriptionState}
        onChangeText={value => setProductDescriptionState(value)}
      />
      <CustomEditableTextInput
        style={styles.dark}
        label="Price"
        value={productPriceState}
        onChangeText={value => setProductPriceState(value)}
      />
      <CustomImageList
        label="Images"
        keyExtractor={extractKey}
        data={productImagesState}
        renderItem={renderImage}
        horizontal={true}
        numberOfLines={2}
      />
      <View style={styles.buttonContainer}>
        <CustomButton
          dynamicStyle={styles.addImage}
          label="ADD IMAGE"
          onPress={onAddImagePress}
        />
        <CustomButton
          dynamicStyle={styles.save}
          label="SAVE"
          onPress={onSavePress}
        />
      </View>
    </View>
  );
}

export default ProductDetail;
