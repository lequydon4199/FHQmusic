import {StyleSheet} from 'react-native';
import {device} from '../../config/ScreenDimensions'

export default StyleSheet.create({
  itemArea: {
    paddingTop: 5,
    height: device.height*0.22,
    width: device.width,
    backgroundColor: 'white',
    borderBottomWidth: 0.3,
    borderColor: 'gray'
  },
  titleText:{
    height: device.height*0.04,
    fontSize: device.height*0.03,
    marginLeft: device.width*0.02,
    fontWeight: 'bold'
  },
  item:{
    marginLeft: device.width*0.04
  },
  itemPicture: {
    height: device.height*0.12,
    width: device.width*0.28,
    alignSelf: 'center',
    borderRadius: 5
  },
  itemName: {
    paddingTop: 3,
    alignSelf: 'center'
  }
});