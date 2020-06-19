import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './app/screens/Home';
import Personal from './app/screens/Personal';
import SongList from './app/screens/SongList';
import { MenuProvider } from 'react-native-popup-menu';
import { Icon } from 'react-native-elements';
import Register from './app/screens/Register';
import Login from './app/screens/Login';
import Profile from './app/screens/Profile';
import Player from './app/screens/Player';
import { Provider } from 'react-redux';
import store from './app/store/index';
import Search from './app/screens/Search';
import PlaylistComponent from './app/components/PlaylistComponent';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Trang chủ') {
            iconName = 'home';
            color = focused? '#66afff' : 'gray';
            size = 30;
          } else if (route.name === 'Tìm kiếm') {
            iconName = 'search';
            color = focused? '#66afff' : 'gray';
            size = 30;
          }
          else if (route.name === 'Cá nhân') {
            iconName = 'person';
            color = focused? '#66afff' : 'gray';
            size = 30;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Trang chủ" component={Home}/>
      <Tab.Screen name="Tìm kiếm" component={Search}/>
      <Tab.Screen name="Cá nhân" component={Personal} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="SongList" component={SongList} />
            <Stack.Screen 
              name="Login" 
              component={Login} 
              options={{
                ...TransitionPresets.ScaleFromCenterAndroid
              }}
            />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen 
              name="Player"
              component={Player} 
              options={{
                ...TransitionPresets.ModalSlideFromBottomIOS
              }}
            />
            <Stack.Screen name="PlaylistComponent" component={PlaylistComponent}/>
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </Provider>
  );
}

export default App;
