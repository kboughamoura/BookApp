import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View,TextInput } from 'react-native';
import { Button } from 'react-native';
import { TouchableOpacity } from 'react-native';

import SignUp from './SignUp';
import {Image} from 'react-native' ;
import initfirebase from "../config/index";

import { RootStackScreenProps } from "../types";

const backImage = require("../assets/images/backImage.png");

export default function Authentification({ navigation }: RootStackScreenProps<'Auth'>) {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const auth = initfirebase.auth();
  return (
    <View style={styles.container}>
    <Image source={backImage} style={styles.backImage} />
    <View style={styles.whiteSheet} />
    <View style={styles.form}>
      <Text style={styles.title}>Log In</Text>
      <TextInput  style={styles.input} onChangeText={e=>{setEmail(e)}} placeholder='Username@site.com' keyboardType='email-address'></TextInput>
      <TextInput  style={styles.input} onChangeText={e=>{setPassword(e)}} placeholder='Password' keyboardType='default'secureTextEntry={true}></TextInput>
      {//<Button title="Validate"></Button>
      }
      <TouchableOpacity style={styles.button}
       onPress={()=>{
        if((email.length>0 && email.includes("@")))
        {if(password.length>5)
        {
           auth.signInWithEmailAndPassword(email,password)
           .then(()=>{
               navigation.replace('Root');
           }).catch((erreur)=>{
               alert(erreur)
           });


        }}else{
           alert("verifiez vos donnée")
        }
  
  
      }}>
      <Text style={{textAlign:"center",fontWeight:"bold",fontSize:18,color:'white'}}>Log In</Text>
 
      </TouchableOpacity>
      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
        <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
      <TouchableOpacity  onPress={()=>{navigation.replace('SignUp')}}>
        <Text style={{color: '#f57c00', fontWeight: '600', fontSize: 14}}>Create new User</Text>

      </TouchableOpacity>
      </View>
      </View>
      <StatusBar />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#f57c00',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#204969',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view2style:{
    backgroundColor:"#0005",
    height:400,
    width:"90%",
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center",
  },
  TextInput:{
    margin:10,
    color:"black",
    height:60,
    width:"80%",
    backgroundColor:"white",
    alignItems:"center",
    borderRadius:5,
   textAlign:"center",
  }
});
*/