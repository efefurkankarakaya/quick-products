import React from 'react';
import {View, FlatList} from 'react-native';

import {CustomItem, CustomRoundedButton} from '../../fields';

import styles from './FormDetail.style';
import {Question, Plus} from '../../assets';

// Get products
import FormDetailsData from '../../mock/product_data';

function FormDetail({navigation, route}) {
  console.log(route);
  navigation.setOptions({
    title: route.params?.formTitle,
  });
  const {content} = FormDetailsData;
  // Create Form Item onPress Handler

  const onCreateProductPress = () => {
    console.log('Create product');
  };

  // Form Item onPress Handler
  const onProductPress = productId => {
    console.log(productId);
  };

  // FlatList Functions
  const renderProduct = ({item: product}) => (
    <CustomItem
      title={product.name}
      subText={product.description}
      onPress={() => onProductPress(product.pid)}
      image={Question}
    />
  );
  const extractKey = (item, _) => item.id;

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={extractKey}
        data={content}
        renderItem={renderProduct}
      />
      <CustomRoundedButton icon={Plus} onPress={onCreateProductPress} />
    </View>
  );
}

export default FormDetail;
