import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 7,
  },
  search: {
    width: '65%',
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 2,
  },
  layout: {
    right: 5,
    
  },
  topContainer: {  
    borderColor: 'rgba(0, 0, 0, 0.25)',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchLabel: {
    display: 'none',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    
  },
  flatList: {
    backgroundColor: 'white',
    paddingBottom:60,
  },
  flatListWrapper: {
    backgroundColor: 'white',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  productCard: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    height:230,
    width: 185,
    top: 10,
  },
  buttonContainer: {
    bottom:0,
    width:'100%',
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    display:'flex',
    height: 55,
    
  },
});
