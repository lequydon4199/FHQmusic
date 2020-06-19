import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, StatusBar, TextInput, SafeAreaView, Keyboard, TouchableOpacity, AsyncStorage } from 'react-native';
import { CheckBox } from "react-native-elements";
import { setUser } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Login extends Component {
	state = {
		isLogging: false,
		isChecked : false,
		isWrong: false,
		username: '',
		password: ''
	};
	setSelection = (value)=> {
		// console.log(value)
		this.setState({isChecked: !value})
	} 

	login = async () => {
		if (this.state.username !== '' && this.state.password !== ''){
			this.setState({isLogging: true, isWrong: false});
			const response = await fetch(`https://toeic-test-server.herokuapp.com/music/user/login`,{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({username: this.state.username, password: this.state.password})
			});
			const data = await response.json();
			if (!data){
				this.setState({isLogging: false, isWrong: true});
			} else {
				await AsyncStorage.setItem('user', data._id);
				this.props.setUser(data);
				this.props.navigation.navigate("TabNavigator");
			}
		}
	}
	
	render() {
		const {navigate} = this.props.navigation;
		return (
			<SafeAreaView style={styles.container}>
				<StatusBar barStyle="default" translucent/>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.container}>
						<View style={styles.top}>
							<Text style={styles.title}>FHQ Music</Text>
							<Text style={{color: "white"}}>Free and High Quality</Text>
						</View>
						<View style={styles.mid}>
							{this.state.isWrong? <Text style={{fontSize: 15, color: 'red'}}>Tài khoản hoặc mật khẩu không đúng</Text> : null}
							<View style={styles.infoContainer}>
								<TextInput 
									style={styles.input}
									placeholder="Tên đăng nhập"
									placeholderTextColor='rgba(0,0,0,0.8)'
									textContentType='emailAddress'
									keyboardType='email-address'
									returnKeyType='next'
									onChangeText={text => this.setState({username: text})}
									onSubmitEditing={()=> this.refs.txtPassword.focus()}>
								</TextInput>
							</View>

							<View style={styles.infoContainer}>
								<TextInput 
									style={styles.input}
									placeholder="Mật khẩu"
									placeholderTextColor='rgba(0,0,0,0.8)'
									returnKeyType='go'
									onChangeText={text => this.setState({password: text})}
									secureTextEntry={true}
									ref={"txtPassword"}>
								</TextInput>
							</View>

							<View style={styles.checkboxContainer}>
								<CheckBox
									checked={this.state.isChecked}
									onPress={() => this.setSelection(this.state.isChecked)}
          							checkedColor="white"
								/>
								<Text style={styles.label}>Nhớ tài khoản ?</Text>
							</View>

							<TouchableOpacity disabled={this.state.isLogging} style={styles.buttonContainer} onPress={() => this.login()}>
								<Text style={styles.buttonText}>{this.state.isLogging ? "Xin chờ" : "Đăng Nhập"}</Text>
							</TouchableOpacity>
							

						</View>

						<TouchableOpacity style={styles.bot} onPress={()=> navigate('Register')}>
							<Text style={styles.textbot}>Chưa có tài khoản? Đăng ký tại đây</Text>
						</TouchableOpacity>
						

					</View>

				</TouchableWithoutFeedback>
			</SafeAreaView>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	setUser: bindActionCreators(setUser, dispatch)
  });
  
  export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: '#4899ea'		
	},
	top: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',

	},
	mid: {
		flex: 5,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	bot: {
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	title: {
		color: 'white',
		fontSize: 36,
		textAlign: 'center',
		paddingTop: 110,
	}, 
	infoContainer: {
		paddingHorizontal: 10,
		borderRadius: 10,
		marginTop: 20,
		backgroundColor: 'white'//a = alpha = opacity
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
	buttonText: {
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontSize: 18,
	},
	checkboxContainer: {
		flexDirection: "row",
		alignItems: 'center',
		marginRight: 160,
	},
	checkbox: {
		alignSelf: "center",
		marginLeft: -15,
	},
	label: {
		color: "white",
		marginLeft: -15,
	},
	textbot: {
		color: "white",
		marginTop: 65,
	}

	
});