import * as React from 'react';
import { SafeAreaView, View, ScrollView, StatusBar, ActivityIndicator, AsyncStorage, TouchableOpacity, Image, Text } from 'react-native';
import styles from '../styles/Home';
import MiniPlayer from '../components/MiniPlayer';
import SongOption from '../components/SongOption';
import { SearchBar } from 'react-native-elements';
import { setUser } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true, 
      search: '',
      notFound: false,
    };
    this.arrayholder = [];
  }
  async UNSAFE_componentWillMount() {
    const response = await fetch(`https://toeic-test-server.herokuapp.com/music/song`) // trả về tất cả bài hát
    const data = await response.json();
    this.setState(
      {
        isLoading: false,
        dataSource: data,
      },
      function() {
        this.arrayholder = data;
      }
    );
  }

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const singer = item.singer.name ? item.singer.name.toUpperCase() : '';
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1 || singer.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: newData,
      search: text,
      notFound: newData.length === 0
    });
  }

  playSong = async index => {
    this.props.navigation.navigate("Player", {songPos: index, playlist: this.state.dataSource});
    const userId = await AsyncStorage.getItem('user');
    if (userId){
      const response = await fetch(`https://toeic-test-server.herokuapp.com/music/user/add-history`,{
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({userId: userId, songId: this.state.dataSource[index]._id})
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
				body: JSON.stringify({songId: this.state.dataSource[index]._id})
      });
    }
  }

  render() {
    return (
      //ListView to show with textinput used as search bar
      <React.Fragment>
        <SafeAreaView style={{backgroundColor: '#0D47A1', paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}/>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <SearchBar
              round
              searchIcon={{ size: 24 }}
              onChangeText={text => this.SearchFilterFunction(text)}
              onClear={text => this.SearchFilterFunction('')}
              placeholder="Tìm bài hát"
              value={this.state.search}
              containerStyle = {{ backgroundColor: '#1976D2', height: 65 }}
              inputContainerStyle={{backgroundColor: 'white', height: 45}}
            />
            {
              this.state.notFound?
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: 'gray', fontSize: 22}}>Không tìm thấy</Text>
              </View>:
              null
            }
            {this.state.isLoading? 
            <View style={{flex: 1, justifyContent: 'center'}}>
              <ActivityIndicator size='large' color='#0D47A1' />
            </View>:
            <ScrollView>
              <View style={styles.song}>
                {this.state.dataSource.map((item, index) => (
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
            }
          </View>
          <MiniPlayer navigate={this.props.navigation.navigate}/>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUser: bindActionCreators(setUser, dispatch)
});

export default connect(null, mapDispatchToProps)(Search);

