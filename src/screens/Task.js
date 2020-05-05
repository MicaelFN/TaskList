import React, {Component} from 'react';
import {View, TextInput, Switch, Text, Button, StyleSheet, Alert} from 'react-native';
import {writeTaskOnFirebaseAsync} from '../services/FirebaseApi';
import {deletetaskOnFirebaseAsync} from '../services/FirebaseApi'
import { TaskListView } from '../components/Components';
import uuid from 'react-native-uuid';

export default class Task extends Component{
    static navigationOptions = {
        title: 'Task'
    }

    state = {
        id: uuid(),
        key: '',
        title:'',
        resume:'',
        priority: true,
        isDone:false,
    };

    constructor(props){
        super(props);

        try{
            const task = this.props.navigation.state.params.task;
            this.state = {
                id: task.id,
                key: task.key,
                title: task.title,
                resume: task.resume,
                priority: task.priority,
                isDone: task.isDone
            };
        }catch(error){

        }
    }

    render(){

        return(
            
            <View style = {styles.container}>
                <TextInput 
                    style = {styles.input}
                    placeholder="Title"
                    value={this.state.title}
                    onChangeText={value => this.setState({title: value})}
                />
                <TextInput 
                    style={[styles.input, styles.multilineInput]}
                    placeholder="Resume"
                    multiline={true} 
                    numberOfLines={4}
                    value={this.state.resume}
                    onChangeText={value => this.setState({resume:value})}
                />
                <View style={styles.switchContainer}>
                    <Switch value={this.state.priority}
                        onValueChange={value => this.setState({priority: value})}
                        value = {this.state.priority}
                    />
                    <Text style = {styles.switchText}>High priority</Text>
                </View>
                <View style = {styles.switchContainer}>
                    <Switch 
                        value = {this.state.isDone}
                        onValueChange = {value => this.setState({isDone: value})}
                        value = {this.state.isDone}
                    />
                    <Text style = {styles.switchText}>Is Done?</Text>
                </View>
                <Button style={styles.button}
                    title="Save"
                    onPress={() => this._saveTaskAsync()}/>

                <Button style={styles.button}
                    title="Delete"
                    onPress={() => this._deleteTaskAsync()}/>
            </View>
        );
    }
    async _deleteTaskAsync(){
        var task = {
            id : this.state.id,
            key: this.state.key,
            title: this.state.title,
            resume: this.state.resume,
            priority: this.state.priority,
            isDone: this.state.isDone,
        };
        try{
            await deletetaskOnFirebaseAsync(task);
            this.props.navigation.goBack();
        }catch(error){
           Alert.alert("Error Deleting", error.message);
        }
    }

    async _saveTaskAsync(){
        var task = {
            id: this.state.id,
            key: this.state.key,
            title: this.state.title,
            resume: this.state.resume,
            priority: this.state.priority,
            isDone: this.state.isDone,
        };
        if(this.state.title != '' && this.state.resume != '' ){
        try{
            await writeTaskOnFirebaseAsync(task);
            this.props.navigation.goBack();
        }catch(error){
           Alert.alert("Error Saving", error.message);
        }
    }else{
        alert('Você precisa digitar um título e um texto para a tarefa')
    }
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        padding:20,
        justifyContent:"space-between"
    },
    input:{
        marginBottom: 20,
    },
    multilineInput:{
        height:100,
    },
    switchContainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:20,
    },
    switchText:{
        marginLeft:10,
        color: 'black',
        fontSize: 18,
    },
});