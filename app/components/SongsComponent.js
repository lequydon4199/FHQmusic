import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  AsyncStorage,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const {width, height} = Dimensions.get('window');
import {Surface} from 'react-native-paper';
import { device } from '../config/ScreenDimensions';
import { setUser } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SongData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  openModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  addToFavorite = async () => {
    const userId = await AsyncStorage.getItem('user');
    if (!userId){
        return Alert.alert('Bạn chưa đăng nhập!')
    }
    const response = await fetch(`https://toeic-test-server.herokuapp.com/music/user/add-favorite`,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: userId, songId: this.props.song.item._id})
    });
    const result = await response.json();
    if (result){
        this.props.setUser(result);
        return Alert.alert('Đã thêm vào danh sách yêu thích!');
    }else{
        return Alert.alert('Có lỗi đã xảy ra!')
  }
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
        body: JSON.stringify({userId: userId, songId: this.props.song.item._id})
    });
    const result = await response.json();
    if (!result){
        return Alert.alert('Bạn đã có bài hát này!')
    }else{
        this.props.setUser(result);
        return Alert.alert('Đã thêm!')
    }
}

addToPlaylist = () => {
    Alert.alert('Sắp ra mắt')
}

  render() {
    let item = this.props.song.item;
    let index = this.props.song.index;
    return (
      <View>
        <Modal
          transparent={true}
          onRequestClose={() => this.closeModal()}
          visible={this.state.modalVisible}
          animationType="slide">
          <View style={{height: '100%', backgroundColor: 'rgba(0,0,0,0.4)'}}>
            <TouchableOpacity activeOpacity={0} style={{flex: 1}} onPress={() => this.closeModal()}/>
            <View style={styles.modal}>
              <View style={{flex: 1}}>
                <Surface style={styles.surface}>
                  <Image source={{uri: item.picture}} style={styles.modalImg} />
                </Surface>
              </View>
              <View style={styles.modalData}>
                <View style={styles.playerContainer}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.subTitle}>{item.singer.name}</Text>
                  <TouchableOpacity style={styles.btn} onPress={() => {this.closeModal(); this.props.play(index)}}>
                    <Icon name="play" size={30} color="#fff" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.option} onPress={() => this.addToFavorite()}>
                  <Icon name="heart" size={30} color="#f25050" />
                  <Text style={styles.text}>Thêm vào yêu thích</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => this.addToPlaylist()}>
                  <Icon name="playlist-plus" size={30} color="#000" />
                  <Text style={styles.text}>Thêm vào Playlist</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => this.addToSongs()}>
                  <Icon name="plus" size={30} color="#000" />
                  <Text style={styles.text}>Thêm vào danh sách bài hát</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.songContainer}
          onPress={() => this.props.play(index)}>
          <View style={{flexDirection: 'row'}}>
            <Image source={{uri: item.picture}} style={styles.img} />
            <View style={styles.dataContainer}>
              <Text style={styles.songtitle}>{item.name}</Text>
              <Text style={styles.subTitle}>{item.singer.name}</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => this.openModal()}>
                <Icon name="dots-vertical" color="#737373" size={25} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class SongsComponent extends Component{
  constructor(props) {
    super(props);
  }

  playSong = async index => {
    this.props.navigation.navigate("Player", {songPos: index, playlist: this.props.songs});
    const userId = await AsyncStorage.getItem('user');
    if (userId){
      const response = await fetch(`https://toeic-test-server.herokuapp.com/music/user/add-history`,{
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({userId: userId, songId: this.props.songs[index]._id})
      });
      const updatedUser = await response.json();
      this.props.setUser(updatedUser)
    } else {
      fetch(`https://toeic-test-server.herokuapp.com/music//song/view/anonymous`,{
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({songId: this.props.songs[index]._id})
      });
    }
  };

  separator = () => {
    return <View style={{height: 10, backgroundColor: '#ffffff'}} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{padding: 10, paddingTop: 0}}>
          <FlatList
            data={this.props.songs}
            keyExtractor={(tem, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => this.separator()}
            renderItem={({item, index}) => {
              return (
                <SongData song={({item, index})} navigation={this.props.navigation} play={this.playSong} setUser={this.props.setUser}/>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUser: bindActionCreators(setUser, dispatch)
});

export default connect(null, mapDispatchToProps)(SongsComponent);

const styles = StyleSheet.create({
  container: {
    width: width,
    marginTop: device.height*0.01,
    backgroundColor: '#fefefe'
  },
  songContainer: {
    width: width,
    height: 70,
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 5,
  },
  songContainer: {
    backgroundColor: 'white'
  },
  dataContainer: {
    paddingLeft: 10,
    width: width - 160,
  },
  songtitle: {
    fontSize: 16,
    marginTop: 10,
    color: '#000',
  },
  subTitle: {
    fontSize: 14,
    color: '#737373',
  },
  title: {
    fontSize: 18
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: device.width * 0.15,
  },
  modal: {
    height: '55%',
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  modalImg: {
    height: 180,
    width: 180,
  },
  surface: {
    height: 180,
    width: 180,
    alignSelf: 'center',
    position: 'absolute',
    overflow: 'hidden',
    top: -100,
    borderRadius: 8,
    elevation: 20,
  },
  modalData: {
    flex: 3,
    marginTop: 0,
  },
  option: {
    height: 50,
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e5e5',
  },
  text: {
    marginLeft: 15,
    color: '#000',
    fontSize: 16,
  },
  playerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#1da1f2',
    elevation: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});