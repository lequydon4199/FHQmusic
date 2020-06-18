import React from 'react';
import { View, Text, Image, ScrollView, Keyboard, TouchableOpacity, AsyncStorage } from 'react-native';
import styles from './ComponentStyles/Item';
import PropTypes from 'prop-types';
import { setUser } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Item extends React.Component {
  constructor(props){
    super(props);
  }

  playSong = async index => {
    this.props.navigate("Player", {songPos: index, playlist: this.props.data});
    const userId = await AsyncStorage.getItem('user');
    if (userId){
      const response = await fetch(`https://toeic-test-server.herokuapp.com/music/user/add-history`,{
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({userId: userId, songId: this.props.data[index]._id})
      });
      const updatedUser = await response.json();
      this.props.setUser(updatedUser);
    }else{
      fetch(`https://toeic-test-server.herokuapp.com/music//song/view/anonymous`,{
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({songId: this.props.data[index]._id})
      });
    }
  }

  pressItem = index => {
    if (this.props.type === 'song'){
      this.playSong(index);
    } else {
      this.props.navigate('PlaylistComponent', {type: this.props.type, data: this.props.data[index]});
    }
  }

  render(){
    return(  
      <View style={[styles.itemArea, this.props.itemAreaStyle]}>
        <Text style={[styles.titleText, this.props.titleTextStyle]}>{this.props.category}</Text>
        <ScrollView 
          horizontal={this.props.horizontal}
          onScroll={Keyboard.dismiss}
          scrollEventThrottle={0}
          pagingEnabled={this.props.pagingEnabled}
          scrollEnabled={this.props.scrollEnabled}
        >
          {this.props.data.map((item, index) => (
            <TouchableOpacity key={index.toString()} activeOpacity={0.5} onPress={() => this.pressItem(index)}>
              <View style={[styles.item, this.props.itemStyle]}>
                <Image style={[styles.itemPicture, this.props.itemPictureStyle]} source={{
                  uri: item.picture,
                }}/>
                <Text style={[styles.itemName, this.props.itemNameStyle]}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>     
    )
  }
}

Item.propTypes = {
  itemAreaStyle: PropTypes.object,
  titleTextStyle: PropTypes.object,
  category: PropTypes.string,
  horizontal: PropTypes.bool,
  scrollEnabled: PropTypes.bool,
  data: PropTypes.array.isRequired,
  itemStyle: PropTypes.object,
  itemPictureStyle: PropTypes.object,
  itemNameStyle: PropTypes.object
}

Item.defaultProps = {
  horizontal: false,
  scrollEnabled: true,
  pagingEnabled: true,
  data: [],
}

const mapDispatchToProps = (dispatch) => ({
  setUser: bindActionCreators(setUser, dispatch)
});

export default connect(null, mapDispatchToProps)(Item);
