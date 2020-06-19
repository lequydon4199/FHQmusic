import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, Image, 
	TouchableWithoutFeedback, StatusBar,
	TextInput, SafeAreaView, Keyboard, TouchableOpacity,
	KeyboardAvoidingView, Item, Platform, CheckBox } from 'react-native'


export default class Register extends Component {
	state = {
		username: '',
		password: '',
		isRegistering: false,
		confirmedPassword: '',
		isConfirmedPassword: true,
		isAvailable: true
	}

	register = async () => {
		if (this.state.password !== this.state.confirmedPassword){
			this.setState({isConfirmedPassword: false, isAvailable: true});
			return;
		} else {
			this.setState({isConfirmedPassword: true, isAvailable: true});
		}
		if (this.state.username !== '' && this.state.password !== ''){
			this.setState({isRegistering: true});
			const response = await fetch(`https://toeic-test-server.herokuapp.com/music/user/register`,{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({username: this.state.username, password: this.state.password})
			});
			const data = await response.json();
			if (!data){
				this.setState({isRegistering: false, isAvailable: false})
			} else {
				this.props.navigation.navigate("Login");
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
                            <View style={{paddingBottom: 5}}>
                                <Text style={styles.buttonText}>Đăng ký tài khoản</Text>
                            </View>
							{this.state.isAvailable? null : <Text style={{fontSize: 15, color: 'red'}}>Tài khoản đã được sử dụng</Text>}
							{this.state.isConfirmedPassword? null : <Text style={{fontSize: 15, color: 'red'}}>Mật khẩu phải trùng nhau</Text>}
							<View style={styles.infoContainer}>
								<TextInput 
									style={styles.input}
									placeholder="Tên đăng nhập"
									placeholderTextColor='rgba(0,0,0,0.8)'
									textContentType='emailAddress'
									keyboardType='email-address'
									onChangeText={text => this.setState({username: text})}
									returnKeyType='next'
									onSubmitEditing={()=> this.refs.txtPassword.focus()}>
								</TextInput>
							</View>

							<View style={styles.infoContainer}>
								<TextInput 
									style={styles.input}
									placeholder="Mật khẩu"
									placeholderTextColor='rgba(0,0,0,0.8)'
									returnKeyType='next'
									secureTextEntry={true}
									ref={"txtPassword"}
									onChangeText={text => this.setState({password: text})}
                                    onSubmitEditing={()=> this.refs.txtPasswordAgain.focus()}>
								</TextInput>
							</View>

                            <View style={styles.infoContainer}>
								<TextInput 
									style={styles.input}
									placeholder="Nhập lại mật khẩu"
									placeholderTextColor='rgba(0,0,0,0.8)'
									onChangeText={text => this.setState({confirmedPassword: text})}
									returnKeyType='go'
									secureTextEntry={true}
									ref={"txtPasswordAgain"}>
								</TextInput>
							</View>

							<TouchableOpacity disabled={this.state.isRegistering} style={styles.buttonContainer} onPress={() => this.register()}>
								<Text style={styles.buttonText}>{this.state.isRegistering ? "Xin chờ" : "Đăng ký"}</Text>
							</TouchableOpacity>
							
						</View>

						<TouchableOpacity style={styles.bot} onPress={()=> navigate('Login')}>
							<Text style={styles.textbot}>Đã có tài khoản? Đăng nhập tại đây</Text>
						</TouchableOpacity>

					</View>

				</TouchableWithoutFeedback>
			</SafeAreaView>
		)
	}
}
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
		paddingTop: 80,
	}, 
	infoContainer: {
		paddingHorizontal: 10,
		borderRadius: 10,
		marginTop: 10,
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
		marginRight: 160,
	},
	checkbox: {
		alignSelf: "center",
	},
	label: {
		margin: 8,
	},
	textbot: {
		color: "white",
		marginTop: 65,
	}

	
});