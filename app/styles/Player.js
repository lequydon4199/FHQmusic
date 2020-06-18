import {StyleSheet, StatusBar} from 'react-native';
import {device} from '../config/ScreenDimensions'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6bb5ff',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      },
      header: {
        flexDirection: 'row'
      },
      downButton: {
        marginTop: device.height * 0.01,
        marginLeft: device.width * 0.02,
        color: '#2e2d2b'
      },
      song: {
        marginTop: device.height * 0.012,
        marginLeft: device.width * 0.02,
        fontSize: device.height * 0.024,
        color: '#2e2d2b'
      },
      singer: {
        marginLeft: device.width * 0.103,
      },
      nameSinger: {
        color: '#2e2d2b',
        fontSize: device.height * 0.02
      }, 
      image: {
        marginTop: device.height * 0.08,
        marginLeft: device.width * 0.13
      },
      imageSong: {
        alignContent: 'center',
        height: device.width * 0.74,
        width: device.width * 0.74,
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5
      },
      taskBar: {
        marginTop: device.height * 0.03,
        flexDirection: 'row',
      },
      slider: {
        marginHorizontal: device.width * 0.08,
        marginVertical: device.height * 0.05
      },
      track: {
        height: device.height * 0.004,
      },
      favorite: {
        marginLeft: device.width * 0.26,
        color: '#2e2d2b',
      },
      download: {
        color: '#2e2d2b',
        marginLeft: device.width * 0.13,
      },
      list: {
        marginLeft: device.width * 0.13,
        color: '#2e2d2b',
      },
      control: {
        flexDirection: 'row',
      },
      random: {
        marginTop: device.height * 0.005,
        marginLeft: device.width * 0.075,
        color: '#2e2d2b',
      },
      backward: {
        marginLeft: device.width * 0.1,
        color: '#2e2d2b',
      },
      pause: {
        marginTop: - device.height * 0.018,
        marginLeft: device.width * 0.1,
        color: '#2e2d2b',
      },
      forward: {
        marginLeft: device.width * 0.1,
        color: '#2e2d2b',
      },
      repeat: {
        marginTop: device.height * 0.004,
        marginLeft: device.width * 0.1,
        color: '#2e2d2b',
      },
      commentContainer: {
        marginHorizontal: device.width * 0.02,
        marginTop: device.height * 0.03,
        backgroundColor: '#f4ece9',
        height: device.height * 0.2
      },
      comment: {
        marginLeft: device.width * 0.035,
        fontSize: device.height * 0.03
      }
});