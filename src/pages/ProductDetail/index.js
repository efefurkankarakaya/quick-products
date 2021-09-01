import React, {useState} from 'react';
import {View, Text, Image, FlatList} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {updateActiveProduct} from '../../redux/reducers/productReducer';

import {launchImageLibrary} from 'react-native-image-picker';

import {
  CustomButton,
  CustomEditableTextInput,
  CustomImageList,
} from '../../components';

import {logOutput, logError} from '../../utils/logHelpers';
import {parseStringToArray} from '../../utils/arrayHelpers';

import styles from './ProductDetail.style';

function ProductDetail() {
  const dispatch = useDispatch();
  // TODO: Store active data with Redux
  // TODO: or add a save button
  const {productName, productDescription, productPrice, productImages} =
    useSelector(({product}) => product);
  const parsedProductImages = parseStringToArray(productImages);

  const [productNameState, setProductNameState] = useState(productName);
  const [productDescriptionState, setProductDescriptionState] =
    useState(productDescription);
  const [productPriceState, setProductPriceState] = useState(productPrice);
  const [productImagesState, setProductImagesState] = useState(productImages);

  const onAddImagePress = () => {
    const options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, ({assets}) => {
      const scope = ['ProdutDetail', 'onAddImagePress', 'launchImageLibrary'];
      const message = 'Image selected';
      logOutput(scope, message);
      logOutput(scope, JSON.stringify(assets));
    });
  };

  const onSavePress = () => {
    const scope = ['ProductDetail', 'onSavePress'];
    dispatch(
      updateActiveProduct({
        productName: productNameState,
        productDescription: productDescriptionState,
        productPrice: productPriceState,
        productImages: productImagesState,
      }),
    );
    const message = 'Saved.';
    logOutput(scope, message);
    // TODO: Call sendUpdateProductRequest
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
        label="Name"
        value={productNameState}
        onChangeText={value => setProductNameState(value)}
      />
      <CustomEditableTextInput
        label="Description"
        value={productDescriptionState}
        onChangeText={value => setProductDescriptionState(value)}
      />
      <CustomEditableTextInput
        label="Price"
        value={productPriceState}
        onChangeText={value => setProductPriceState(value)}
      />
      <Text>{productImages}</Text>
      <CustomImageList
        label="Images"
        keyExtractor={extractKey}
        data={parsedProductImages}
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
