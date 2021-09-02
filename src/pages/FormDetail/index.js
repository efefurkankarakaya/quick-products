import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {updateActiveProduct} from '../../redux/reducers/productReducer';
import {getItem} from '../../utils/databaseHelpers';

import {useIsFocused} from '@react-navigation/native';

import {
  sendCreateProductRequest,
  sendDeleteFormRequest,
  sendGetProductsRequest,
} from '../../controllers';

import {logError, logOutput} from '../../utils/logHelpers';

import {
  CustomCard,
  CustomEditableTextInput,
  CustomImage,
  CustomProduct,
  CustomRoundedButton,
} from '../../components';

import {parseStringToArray} from '../../utils/arrayHelpers';

import styles from './FormDetail.style';
import {Something, AddButton, TrashBox} from '../../assets';

// Load products
async function loadProducts(formId) {
  const scopes = ['FormDetail', 'loadProducts'];
  try {
    const {appKey} = await getItem('user');
    logOutput(['FormDetail', 'loadProducts'], `appKey: ${appKey}`);
    return await sendGetProductsRequest(appKey, formId);
  } catch (err) {
    logError(scopes, err.message);
  }
}

async function deleteForm(formId) {
  const scopes = ['FormDetail', 'deleteForm'];
  try {
    const {appKey} = await getItem('user');
    logOutput(scopes, `appKey: ${appKey}`);
    return await sendDeleteFormRequest(appKey, formId);
  } catch (err) {
    logError(scopes, err.message);
  }
}

function FormDetail({navigation}) {
  const dispatch = useDispatch();

  // Get formId for load products.
  // Get formTitle for set header title.
  const {formId, formTitle} = useSelector(({form}) => form);
  const [products, setProducts] = useState([]); // Products Array

  logOutput(['FormDetail'], formId, formTitle);
  // Load products when component is mounted.
  useEffect(() => {
    // TODO: Warning: Can't perform a React state update on an unmounted component.
    // This is a no-op, but it indicates a memory leak in your application.
    // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

    // Set header title as shown form title.
    navigation.setOptions({
      title: formTitle,
    });

    // Set products when is loaded.
    loadProducts(formId).then(products => {
      setProducts(products);
    });
  }, [useIsFocused()]);

  const onDeleteProductPress = () => {
    deleteForm(formId).then(status => {
      const output = status ? 'Deletion success.' : 'Deletion failed.';
      logOutput(
        ['FormDetail', 'onDeleteProductPress()', 'deleteForm(formId)'],
        output,
      );
    });
    navigation.navigate('Quick Forms', {screen: 'Dashboard'});
  };

  // Create Product onPress Handler
  const onCreateProductPress = () => {
    const scopes = ['FormDetail', 'onCreateProductPress'];
    const activeProductData = {
      productId: (products ? products.length : 0) - 1000,
      productName: '',
      productDescription: '',
      productPrice: 0,
      productImages: '[]',
    };
    dispatch(updateActiveProduct(activeProductData));
    navigation.navigate('Quick Forms', {screen: 'Product Detail'});
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
  const renderProduct = ({item: product}) => {
    const parsedProductImages = parseStringToArray(product.images);
    return (
      <CustomCard
        dynamicStyle={styles.productCard}
        source={parsedProductImages[0]}
        title={product.name}
        description={product.description}
        onPress={() => onProductPress(product)}
      />
    );
  };
  const extractKey = (item, _) => item.pid;

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <CustomEditableTextInput
          dynamicStyle={styles.search}
          dynamicLabelStyle={styles.searchLabel}
          placeholder="Search"
        />
        <CustomImage dynamicStyle={styles.layout} source={Something} />
      </View>
      <FlatList
        numColumns={2}
        style={styles.flatList}
        columnWrapperStyle={styles.flatListWrapper}
        keyExtractor={extractKey}
        data={products}
        renderItem={renderProduct}
      />
      <View style={styles.buttonContainer}>
        <CustomRoundedButton icon={TrashBox} onPress={onDeleteProductPress} />
        <CustomRoundedButton icon={AddButton} onPress={onCreateProductPress} />
      </View>
    </View>
  );
}

export default FormDetail;
