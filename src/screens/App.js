import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {currentFirebaseUser} from '../services/FirebaseApi';

export default class App extends Component{
  async componentDidMount(){
      let resetNavigation = CommonActions.reset({
        index:0,
        routes: [{name: 'Login'}],
      });

      try{
        const user = await currentFirebaseUser();
        if(user){
          this.props.navigation.dispatch(
            CommonActions.reset({
              iindex:0,
              routes: [{name: 'TaskList'}],
            }),
          );
          return;
        }
        this.props.navigation.dispatch(resetNavigation);
      }catch(error){
        this.props.navigation.dispatch(resetNavigation);
      }
    }
  
/*     render() {
      return (
      <View style={styles.container}>
      <ActivityIndicator style={styles.loading} />
      </View>
      );
      }
      } */
  render(){
    return(
      <View style={styles.container}>
        <ActivityIndicator style={styles.loading}/>
      </View>
    );
  }
}
  
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  loading:{
    width:50,
    height:50
  },
});