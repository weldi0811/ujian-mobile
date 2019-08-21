import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {Container, Text, Textarea, Button, Item, Input} from 'native-base'

import DatePick from '../components/DatePick'

import Fire from '../firebase'

class AddKaryawanScreen extends Component {

    state = {
        nama: '',
        umur: '',
        jabatan : '',
        date: new Date()
    }

    // variable tanggal akan di isi tanggal yang dipilih oleh user
    getDate = (tanggal) => {
        this.setState({date: tanggal})
    }

    addDiary = async () => {
        await Fire.database().ref(`diary/${this.props.uid}`)
        .push({
            nama: this.state.nama,
            umur: this.state.umur,
            jabatan: this.state.jabatan,
            date: this.state.date.toString().substr(4,12)
        })

        // kembali ke halaman sebelumnya
        this.props.navigation.goBack()

    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Text style={{fontSize: 20}}>Tambah Karyawan</Text>
                    <View style={styles.wrapper}>
                        <DatePick funDate={this.getDate}/>
                        <Item rounded>
                            <Input
                                placeholder='Nama'
                                onChangeText={(text) => this.setState({nama: text})}
                            />
                        </Item>
                        <Item rounded>
                            <Input
                                placeholder='Umur'
                                onChangeText={(text) => this.setState({umur: text})}
                            />
                        </Item>
                        <Item rounded>
                            <Input
                                placeholder='Jabatan'
                                onChangeText={(text) => this.setState({jabatan: text})}
                            />
                        </Item>
                        
                        <View style={styles.button}>
                            <Button block onPress={this.addDiary}>
                                <Text>Tambah Karyawan</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    wrapper: {
        width: '90%',
        marginTop: 15
    },
    button: {
        marginTop: 10
    }
})

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(AddKaryawanScreen)