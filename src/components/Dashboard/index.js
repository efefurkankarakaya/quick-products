import React from 'react';
import {View, Text} from 'react-native';
import styles from './Dashboard.style';

function Dashboard() {
  // TODO: memoization?
  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
    </View>
  );
}

export default Dashboard;
