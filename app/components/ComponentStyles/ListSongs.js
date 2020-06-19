import {StyleSheet} from 'react-native';
import {device} from '../../config/ScreenDimensions';

export default StyleSheet.create({
  flatList:{
    // paddingTop: device.height*0.01,
    // paddingBottom: device.height*0.01
  },
  container:{
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginBottom: device.height*0.01,
    marginHorizontal: device.width*0.02,
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.6,
    shadowOffset: {
      height: 0.5,
      width: 0.5
    }
  },
  image:{
    width: device.width*0.2, 
    height: device.width*0.2,
    marginVertical: device.width*0.03,
    marginHorizontal: device.width*0.03,
    borderRadius: 5
  },
  songInfoContainer: {
    marginTop: device.width*0.03,
    width: device.width*0.6,
  },
  songNameContainer: {
    
  },
  singerContainer: {
    
  },
  songName: {
    fontSize: device.width*0.05
  },
  singer: {
    color: 'gray'
  },
  dayOffsetContainer: {
    marginHorizontal: device.width*0.02,
    marginBottom: device.width*0.005,
    backgroundColor: '#2962FF',
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  dayOffset: {
    fontSize: device.width*0.05,
    color: '#fff',
    margin: device.width*0.01,
  },
  optionIcon: {
    height: device.width*0.27,
    width: device.width*0.08,
    justifyContent: 'center',
  },
  favoriteIcon: {
    marginTop: device.width*0.01,
    height: device.width*0.08,
    width: device.width*0.08,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});