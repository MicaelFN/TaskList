import React, {Component} from 'react';
import {StyleSheet, KeyboardAvoidingView, View, Image, Text, TextInput, Button, Alert, SafeAreaView} from 'react-native';
import {createUserOnFirebaseAsync} from '../services/FirebaseApi';

const img = require('../assets/list.png');

export default class Register extends Component{

    static navigationOptions = {
        title: 'Register'
    };

    state = {
        email: '',
        password: ''
    }


    render(){
        return(
           
                <KeyboardAvoidingView style={styles.container}
                    behavior = 'padding'>
                    <View style={styles.topView}>
                        <Image style = {styles.img}
                            source={img} />
                        <Text style = {styles.title}>Registering new user</Text>
                    </View>
                    <View style = {styles.bottomView}>
                        <TextInput style = {styles.input}
                            placeholder = 'Email'
                            keyboardType = {'email-address'}
                            autoCapitalize = 'none'
                            onChangeText = {email => {
                                this.setState({email})
                            }}/>
                        <TextInput style = {styles.input}
                            placeholder = 'Password'
                            secureTextEntry = {true}
                            onChangeText = {password => this.setState({password})} />
                        <Button title = 'Register User'
                            onPress = {() => {
                                //Alert.alert(`Email: ${this.state.email}\n Password: ${this.state.password}`)
                                this._createUserAsync()
                            }} />
                    </View>        
                </KeyboardAvoidingView>

            
        );
    }

    async _createUserAsync(){
        try{
            const user = await createUserOnFirebaseAsync(this.state.email, this.state.password);
            Alert.alert("User Createrd", `User ${user.email} has succesfuly been created!`, [{
                text: 'Ok' , onPress: () => {
                    this.props.navigation.goBack();
                }
            }]);
        }catch(error){
            Alert.alert('Create User Failed!', error.message);
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center'
    },
    topView:{
        flex: 0.20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 25
    },
    img: {
       width:150,
       height:150,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20
    },
    bottomView: {
        flex: 1,
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20
    },
    input: {
        marginBottom: 20
    }
});