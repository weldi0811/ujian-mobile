import React, { Component } from 'react'
import {StyleSheet, View, Alert} from 'react-native'
import {connect} from 'react-redux'
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Button,
    Item,
    Input,
    Textarea
} from 'native-base'

import Fire from '../firebase'

// Untuk mengambil data dari navigate menggunakan
// navigation.getParam('nama parameternya') / 'data_diary'
class DetailKaryawanScreen extends Component {

    state = {
        diary: this.props.navigation.getParam('data_diary'),
        edit : false,
        editNama : '',
        editUmur : '',
        editJabatan : ''
    }

    onEditButton = () => {
        this.setState({edit : true})
    }

    onDeleteButton = async () => {

        Alert.alert(
            'delete',
            'delete??',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'OK', onPress: async () => {
                await Fire.database().ref(`diary/${this.props.uid}/${this.state.diary.id}`).remove()

   
                // kembali ke halaman sebelumnya. 
               this.props.navigation.goBack()
              }},
            ],
            {cancelable: false},
          )
        // Menghapus data
        
    }

    onSaveDiary = () => {
            Alert.alert(
                'save?',
                'you want to save?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: async() => {
                      if(this.state.editNama===''){
                        await Fire.database().ref(`diary/${this.props.uid}/${this.state.diary.id}`)
                    .update({
                        nama: this.state.diary.nama,
                        umur: this.state.editUmur,
                        jabatan: this.state.editJabatan
                    })
                    }
                    else if(this.state.editUmur===''){
                        await Fire.database().ref(`diary/${this.props.uid}/${this.state.diary.id}`)
                    .update({
                        nama: this.state.editNama,
                        umur: this.state.diary.umur,
                        jabatan: this.state.editJabatan
                    })
                    }
                    else if(this.state.editJabatan === ''){
                        await Fire.database().ref(`diary/${this.props.uid}/${this.state.diary.id}`)
                    .update({
                        nama: this.state.editNama,
                        umur: this.state.editUmur,
                        jabatan: this.state.diary.jabatan
                    })
                    }
                    else{
                        await Fire.database().ref(`diary/${this.props.uid}/${this.state.diary.id}`)
                    .update({
                        nama: this.state.editNama,
                        umur: this.state.editUmur,
                        jabatan: this.state.editJabatan
                    })
                    }
                    this.props.navigation.goBack()
                    this.props.navigation.goBack()
                  }},
                ],
                {cancelable: false},
              );
    }

    onCancelSave = () => {
        Alert.alert(
            'quit editing?',
            'quit editing?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'OK', onPress: () => {this.setState({edit: false})}},
            ],
            {cancelable: false},
          )     
    }
    render() {
        // Mengambil data yang di kirim dari navigate
        var diary = this.state.diary
        if(this.state.edit === false){
            return (
                <Container>
                    <Content>
                        <Card>
                            <Text>Nama</Text>
                            <CardItem header bordered style={styles.row}>
                                <Text style={styles.headerText}>{diary.nama}</Text>

                                <Text>Usia : {diary.umur}</Text>
                            </CardItem>

                            <Text>Jabatan</Text>
                            <CardItem>
                                
                                <Text>{diary.jabatan}</Text>
                            </CardItem>
                            <View style={styles.button}>
                                <Button block onPress={this.onEditButton}><Text>Edit</Text></Button>
                                <Button block onPress={this.onDeleteButton}><Text>Delete</Text></Button>
                            </View>
                        </Card>
                    </Content>
                </Container>
            )
        }
        else {
            return (
                <Container>
                    <View style={styles.container}>
                        <Text style={{fontSize: 20}}>edit Karyawan</Text>
                        <View style={styles.wrapper}>
                            <Item rounded>
                                <Input
                                    defaultValue = {this.state.diary.nama}
                                    placeholder = 'nama'
                                    onChangeText={(text) => this.setState({editNama: text})}
                                />
                            </Item>
                            <Item rounded>
                                <Input
                                    defaultValue = {this.state.diary.umur}
                                    placeholder = 'umur'
                                    onChangeText={(text) => this.setState({editUmur: text})}
                                />
                            </Item>
                            <Item rounded>
                                <Input
                                    defaultValue = {this.state.diary.jabatan}
                                    placeholder = 'jabatan'
                                    onChangeText={(text) => this.setState({editJabatan: text})}
                                />
                            </Item>
                            <View style={styles.button}>
                                <Button block onPress={this.onSaveDiary}>
                                    <Text>savey</Text>
                                </Button>
                                <Button block onPress={this.onCancelSave}>
                                    <Text>cancel</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </Container>
            )
        }
        
        
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    button: {
        height: 100,
        justifyContent: 'space-between',
        marginTop: 10
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    wrapper: {
        width: '90%',
        marginTop: 15
    }
})

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}
export default connect(mapStateToProps)(DetailKaryawanScreen)