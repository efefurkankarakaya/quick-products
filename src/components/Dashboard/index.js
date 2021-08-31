import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';

import {useDispatch} from 'react-redux';
import {updateActiveForm} from '../../redux/reducers/formReducer';
import {getItem} from '../../utils/databaseHelpers';

import {getForms} from '../../controllers/';

import styles from './Dashboard.style';
import {CustomItem, CustomRoundedButton} from '../../fields';
import {Plus, Question} from '../../assets';

async function loadForms() {
  try {
    const {appKey} = await getItem('user');
    return await getForms(appKey);
  } catch (err) {
    console.log(err);
  }
}

function Dashboard({navigation}) {
  const dispatch = useDispatch();

  const [forms, setForms] = useState([]);

  // When the component mounted, load forms
  useEffect(() => {
    // Check every second if there are new forms or changes
    // setInterval(() => {
    //   loadForms().then(forms => setForms(forms));
    // }, 1000);

    // TODO: Add swipe refresh
    loadForms().then(forms => setForms(forms));
  }, []);

  // Create Form Item onPress Handler
  const onCreateFormPress = () => {
    console.log('Create form');
    // TODO: Create Form Function
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
