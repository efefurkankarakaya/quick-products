import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  readOnly: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  writeOnly: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    flex: 1,
  },
  editOptions: {
    flexDirection: 'row',
  },
  tick: {
    backgroundColor: 'lightblue',
    fontSize: 40,
  },
  cross: {
    backgroundColor: 'red',
    fontSize: 40,
  },
});
