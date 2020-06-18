import React from 'react';
import { Text, View, Image, StatusBar, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import {Slider} from 'react-native-elements';
import Moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/Player';
import { Audio } from 'expo-av';
import { setSong, updateSongStatus } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListSongs from '../components/ListSongs'

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;
const LOOPING_TYPE_OFF = 2;

let count = 0;

class Player extends React.Component {
  constructor(props){
    super(props)
    this.playlist = this.props.route.params.playlist
    this.index = this.props.route.params.songPos
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.continue = false;
  }

  async UNSAFE_componentWillMount(){
    if (this.props.route.params.currentSong){
      this.continue = true;
    } else {
      const song = this.getSong(this.index);
      this.props.setSong(song, this.index, this.playlist)
    }
    // console.log(this.props.player)
    if (!global.playbackInstance) {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false
      });
      global.playbackInstance = new Audio.Sound();
      global.playbackInstance.setOnPlaybackStatusUpdate(this.props.updateSong);
    }
    if (!this.continue){
      await this._loadNewPlaybackInstance(true);
    }
  }

  // componentWillUnmount(){
  //   global.playbackInstance.setOnPlaybackStatusUpdate(null);
  // }

  async _loadNewPlaybackInstance(playing){
    await global.playbackInstance.unloadAsync();
    this.props.status.isPlaying = false;
    const song = this.getSong(this.index);
    this.props.setSong(song, this.index, this.playlist);
    const source = { uri: this.props.player.currentSong.uri };
    const initialStatus = {
      shouldPlay: playing,
      rate: this.props.status.rate,
      shouldCorrectPitch: this.props.status.shouldCorrectPitch,
      volume: this.props.status.volume,
      isMuted: this.props.status.muted,
      isLooping: false,
    };

    await global.playbackInstance.loadAsync(
      source,
      initialStatus
    );
  }

  // _onPlaybackStatusUpdate = status => {
  //   // console.log(status);
  //   if (status.isLoaded) {
  //     this.props.updateSong(status);
  //     if (status.didJustFinish && !status.isLooping) {
  //       this._advanceIndex(true);
  //       this._loadNewPlaybackInstance(true);
  //     }
  //   } else {
  //     if (status.error) {
  //       console.log(`FATAL PLAYER ERROR: ${status.error}`);
  //     }
  //   }
  // };

  _advanceIndex(forward) {
    this.index =
      (this.index + (forward ? 1 : this.playlist.length - 1)) % this.playlist.length;
  }

  _onPlayPausePressed = () => {
    if (global.playbackInstance) {
      if (this.props.status.isPlaying) {
        global.playbackInstance.pauseAsync();
      } else {
        global.playbackInstance.playAsync();
      }
    }
  };

  _onForwardPressed = async () => {
    if (global.playbackInstance) {
      const status = await global.playbackInstance.getStatusAsync();
      if (status.isLoaded){
        this._advanceIndex(true);
        this._loadNewPlaybackInstance(true);
      }
    }
  };

  _onBackPressed = async () => {
    if (global.playbackInstance) {
      const status = await global.playbackInstance.getStatusAsync();
      if (status.isLoaded){
        this._advanceIndex(false);
        this._loadNewPlaybackInstance(true);
      }
    }
  };

  _onSeekSliderValueChange = value => {
    if (global.playbackInstance && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.props.status.shouldPlay;
      global.playbackInstance.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async value => {
    if (global.playbackInstance) {
      this.isSeeking = false;
      const seekPosition = value * this.props.status.playbackInstanceDuration;
      if (this.shouldPlayAtEndOfSeek) {
        global.playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        global.playbackInstance.setPositionAsync(seekPosition);
      }
    }
  };

  _getSeekSliderPosition() {
    if (
      global.playbackInstance &&
      this.props.status.playbackInstancePosition &&
      this.props.status.playbackInstanceDuration
    ) {
      const value = this.props.status.playbackInstancePosition / this.props.status.playbackInstanceDuration;
        if (this.props.status.didJustFinish){
          count++; // because of duplication rerendering (3 times) when update redux state
          if (count === 3){
            this._advanceIndex(true);
            this._loadNewPlaybackInstance(true);
            count = 0;
          }
        }
        return value;
      }
    return 0;
  }

  getSong(index){
    return this.playlist[index];
  }

  _goBack = () => {
    this.props.navigation.goBack();
  }

  render() {
    if (!this.props.player){
      return <View></View>
    }
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="default" translucent></StatusBar>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this._goBack()} style={{flexDirection: 'row'}}>
            <Ionicons style={styles.downButton} name="ios-arrow-down" size={35}></Ionicons>
            <Text style={styles.song}>{this.props.player.currentSong.name} - {this.props.player.currentSong.singer.name}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
        <View style={styles.image}>
          <Image source={{uri: this.props.player.currentSong.picture}} style={styles.imageSong}></Image>
        </View>
        <View style={styles.taskBar}>
          <TouchableOpacity>
            <MaterialIcons name="favorite-border" style={styles.favorite} size={27}></MaterialIcons>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="file-download" style={styles.download} size={27}></MaterialIcons>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="playlist-play" style={styles.list} size={27}></MaterialIcons>
          </TouchableOpacity>
        </View>
        <View style={styles.slider}>
          <Slider
            trackStyle={styles.track}
            thumbTintColor="#f4ece9"
            value={this._getSeekSliderPosition()}
            onValueChange={this._onSeekSliderValueChange}
            onSlidingComplete={this._onSeekSliderSlidingComplete}
            disabled={this.props.status.isLoading}
          ></Slider>
          <View style={{ marginTop: -5, flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={[styles.textLight, styles.timeStamp]}>{this.props.status.playbackInstancePosition? Moment.utc(this.props.status.playbackInstancePosition).format("m:ss") : Moment.utc(0).format("m:ss")}</Text>
              <Text style={[styles.textLight, styles.timeStamp]}>{this.props.status.playbackInstanceDuration? Moment.utc(this.props.status.playbackInstanceDuration).format("m:ss") : Moment.utc(0).format("m:ss")}</Text>
          </View>
        </View>
        <View style={styles.control}>
          <TouchableOpacity>
            <MaterialIcons name="shuffle" style={styles.random} size={28}></MaterialIcons>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._onBackPressed()}>
            <MaterialIcons name="skip-previous" style={styles.backward} size={36}></MaterialIcons>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._onPlayPausePressed()}>
            <MaterialIcons name={this.props.status.isPlaying ? "pause-circle-filled" : "play-circle-filled"} style={styles.pause} size={55}></MaterialIcons> 
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._onForwardPressed()}>
            <MaterialIcons name="skip-next" style={styles.forward} size={36}></MaterialIcons>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="repeat" style={styles.repeat} size={32}></MaterialIcons>
            {/* <MaterialIcons name="repeat-one" style={styles.repeat} size={32}></MaterialIcons> */}
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 20}}>
          <ListSongs type="songs" navigate={this.props.navigation.navigate} data={this.playlist}/> 
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
  status: state.updateSong
});

const mapDispatchToProps = (dispatch) => ({
  setSong: bindActionCreators(setSong, dispatch),
  updateSong: bindActionCreators(updateSongStatus, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
