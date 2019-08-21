import React, { Component } from 'react'
import {View, BackHandler, StyleSheet, FlatList} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import {connect} from 'react-redux'
import {Button, Text, Container} from 'native-base'
import ListKaryawan from '../components/ListKaryawan'

import Fire from '../firebase'

class KaryawanScreen extends Component {

    state = {
        snapShot: {}
    }

    onBackButton = () => {
        alert('Tombol back di tekan')
        // Menonaktifkan default function (kembali ke halaman sebelumnya)
        return true
    }

    onAddDiary = () => {
        this.props.navigation.navigate('AddKaryawan')
    }

    getData = () => {
        // Get data
        Fire.database().ref(`diary/${this.props.uid}`)
        .once('value', (snapShot) => {
            // Cek apakah data di temukan
            if(snapShot.exists()){
                this.setState({snapShot: snapShot.val()})
            }
            else{
                this.setState({snapShot: {}})
            }
        })
    }

    ngonsol = () => {
        console.log(this.state.snapShot)
    }

    renderList = () => {
        // array of id dari setiap diary
        let keysKaryawan = Object.keys(this.state.snapShot)
        let listKaryawan = []

        // key : id dari diary
        keysKaryawan.forEach((key) => {
            listKaryawan.push({
                nama : this.state.snapShot[key].nama,
                umur : this.state.snapShot[key].umur,
                jabatan : this.state.snapShot[key].jabatan,
                date : this.state.snapShot[key].date,
                id: key
            })
        })

        // [{title, diary, date}{}{}]
        return <FlatList
                    keyExtractor = {(item) => item.id}
                    style = {styles.flaslist}
                    data={listKaryawan}
                    renderItem ={(item)=>{
                        return <ListKaryawan data={item} key={item.id}/>
                    }}
                />
    }
s
    render() {
        return (
            <Container>
                <NavigationEvents
                    // ComponentDidMount
                    onDidFocus = {() => {
                        // non aktifkan tombol back pada device
                        BackHandler.addEventListener('hardwareBackPress', this.onBackButton)
                        // get semua diary milik user
                        this.getData()
                    }}

                    // ComponentWillUnmount
                    onWillBlur = {() => {
                        BackHandler.removeEventListener('hardwareBackPress', this.onBackButton)
                    }}
                />

                <View style={styles.container}>
                    <Text>Karyawan Screen</Text>
                    
                    {this.renderList()}
                    <View style={styles.button}>
                        <Button onPress={this.onAddDiary}>
                            <Text>Tambah Karyawan</Text>
                        </Button>
                        <Button onPress={this.ngonsol}>
                            <Text>console log</Text>
                        </Button>
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginVertical: 20
    },
    flaslist: {
        alignSelf: 'stretch'
    }
})

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(KaryawanScreen)