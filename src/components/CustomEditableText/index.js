import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import styles from './CustomEditableText.style';
import {
  convertObjectToStyleSheet,
  combineStyles,
} from '../../utils/styleHelpers';

function CustomEditableText({
  dynamicReadOnlyComponentStyle,
  dynamicWriteOnlyComponentStyle,
  ...otherTextInputProps
}) {
  const [editable, setEditable] = useState(false);

  dynamicReadOnlyComponentStyle = convertObjectToStyleSheet(
    dynamicReadOnlyComponentStyle,
  );
  dynamicWriteOnlyComponentStyle = convertObjectToStyleSheet(
    dynamicWriteOnlyComponentStyle,
  );

  const combinedReadOnlyComponentStyles = combineStyles(
    styles.readOnly,
    dynamicReadOnlyComponentStyle,
  );
  const combinedWriteOnlyComponentStyles = combineStyles(
    styles.writeOnly,
    dynamicWriteOnlyComponentStyle,
  );

  const onPress = () => setEditable(!editable);

  let activeComponentStyle = editable
    ? combinedWriteOnlyComponentStyles
    : combinedReadOnlyComponentStyles;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <TextInput
        style={activeComponentStyle}
        editable={editable}
        {...otherTextInputProps}
      />
      {editable && (
        <View style={styles.editOptions}>
          <Text style={styles.tick}>✔</Text>
          <Text style={styles.cross}>✖</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default CustomEditableText;

CustomEditableText.propTypes = {};
