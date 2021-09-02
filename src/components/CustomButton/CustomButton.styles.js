import {StyleSheet} from 'react-native';

// Custom Button
export default StyleSheet.create({
  container: {
    borderRadius: 0,
    height: 50,
    width: 280,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A1551',
    marginBottom: 30,
    
  },
  label: {
    fontSize: 14,
    color: 'white',
    textTransform: 'uppercase',
  },
  transparentButton: {
    backgroundColor: 'transparent',
  },
});
