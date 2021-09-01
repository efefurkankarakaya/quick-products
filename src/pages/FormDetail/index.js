import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {updateActiveProduct} from '../../redux/reducers/productReducer';
import {getItem} from '../../utils/databaseHelpers';

import {sendDeleteFormRequest, getProducts} from '../../controllers';

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
  try {
    const {appKey} = await getItem('user');
    console.log('appKey: ' + appKey);
    return await getProducts(appKey, formId);
  } catch (err) {
    console.error(err);
  }
}

async function deleteForm(formId) {
  try {
    const {appKey} = await getItem('user');
    console.log('appKey: ' + appKey);
    return await sendDeleteFormRequest(appKey, formId);
  } catch (err) {
    console.error(err);
  }
}

function FormDetail({navigation}) {
<<<<<<< HEAD
  console.log('RENDER FORM DETAIL');
  // WHY IS THAT CALLED TWICE????????????????????????
  // WHY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // TODO: FIND WHY?!?!?!?!?!????????!!!!!!!
=======
>>>>>>> master
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

  const onDeleteProductPress = () => {
    deleteForm(formId).then(status =>
      console.log(status ? 'Deletion success.' : 'Deletion failed.'),
    );
    navigation.navigate('Quick Forms', {screen: 'Dashboard'});
  };

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
