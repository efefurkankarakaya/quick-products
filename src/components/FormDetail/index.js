import React from 'react';
import {View, FlatList} from 'react-native';

import {
  CustomItem,
  CustomRoundedButton,
  CustomEditableText,
} from '../../fields';

import styles from './FormDetail.style';
import {Question, Plus} from '../../assets';

// Get products
import FormDetailsData from '../../mock/product_data';

function FormDetail({navigation, route}) {
  // Set header title as shown form title
  navigation.setOptions({
    title: route.params?.formTitle,
  });

  const {content} = FormDetailsData;

  // Create Product onPress Handler
  const onCreateProductPress = () => {
    console.log('Create product');
  };

  // Product onPress Handler
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
  const extractKey = (item, _) => item.pid;

  return (
    // TODO: Add editable title
    // TODO: Add editable description
    // TODO: Navigate product details page
    // TODO: Add product creation
    // TODO: Add product deletion
    <View style={styles.container}>
      <CustomEditableText value="Freelance" />
      <CustomEditableText value="Lorem ipsum dolor sit amet." />
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
