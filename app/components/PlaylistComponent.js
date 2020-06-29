import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, ActivityIndicator, SafeAreaView, Platform, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { device } from '../config/ScreenDimensions';
import MiniPlayer from '../components/MiniPlayer';
import SongsComponent from './SongsComponent';
export default class PlaylistComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        playlistPicture: this.props.route.params.data.picture,
        playlistName: this.props.route.params.data.name,
        playlistDescription: this.props.route.params.data.description,
        data: [],
        isFetching: true,
        noData: false,
    }

    async UNSAFE_componentWillMount(){
        let songs = [];
        if (this.props.route.params.type === 'playlist'){
            songs = this.props.route.params.data.songs;
        } else {
            let response = null;
            if (this.props.route.params.type === 'singer'){
                response = await fetch(`https://toeic-test-server.herokuapp.com/music/song/singer/${this.props.route.params.data._id}`);
            } else if (this.props.route.params.type === 'topic'){
                response = await fetch(`https://toeic-test-server.herokuapp.com/music/song/topic/${this.props.route.params.data.name}`); 
            }
            const data = await response.json();
            songs = data;
        }
        if (songs.length > 0){
            this.setState({
                data: songs,
                isFetching: false
            });
        } else {
            this.setState({
                isFetching: false,
                noData: true,
            });
        }
    }

    _goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return(
        <React.Fragment>
            <SafeAreaView style={{backgroundColor: '#0D47A1'}}/>
            <SafeAreaView style={{flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
                <View style={{flex: 1, justifyContent: 'space-between'}}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <ImageBackground source={{uri: this.state.playlistPicture}} style={styles.imageBackground} blurRadius={22}>
                        <TouchableOpacity onPress={() => this._goBack()}>
                                <MaterialIcons name="arrow-back"style={styles.back} size={device.height * 0.038}></MaterialIcons>
                            </TouchableOpacity> 
                            <Image source={{uri: this.state.playlistPicture}} style={styles.image}></Image>
                            <Text style={styles.title}>{this.state.playlistName}</Text>
                            <Text style={styles.description}>{this.state.playlistDescription}</Text>
                        </ImageBackground>
                    </View>
                    <View style={styles.listSong}>
                        {   
                            this.state.isFetching? 
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <ActivityIndicator size='large' color='#0D47A1' />
                            </View>:
                            <SongsComponent navigation={this.props.navigation} songs={this.state.data}/>
                        }
                        {
                            this.state.noData?
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text>Không có bài hát</Text>
                            </View>:
                            null
                        }
                    </View>
                </View>
                </View>
                <MiniPlayer navigate={this.props.navigation.navigate}/>
            </SafeAreaView>
        </React.Fragment>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fefefe'
    }, 
    header: {      
        flexDirection: 'column'
    },
    back: {
        marginTop: device.height * 0.03,
        color: '#ffffff',
        marginLeft: device.width * 0.02
    },
    listSong: {
        flex: 1,
    },
    imageBackground: {
        height: device.width*0.65,
        width: device.width,
    },
    image: {
        height: device. height * 0.18,
        width: device.height * 0.18,
        marginHorizontal: (device.width - device.height * 0.18) / 2,
        borderRadius: 5,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#ffffff',
        marginTop: device.height*0.015
    },
    description: {
        color: 'white',
        textAlign: 'center'
    }
})