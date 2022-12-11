import { StatusBar } from "expo-status-bar";
import {StyleSheet,Text,View,TextInput,Image,SafeAreaView,
} from "react-native";
import { Button } from "react-native";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import initfirebase from "./../config/index";
import { RootStackScreenProps } from "../types";

const backImage = require("../assets/images/backImage.png");

export default function SignUp({ navigation }: RootStackScreenProps<'SignUp'>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const auth = initfirebase.auth();
  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          onChangeText={(e) => {
            setEmail(e);
          }}
        ></TextInput>

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(e) => {
            setPassword(e);
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password2}
          onChangeText={(e) => {
            setPassword2(e);
          }}
        />

        <TouchableOpacity
          onPress={() => {
            if (email.length > 0 && email.includes("@"))
              if (
                password.length > 0 &&
                password === password2 &&
                password.length > 5
              ) {
                auth
                  .createUserWithEmailAndPassword(email, password)
                  .then(() => {
                    navigation.replace('Auth');
                  })
                  .catch((erreur) => {
                    alert(erreur);
                  });
              } else {
                alert("verifiez vos donnée");
              }
          }}
          style={styles.button}
        >
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace("Auth")}>
          <Text style={{ color: "#f57c00", fontWeight: "600", fontSize: 14 }}>
            {" "}
            Log In
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
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
    fontWeight: "bold",
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
    resizeMode: "cover",
  },
  whiteSheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: "#f57c00",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor:"#b9a795",
    height:400,
    width:"90%",
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center",
  },
  TextInput:{
    margin:10,
    color:"black",
    height:50,
    width:"80%",
    backgroundColor:"white",
    alignItems:"center",
    borderRadius:5,
   textAlign:"center",
  }
});*/
