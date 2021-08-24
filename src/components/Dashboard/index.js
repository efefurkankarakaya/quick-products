import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './Dashboard.style';

import {CustomItem, CustomRoundedButton} from '../../fields';

import LocalFormData from '../../mock/form_data';
import Plus from '../../assets/plus.png';

function Dashboard() {
  const {content} = LocalFormData;
  console.log(content);

  const renderForm = ({item}) => (
    <CustomItem
      title={item.title}
      subText={'Last change: ' + item.updated_at}
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
      <CustomRoundedButton icon={Plus} />
    </View>
  );
}

export default Dashboard;
