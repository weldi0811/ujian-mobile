import React, { Component } from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {Text} from 'native-base'
import { withNavigation } from 'react-navigation'

class ListKaryawan extends Component {

    touchable = () => {

        //this.data.ITEM -> ITEM itu bawaan flatlist, bukan dari apa yang kita definisiin di diaryscreen
        this.props.navigation.navigate('DetailKaryawan', {data_diary : this.props.data.item})

    }

    render() {
        return(
            <TouchableOpacity onPress={this.touchable}>
                <View style={styles.list}>
                    <Text>{this.props.data.item.nama}</Text>
                    <Text>{this.props.data.item.umur}</Text>
                    <Text>{this.props.data.item.jabatan}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgb(241, 210, 247)',
        padding : 10,
        marginVertical: 5,
    }
})

export default withNavigation(ListKaryawan)