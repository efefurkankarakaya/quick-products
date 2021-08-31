import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, View, Text} from 'react-native';

import styles from './CustomImageList.styles';

function CustomImageList({label, ...otherFlatListProps}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <FlatList style={styles.flatList} {...otherFlatListProps} />
    </View>
  );
}

export default CustomImageList;

CustomImageList.propTypes = {};
