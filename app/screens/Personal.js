import React from 'react';
import { SafeAreaView, View, Text, StatusBar, Image, ScrollView, TouchableOpacity, Platform, AsyncStorage, ActivityIndicator } from 'react-native';
import { ListItem, Button } from 'react-native-elements'
import styles from '../styles/Personal';
import { list } from '../data/data';
import MiniPlayer from '../components/MiniPlayer';
import ListSongs from '../components/ListSongs';
import { setUser } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

console.disableYellowBox = true;

class Personal extends React.Component {
  state = {
    isFetching: true,
  }

  async UNSAFE_componentWillMount(){
    const userId = await AsyncStorage.getItem('user');
    if (!userId){
      this.setState({
        isFetching: false
      })
    } else {
      const response = await fetch(`https://toeic-test-server.herokuapp.com/music/user/${userId}`);
      const userData = await response.json();
      this.props.setUser(userData);
      this.setState({
      isFetching: false
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
    const {navigate} = this.props.navigation;
    return(
      <SafeAreaView style={{flex: 1, backgroundColor: '#0D47A1', paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <StatusBar barStyle="default" translucent/>
            <View style={styles.titleTextContainer}>
              <Text style={styles.titleText}>Cá nhân</Text>
            </View>
            <View style={{flexDirection: 'row', backgroundColor: 'white', marginBottom: 10}}>
              {/* <SearchBar navigation={this.props.navigation}/> */}
              <View>
                <Image style={{height: 80, width: 80, margin: 15, borderRadius: 40}} source={{uri: this.props.user.avatar}}/>
              </View>
              <View style={{justifyContent: "center"}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Username: {this.props.user.username}</Text>
                <Text style={{marginVertical: 3}}>Nickname: {this.props.user.nickname}</Text>
                <Button 
                  containerStyle={{marginTop: 5}}
                  titleStyle={{fontSize: 14}}
                  buttonStyle={{padding: 5, width: 80, borderRadius: 5}}
                  title='Đăng xuất' 
                  onPress={() => {
                    AsyncStorage.removeItem('user');
                    navigate("Login");
                  }} 
                />
              </View>
            </View>
            <ScrollView style={{flex: 1}}>
              <View style={{backgroundColor: 'white', marginBottom: 10}}>
                <View>
                  <TouchableOpacity 
                    onPress={()=> navigate('SongList', {title: list[0].title, type: list[0].type, data: this.props.user.mySong})}
                    activeOpacity={0.3}
                  >
                    <ListItem
                      title={list[0].title}
                      leftIcon={{ name: list[0].icon }}
                      bottomDivider
                      chevron
                    />
                  </TouchableOpacity>
                </View> 
                <View>
                  <TouchableOpacity 
                    onPress={()=> navigate('SongList', {title: list[1].title, type: list[1].type, data: this.props.user.favorite})}
                    activeOpacity={0.3}
                  >
                    <ListItem
                      title={list[1].title}
                      leftIcon={{ name: list[1].icon }}
                      bottomDivider
                      chevron
                    />
                  </TouchableOpacity>
                </View> 
                <View>
                  <TouchableOpacity 
                    onPress={()=> navigate('SongList', {title: list[2].title, type: list[2].type})}
                    activeOpacity={0.3}
                  >
                    <ListItem
                      title={list[2].title}
                      leftIcon={{ name: list[2].icon }}
                      bottomDivider
                      chevron
                    />
                  </TouchableOpacity>
                </View>  
                
              </View>
              <View style={{backgroundColor: 'white', flex: 1}}>
                <ListItem
                  title='Lịch sử'
                  leftIcon={{name: 'history'}}
                  bottomDivider
                />
                <View style={{flex: 1}}>
                  <ListSongs type="history" navigate={navigate} data={this.props.user.history}/>
                </View>
              </View>
            </ScrollView>
          </View>
        <MiniPlayer navigate={navigate}/>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: bindActionCreators(setUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Personal);
