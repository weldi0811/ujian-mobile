import React, { Component } from 'react'
import {Icon} from 'native-base'
import {Provider} from 'react-redux'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation'

import AuthScreen from './src/auth/AuthScreen'

import KaryawanScreen from './src/app/KaryawanScreen'
import AddKaryawanScreen from './src/app/AddKaryawanScreen'
import DetailKaryawanScreen from './src/app/DetailKaryawanScreen'

import ProfileScreen from './src/app/ProfileScreen'


import STORE from './src/store/reducers/index'

const DiaryStack = createStackNavigator(
  {
    //ganti listdiary -> list karyawan
    ListKaryawan: KaryawanScreen,
    AddKaryawan: AddKaryawanScreen,
    DetailKaryawan: DetailKaryawanScreen
  },
  {
    headerMode: 'none'
  }
)

const MainTab = createBottomTabNavigator(
  {
    Diary: {
      screen: DiaryStack,
      navigationOptions: {
        tabBarIcon: <Icon name='bookmarks'/>
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: <Icon name='contact'/>
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'purple',
      inactiveTintColor: 'grey'
    }
  }
)

const RootStack = createStackNavigator(
  {
    Auth: AuthScreen,
    Main: MainTab
  },
  {
    headerMode: 'none'
  }
)

const AppContainer = createAppContainer(RootStack)

class App extends Component {
  render (){
    return (
      <Provider store={STORE}>
        <AppContainer/>
      </Provider>
    )
  }
}


export default App