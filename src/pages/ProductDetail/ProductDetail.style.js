import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  wrapper: {
    margin: 20,
  },
  image: {
    alignItems: 'stretch',
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 121,
    height: 125,
  },
  dark: {
    borderColor: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
  },
  descriptionHeight: {
    borderColor: 'rgba(0, 0, 0, 0.5)',
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonContainer: {
    marginTop: 30,
  },
  marginForEveryOne: {
    marginBottom: 10,
  },
});
