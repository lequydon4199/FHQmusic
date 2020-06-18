import {StyleSheet} from 'react-native';
import {device} from '../config/ScreenDimensions'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#eeeeee' 
  },
  scrollView: {
    backgroundColor: '#E0E0E0'
  },
  suggestArea: {
    // marginTop: device.height*0.01,
    height: device.height*0.38,
    width: device.width,
    backgroundColor: 'white'
  },
  suggestPicture: {
    height: device.height*0.32,
    width: device.width,
  },
  suggestText: {
    height: 0,
    width: 0,
  },
  singerPictureStyle: {
    height: device.height*0.13,
    width: device.height*0.13,
    borderRadius: device.height*0.13*0.5
  },
  singerStyle: {
    marginLeft: (device.width-device.height*0.15*3)/4
  },
  suggestStyle: {
   marginLeft: 0 
  },
  song: {
    backgroundColor: 'white',
  },
  titleText:{
    height: device.height*0.04,
    fontSize: device.height*0.03,
    marginLeft: device.width*0.02,
    fontWeight: 'bold'
  },
  songContainer:{
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  songImage:{
    width: device.width*0.2, 
    height: device.width*0.2,
    marginVertical: device.width*0.03,
    marginHorizontal: device.width*0.03,
    borderRadius: 5
  },
  songInfoContainer: {
    marginTop: device.width*0.045,
    width: device.width*0.6,
  },
  songName: {
    fontSize: device.width*0.05
  },
  singer: {
    color: 'gray'
  },
  optionIcon: {
    marginLeft: device.width*0.05,
    height: device.width*0.27,
    width: device.width*0.08,
    justifyContent: 'center',
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});