import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {updateActiveProduct} from '../../redux/reducers/productReducer';
import {getItem} from '../../utils/databaseHelpers';

import {getProducts} from '../../controllers';

import {
  CustomItem,
  CustomRoundedButton,
  CustomEditableText,
  CustomEditableTextInput,
} from '../../components';

import styles from './FormDetail.style';
import {Question, Plus} from '../../assets';

// Get products
import FormDetailsData from '../../mock/product_data';

// Load products
async function loadProducts(formId) {
  try {
    const {appKey} = await getItem('user');
    console.log('appKey: ' + appKey);
    return await getProducts(appKey, formId);
  } catch (err) {
    console.error(err);
  }
}

function FormDetail({navigation}) {
  const dispatch = useDispatch();

  // Get formId for load products.
  // Get formTitle for set header title.
  const {formId, formTitle} = useSelector(({form}) => form);
  const [products, setProducts] = useState([]); // Products Array

  console.log(formId, formTitle);
  // Load products when component is mounted.
  useEffect(() => {
    // Set header title as shown form title.
    navigation.setOptions({
      title: formTitle,
    });

    // Set products when is loaded.
    loadProducts(formId).then(products => {
      setProducts(products);
    });
  }, []);

  // Create Product onPress Handler
  const onCreateProductPress = () => {
    console.log('Create product');
    // TODO: Create Product Function
  };

  // Product onPress Handler
  const onProductPress = product => {
    const activeProductData = {
      productId: product.pid,
      productName: product.name,
      productDescription: product.description,
      productPrice: product.price,
      productImages: product.images,
    };
    dispatch(updateActiveProduct(activeProductData));
    navigation.navigate('Quick Forms', {
      screen: 'Product Detail',
    });
  };

  // FlatList Functions
  const renderProduct = ({item: product}) => (
    <CustomItem
      title={product.name}
      subText={product.description}
      onPress={() => onProductPress(product)}
      image={Question}
    />
  );
  const extractKey = (item, _) => item.pid;

  return (
    <View style={styles.container}>
      <CustomEditableTextInput label="Search" />
      <CustomEditableText value="Freelance" />
      <CustomEditableText value="Lorem ipsum dolor sit amet." />
      <FlatList
        keyExtractor={extractKey}
        data={products}
        renderItem={renderProduct}
      />
      <CustomRoundedButton icon={Plus} onPress={onCreateProductPress} />
    </View>
  );
}

export default FormDetail;
