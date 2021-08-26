import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './Dashboard.style';

import {CustomItem, CustomRoundedButton} from '../../fields';

import LocalFormData from '../../mock/form_data';
import Add from '../../assets/add.png';
import Doc from '../../assets/doc.png';


function Dashboard() {
  const {content} = LocalFormData;

  // Create Form Item onPress Handler
  const onCreateFormPress = () => {
    console.log('Create form');
  };

  // Form Item onPress Handler
  const onListItemPress = data => {
    const {id} = data;
    console.log(id);
  };

  // FlatList Functions
  const renderForm = ({item}) => (
    <CustomItem
      title={item.title}
      subText={'Last change: ' + item.updated_at}
      onPress={() => onListItemPress(item)}
      image={Doc}
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
      <CustomRoundedButton icon={Add} onPress={onCreateFormPress} />
    </View>
  );
}

export default Dashboard;
