import React,{Component} from 'react'
import {View,StyleSheet} from 'react-native'
import { Text,Button} from 'native-base'
import {connect} from 'react-redux'
import {onLogout} from '../store/actions/index'
import Fire from '../firebase/index'

class ProfileScreen extends Component {

    onLogouton = async () => {
        //logout dari firebase
        await Fire.auth().signOut()

        //logout dari redux
        await this.props.onLogout()
        this.props.navigation.navigate('Auth')        
    }
    render() {
        return(
            <View>
                <Text>ProfileScreen</Text>
                <Button onPress = {this.onLogouton}>
                    <Text>LOGOUT</Text>
                </Button>
            </View>
        )
    }
}

export default connect(null, {onLogout})(ProfileScreen)