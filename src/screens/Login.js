import React, {useState, Component} from 'react';
import {
    SafeAreaView,
    KeyboardAvoidingView,
    StyleSheet,
    View,
    Image,
    TextInput,
    Button,
    Text,
    Alert} from 'react-native';
import {signInOnFirebaseAsync} from '../services/FirebaseApi';
import {CommonActions} from '@react-navigation/native';

const img = require('../assets/list.png');

const Login = props => {
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState('');

    const _signInAsync = async () => {
        try{
            const user = await signInOnFirebaseAsync(email, password);
            Alert.alert('User Authenticated', `User ${user.email} has successfuly been authenticated`,);
            props.navigation.dispatch(
                CommonActions.reset({
                    index:0,
                    routes:[{name: 'TaskList'}],
                }),
            );
        }catch (error){
            Alert.alert('Login Failed', error.message);
        }
    };

    return (
        
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <View style={styles.topView}>
                    <Image style={styles.img} source={img}/>
                </View>

                <View style={styles.bottomView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType={"email-address"}
                        autoCapitalize="none"
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={password => setPassword(password)}
                    />
                    <Button 
                        title="Sign In"
                        onPress={() => 
                            //Alert.alert(`Email: ${email} \nPassword: ${password}`)
                            _signInAsync()
                        }
                    />
                    <View style={styles.textContainer}>
                        <Text>Not a member? Let's</Text>
                        <Text style={styles.textRegister}
                        onPress = {() => {
                            props.navigation.navigate('Register');
                        }}>Register</Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
    },
    topView:{
        justifyContent:'center',
        alignItems:'center',
        padding:50,
    },
    img:{
        width:200,
        height:200,
    },
    bottomView:{
        flexDirection:'column',
        paddingRight:20,
        paddingLeft:20,
    },
    input:{
        marginBottom:20,
    },
    textContainer:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:20,
    },
    textRegister:{
        textDecorationLine:'underline',
        color: "blue",
    }
});


export default Login;