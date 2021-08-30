import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './Dashboard.style';

import {getForms} from '../../controllers/';
import {getItem} from '../../utils/databaseHelpers';

async function loadForms() {
  try {
    const {appKey} = await getItem('user');
    return await getForms(appKey);
  } catch (err) {
    console.log(err);
  }
}

import {CustomItem, CustomRoundedButton} from '../../fields';

import Plus from '../../assets/plus.png';
import QuestionMark from '../../assets/question.jpg';

function Dashboard({navigation}) {
  const [forms, setForms] = useState([]);
  useEffect(() => {
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
    navigation.navigate('Quick Forms', {
      screen: 'Form Detail',
      params: {
        formTitle,
      },
    });
  };

  // FlatList Functions
  const renderForm = ({item: form}) => (
    <CustomItem
      title={form.title}
      subText={'Last change: ' + form.updated_at}
      onPress={() => onFormPress(form.id, form.title)}
      image={QuestionMark}
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
