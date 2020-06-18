import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import styles from './ComponentStyles/ListSongs';
import SongOption from './SongOption';
import { Icon } from 'react-native-elements';
import { device } from '../config/ScreenDimensions';
import { addSongToHistory } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ListSongs extends React.Component {
  state = {
    dayOffset: '',
    playlist: []
  }

  getDayOffset = time => {
    const timeOffset = ((Date.now()) - time)/1000;
    if (timeOffset < 86400) {
      return 'Hôm nay';
    } else if (timeOffset < 172800){
      return 'Hôm qua';
    } else if (timeOffset < 259200){
      return 'Hôm kia';
    } else if (timeOffset < 604800){
      return `${Math.floor(timeOffset/86400)} ngày trước`
    } else if (timeOffset < 2592000){
      return `${Math.floor(timeOffset/604800)} tuần trước`
    } else return new Date(time).toLocaleString();
  }

  playSong = async index => {
    const userId = await AsyncStorage.getItem('user');
    if (userId){
      fetch(`https://toeic-test-server.herokuapp.com/music/user/add-history`,{
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({userId: userId, songId: this.props.data[index]._id})
      });
      this.props.addSongToHistory(this.props.data[index])
    } else {
      fetch(`https://toeic-test-server.herokuapp.com/music//song/view/anonymous`,{
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({songId: this.props.data[index]._id})
      });
    }
    this.props.navigate("Player", {songPos: index, playlist: this.state.playlist});
  }
  
  renderItem = ({item, index}) => {
    let itemDayOffset = this.getDayOffset(item.latestListening);
    let showDayOffset = false;
    if ((this.props.type==='history')&&(itemDayOffset!==this.state.dayOffset)){
      showDayOffset = true;
      this.state.dayOffset = itemDayOffset;
    }
    return(
      <View>
        {showDayOffset ?
        <View style={styles.dayOffsetContainer}>
          <Text style={styles.dayOffset}>{itemDayOffset}</Text>
        </View> : 
        null }
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            this.playSong(index);
            item.latestListening = new Date().getTime();
            this.setState({dayOffset: ''});
          }}  
        >
        <View style={styles.container}>
          <Image style={styles.image} source = {{uri: item.picture}}/>
          <View style={styles.songInfoContainer}>
            <View style={styles.songNameContainer}>
              <Text style={styles.songName}>{item.name}</Text>
            </View>
            <View style={styles.singerContainer}>
              <Text style={styles.singer}>{item.singer.name}</Text>
            </View>
            {this.props.type==='favorite' ? 
            <View style={styles.favoriteIcon}>
              <Icon name="favorite" size={device.width*0.08} color='#D50000'/>
            </View> : 
            null}
          </View>  
          <View style={styles.optionIcon}>
            <SongOption song={item}/>
          </View>
        </View>
        </TouchableOpacity>
      </View>
    );
  }

  render(){
    if (this.props.type === 'history'){
      this.state.playlist = this.props.data.map(item => ({
        _id: item._id._id,
        name: item._id.name,
        picture: item._id.picture,
        singer: item._id.singer,
        topic: item._id.topic,
        uri: item._id.uri,
        view: item._id.view,
        latestListening: item.latestListening
      }))
    }else{
      this.state.playlist = this.props.data
    }
    return (
      <FlatList
        data={this.state.playlist}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderItem}
        style={styles.flatList}
      />
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  addSongToHistory: bindActionCreators(addSongToHistory, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ListSongs);
