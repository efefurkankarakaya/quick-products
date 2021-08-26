import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './Dashboard.style';

import {CustomItem, CustomRoundedButton} from '../../fields';

import LocalFormData from '../../mock/form_data';
import Plus from '../../assets/plus.png';
import QuestionMark from '../../assets/question.jpg';

function Dashboard({navigation}) {
  const {content} = LocalFormData;

  // Create Form Item onPress Handler
  const onCreateFormPress = () => {
    console.log('Create form');
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

  // TODO: memoization?
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={extractKey}
        data={content}
        renderItem={renderForm}
      />
      <CustomRoundedButton icon={Plus} onPress={onCreateFormPress} />
    </View>
  );
}

export default Dashboard;
