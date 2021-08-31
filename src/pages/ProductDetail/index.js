import React from 'react';
import {View, Text, Image} from 'react-native';

import {useSelector} from 'react-redux';

import {CustomEditableTextInput, CustomImageList} from '../../components';

import styles from './ProductDetail.style';

function ProductDetail() {
  const parseStringToArray = string => {
    return Array.from(JSON.parse(string));
  };

  // TODO: Store active data with Redux
  // TODO: or add a save button
  const {productName, productDescription, productPrice, productImages} =
    useSelector(({product}) => product);
  const parsedProductImages = parseStringToArray(productImages);

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
      <CustomEditableTextInput label="Name" value={productName} />
      <CustomEditableTextInput label="Description" value={productDescription} />
      <CustomEditableTextInput label="Price" value={productPrice} />
      <Text>{productImages}</Text>
      <CustomImageList
        label="Images"
        keyExtractor={extractKey}
        data={parsedProductImages}
        renderItem={renderImage}
        horizontal={true}
      />
    </View>
  );
}

export default ProductDetail;
