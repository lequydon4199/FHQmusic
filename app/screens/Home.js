import React from 'react';
import { SafeAreaView, View, ScrollView, StatusBar, ActivityIndicator, TouchableOpacity, Image, Text, AsyncStorage } from 'react-native';
import styles from '../styles/Home';
import Item from '../components/Item';
import {topicData} from '../data/data';
import MiniPlayer from '../components/MiniPlayer';
import SongOption from '../components/SongOption';
import { setUser } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Home extends React.Component {
  state = {
    isFetching: true,
    data: null
  }

  async UNSAFE_componentWillMount(){
    const response = await fetch(`https://toeic-test-server.herokuapp.com/music/home`) // trả về tất cả bài hát, playlist, ca sĩ
    const data = await response.json(); // data: {songs, singers, playlist}
    this.setState({
      isFetching: false,
      data: data
    })
  }

  playSong = async index => {
    this.props.navigation.navigate("Player", {songPos: index, playlist: this.state.data.songs});
    const userId = await AsyncStorage.getItem('user');
    if (userId){
      const response = await fetch(`https://toeic-test-server.herokuapp.com/music/user/add-history`,{
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({userId: userId, songId: this.state.data.songs[index]._id})
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
				body: JSON.stringify({songId: this.state.data.songs[index]._id})
      });
    }
  }

  render(){
    if (this.state.isFetching){
      return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size='large' color='#0D47A1' />
      </SafeAreaView>
      );
    }
    return(
      <SafeAreaView style={{flex: 1, backgroundColor: '#0D47A1', paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <StatusBar barStyle="default" translucent/>
            {/* <View>
              <SearchBar navigation={this.props.navigation}/>
            </View> */}
            <ScrollView style={styles.scrollView}>
              <Item
                category="Dành cho bạn"
                data={this.state.data.playlists[0].songs}
                horizontal={true}
                itemAreaStyle={styles.suggestArea}
                itemPictureStyle={styles.suggestPicture}
                itemNameStyle={styles.suggestText}
                itemStyle={styles.suggestStyle}
                navigate={this.props.navigation.navigate}
                type='song'
              />
              <Item 
                category="Playlist"
                data={this.state.data.playlists}
                horizontal={true}
                scrollEnabled={false}
                pagingEnabled={false}
                navigate={this.props.navigation.navigate}
                type='playlist'
              />
              <Item 
                category="Ca sĩ" 
                data={this.state.data.singers}
                horizontal={true}
                pagingEnabled={false}
                itemPictureStyle={styles.singerPictureStyle}
                navigate={this.props.navigation.navigate}
                type='singer'
              />
              <Item 
                category="Chủ đề"
                data={topicData}
                horizontal={true}
                pagingEnabled={false}
                navigate={this.props.navigation.navigate}
                type='topic'
              />
              <View style={styles.song}>
                <Text style={styles.titleText}>Bài hát</Text>
                {this.state.data.songs.map((item, index) => (
                <TouchableOpacity
                  key={index.toString()}
                  activeOpacity={0.5}
                  onPress={() => this.playSong(index)}  
                >
                <View style={styles.songContainer}>
                  <Image style={styles.songImage} source = {{uri: item.picture}}/>
                  <View style={styles.songInfoContainer}>
                    <View style={styles.songNameContainer}>
                      <Text style={styles.songName}>{item.name}</Text>
                    </View>
                    <View style={styles.singerContainer}>
                      <Text style={styles.singer}>{item.singer.name}</Text>
                    </View>
                    <View style={styles.singerContainer}>
                      <Text style={styles.singer}>{item.view} lượt nghe</Text>
                    </View>
                  </View>  
                  <View style={styles.optionIcon}>
                    <SongOption song={item}/>
                  </View>
                </View>
                </TouchableOpacity>))}
              </View>
            </ScrollView>
          </View>
          <MiniPlayer navigate={this.props.navigation.navigate}/>
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUser: bindActionCreators(setUser, dispatch)
});

export default connect(null, mapDispatchToProps)(Home);
