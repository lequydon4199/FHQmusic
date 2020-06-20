import React, { Component } from 'react'
import { Text, View,StatusBar,StyleSheet, FlatList, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {device} from '../config/ScreenDimensions'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const list = [
  {
    name: 'Bé Định',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Hay quá'
  },
  {
    name: 'A Đôn',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Dương quá',
  },
]
export default class Comments extends Component {
  constructor(props){
    super(props);
  }
  state = {
    contacts: "",
  }
  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
  <ListItem
    title={item.name}
    titleStyle = {{fontSize:15, fontWeight: "bold"}}
    subtitle={item.subtitle}
    leftAvatar={{ source: { uri: item.avatar_url} }}
  />
)
_goBack = () => {
  this.props.navigation.goBack();
}

render () {
  return (
    <SafeAreaView style={styles.container}>
				<StatusBar barStyle="default" translucent/>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.container}>
            <View style={styles.top}>
              <TouchableOpacity onPress={() => this._goBack()} style={{flexDirection: 'row'}}>
                <MaterialIcons name="arrow-back"style={styles.back} size={device.height * 0.038}></MaterialIcons>
                <Text style={{fontSize: 18}}> {'   '}Bình luận</Text>
              </TouchableOpacity> 
            </View>
						<View style={styles.mid}>
							<View style={styles.comments}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={list}
                  renderItem={this.renderItem}
                />
							</View>
						</View>

						<View style={styles.infoContainer}>
								<TextInput 
									style={styles.input}
									placeholder="Enter your comment"
									placeholderTextColor='rgba(0,0,0,0.8)'
									>
								</TextInput>
                <TouchableOpacity onPress = {() => this}>
                <Ionicons style={styles.downButton} name="ios-send" size={35}></Ionicons>
                </TouchableOpacity>
							</View>
					</View>

				</TouchableWithoutFeedback>
			</SafeAreaView>
   )
  }
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
	},
	top: {
		flex: 1,
		flexDirection: 'column',

	},
	mid: {
		flex: 6,
		flexDirection: 'column',
	},
	bot: {
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	infoContainer: {
		paddingHorizontal: 10,
    borderRadius: 10,
		marginTop: 20,
    backgroundColor: '#d9d9d9',
    flexDirection: 'row',
	},
	input: {
		width: 280,
		height: 45,
	},
	buttonContainer: { 
		backgroundColor: 'rgb(221,97,97)',
		width: 120,
		height: 45,
		borderRadius:6,
		justifyContent:'center',
		alignItems: 'center',
		marginTop: 35,

	},

  header: {
    flexDirection: 'row'
  },
  comments: {
    marginTop: -50
  },
  downButton: {
    marginTop: device.height * 0.01,
        marginLeft: device.width * 0.2,
        color: '#2e2d2b'
  },
  backButton: {
    marginTop: device.height * 0.01,
    marginLeft: device.width * 0.02,
    color: '#2e2d2b'
  },
	
});
