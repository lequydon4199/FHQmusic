import React from 'react';
import { StyleSheet, Text, Alert, AsyncStorage } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Icon } from 'react-native-elements';

class SongOption extends React.Component {

    addToFavorite = async () => {
        const userId = await AsyncStorage.getItem('user');
        if (!userId){
            return Alert.alert('Bạn chưa đăng nhập!')
        }
        fetch(`https://toeic-test-server.herokuapp.com/music/user/add-favorite`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: userId, songId: this.props.song._id})
        });
        const result = await response.json();
    }

    addToSongs = async () => {
        const userId = await AsyncStorage.getItem('user');
        if (!userId){
            return Alert.alert('Bạn chưa đăng nhập!')
        }
        const response = await fetch(`https://toeic-test-server.herokuapp.com/music/user/add-song`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: userId, songId: this.props.song._id})
        });
        const result = await response.json();
        if (!result){
            return Alert.alert('Bạn đã thêm bài hát này!')
        }
    }

    addToPlaylist = () => {
        Alert.alert('Sắp có')
    }

    render(){
        return (
            <Menu>
                <MenuTrigger>
                <Icon name="more-vert" size={30} />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{width: 160, borderRadius: 5}}>
                <MenuOption onSelect={() => this.addToFavorite()} style={styles.menuOption}>
                    <Icon name="favorite" color="red"/><Text> Yêu thích</Text>
                </MenuOption>
                <MenuOption onSelect={() => this.addToSongs()} style={styles.menuOption}>
                    <Icon name="add"/><Text> Thêm</Text>
                </MenuOption>
                <MenuOption onSelect={() => this.addToPlaylist()} style={styles.menuOption}>
                    <Icon name="playlist-add" /><Text> Thêm vào playlist</Text>
                </MenuOption>
                </MenuOptions>
            </Menu>
        );
    }
}

export default SongOption

const styles = StyleSheet.create({
    menuOption: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});