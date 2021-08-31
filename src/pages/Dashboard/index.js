import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';

import {useDispatch} from 'react-redux';
import {updateActiveForm} from '../../redux/reducers/formReducer';
import {getItem} from '../../utils/databaseHelpers';

import {sendCreateFormRequest, getForms} from '../../controllers/';

import styles from './Dashboard.style';
import {CustomItem, CustomRoundedButton} from '../../components';
import {Plus, Question} from '../../assets';

async function createForm() {
  try {
    const {appKey} = await getItem('user');
    return await sendCreateFormRequest(appKey, 'Müthiş Form');
  } catch (err) {
    console.error(err);
  }
}

async function loadForms() {
  try {
    const {appKey} = await getItem('user');
    return await getForms(appKey);
  } catch (err) {
    console.error(err);
  }
}

function Dashboard({navigation}) {
  const dispatch = useDispatch();

  const [forms, setForms] = useState([]);

  // When the component mounted, load forms
  useEffect(() => {
    // TODO: Add swipe refresh
    loadForms().then(forms => setForms(forms));
  }, []);

  // Create Form Item onPress Handler
  const onCreateFormPress = () => {
    createForm().then(({id: formId, title: formTitle}) => {
      const activeFormData = {
        formId,
        formTitle,
      };
      dispatch(updateActiveForm(activeFormData));
      navigation.navigate('Quick Forms', {
        screen: 'Form Detail',
      });
    });
  };

  // Form Item onPress Handler
  const onFormPress = (formId, formTitle) => {
    console.log(formId, formTitle);
    // TODO: Send formId and formTitle to Redux Store
    const activeFormData = {
      formId,
      formTitle,
    };
    dispatch(updateActiveForm(activeFormData));
    navigation.navigate('Quick Forms', {
      screen: 'Form Detail',
    });
  };

  // FlatList Functions
  const renderForm = ({item: form}) => (
    <CustomItem
      title={form.title}
      subText={'Last change: ' + form.updated_at}
      onPress={() => onFormPress(form.id, form.title)}
      image={Question}
    />
  );
  const extractKey = (item, _) => item.id;

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={extractKey}
        data={forms}
        renderItem={renderForm}
      />
      <CustomRoundedButton icon={Plus} onPress={onCreateFormPress} />
    </View>
  );
}

export default Dashboard;
