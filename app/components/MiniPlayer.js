import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from "./ComponentStyles/MiniPlayer";
import { updateSongStatus } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;
const LOOPING_TYPE_OFF = 2;

let count = 0;

class MiniPlayer extends React.Component {
    constructor(props){
        super(props);
    }
    
    async _loadNewPlaybackInstance(playing){
        await global.playbackInstance.unloadAsync();
        this.props.status.isPlaying = false;
        this.props.status.playbackInstancePosition = 0;
        this.props.status.playbackInstanceDuration = 0;
        this.props.player.currentSong = this.getSong(this.props.player.position);
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

    //   _onPlaybackStatusUpdate = status => {
    //     console.log(status);
        // if (status.isLoaded) {
        //     // this.setState({
        //     //   playbackInstancePosition: status.positionMillis,
        //     //   playbackInstanceDuration: status.durationMillis,
        //     //   shouldPlay: status.shouldPlay,
        //     //   isPlaying: status.isPlaying,
        //     //   isBuffering: status.isBuffering,
        //     //   isLoading: status.positionMillis === 0,
        //     //   rate: status.rate,
        //     //   muted: status.isMuted,
        //     //   volume: status.volume,
        //     //   loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
        //     //   shouldCorrectPitch: status.shouldCorrectPitch
        //     // });
    //         this.props.updateSong(status);
    //         if (status.didJustFinish && !status.isLooping) {
    //             this._advanceIndex(true);
    //             this._loadNewPlaybackInstance(true);
    //         }
    //     } else {
    //         if (status.error) {
    //             console.log(`FATAL PLAYER ERROR: ${status.error}`);
    //         }
    //     }
    //   };

    _advanceIndex(forward) {
        const playlistLength = this.props.player.playlist.length;
        this.props.player.position = (this.props.player.position + (forward ? 1 : playlistLength - 1)) % playlistLength;
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
        return this.props.player.playlist[index];
    }
    

    render(){
        if (!this.props.player){
            return <View></View>
        }else {
            if (!this.props.status.isPlaying){
                return <View></View>
            }
            return (
                <TouchableOpacity onPress={() => this.props.navigate('Player', {currentSong: this.props.player.currentSong,songPos: this.props.player.position, playlist: this.props.player.playlist})}>
                    <View style={styles.container}>
                        <View style={{flexDirection: 'row'}}>
                            <Image style={styles.picture} source={{uri: this.props.player.currentSong.picture}}/>
                            <View style={{flex: 1}}>
                                <Text style={styles.songTitle}>{this.props.player.currentSong.name}</Text>
                                <Text style={styles.singerName}>{this.props.player.currentSong.singer.name}</Text>
                            </View>
                            <View style={styles.controlArea}>
                                <TouchableOpacity onPress={() => this._onPlayPausePressed()}>
                                    <MaterialIcons name={this.props.status.isPlaying ? 'pause' : 'play-arrow'} size={40}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this._onForwardPressed()}>
                                    <MaterialIcons name='skip-next' size={40}/>
                                </TouchableOpacity>       
                            </View>
                        </View>
                        <ProgressBar style={styles.progressBar} progress={this._getSeekSliderPosition()} color='#1976D2'/>
                    </View>
                </TouchableOpacity>
            );
        }
    }
}

const mapStateToProps = state => ({
    player: state.player,
    status: state.updateSong
});
  
const mapDispatchToProps = (dispatch) => ({
    updateSong: bindActionCreators(updateSongStatus, dispatch)
});
  
export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer);
  
