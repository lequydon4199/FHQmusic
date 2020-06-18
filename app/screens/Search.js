import * as React from 'react';
import { SafeAreaView,StyleSheet, View, ScrollView, StatusBar, ActivityIndicator, TouchableOpacity, Image, Text,FlatList, AsyncStorage } from 'react-native';
import styles from '../styles/Home';
import Item from '../components/Item';
import {topicData} from '../data/data';
import MiniPlayer from '../components/MiniPlayer';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { SearchBar, ListItem, Icon } from 'react-native-elements';
import { songs } from '../data/data';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true, 
      search: '',

    };
    this.arrayholder = [];
  }
  componentDidMount() {
        this.setState(
          {
            isLoading: false,
            dataSource: songs,
          },
          function() {
            this.arrayholder = songs;
          }
        );
      }
  

  
  search = text => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //ListView to show with textinput used as search bar
      <React.Fragment>
        <SafeAreaView style={{backgroundColor: '#0D47A1', paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}/>
        <SafeAreaView style={styles.viewStyle}>
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
          <ScrollView style={styles.scrollView}>
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
                    <Menu>
                      <MenuTrigger>
                        <Icon name="more-vert" size={30} />
                      </MenuTrigger>
                      <MenuOptions optionsContainerStyle={{width: 100}}>
                        <MenuOption onSelect={() => alert(`Tùy chọn 1`)} >
                          <Text>Tùy chọn 1</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => alert(`Tùy chọn 2`)} >
                          <Text>Tùy chọn 2</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => alert(`Tùy chọn 3`)} >
                          <Text>Tùy chọn 3</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </View>
                </View>
                </TouchableOpacity>))}
              </View>
              </ScrollView>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}

