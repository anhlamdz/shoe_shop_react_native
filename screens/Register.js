import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import connect from "../api/connect";
import { COLORS, SIZES, icons } from "../constant";
import { auth } from "./firebase";
const Register = ({ navigation }) => {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleRegister = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((useCredentials) => {
        const user = useCredentials.user;
        console.log(user.email);
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
    connect.post("/User", { email, password });
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          height: "35%",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            height: 30,
            position: "absolute",
            left: 20,
            top: "15%",
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            resizeMode="cover"
            style={{
              height: 25,
              width: 15,
              tintColor: COLORS.black,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginBottom: 30,
          }}
        >
          Create Account
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.labelEmail}>
          <TextInput
            style={{
              flex: 1,
              fontSize: 15,
              fontWeight: "bold",
              marginLeft: 35,
            }}
            value={email}
            placeholder="Email"
            onChangeText={(emailText) => setEmail(emailText)}
            placeholderTextColor={COLORS.gray}
          />
        </View>
        <View style={styles.labelPassWord}>
          <TextInput
            style={{
              flex: 1,
              fontSize: 15,
              fontWeight: "bold",
              marginLeft: 35,
            }}
            value={password}
            onChangeText={(passwordText) => setPassword(passwordText)}
            placeholder="Password"
            placeholderTextColor={COLORS.gray}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          style={{
            height: 60,
            width: "60%",
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            position: "absolute",
            bottom: "40%",
            left: "20%",
          }}
          onPress={handleRegister}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  labelUserName: {
    position: "absolute",
    backgroundColor: COLORS.white,
    borderRadius: 35,
    height: 60,
    flexDirection: "row",
    left: 24,
    right: 24,
    shadowRadius: 10,
    shadowOpacity: 0.15,
  },
  labelPassWord: {
    position: "absolute",
    backgroundColor: COLORS.white,
    borderRadius: 35,
    height: 60,
    flexDirection: "row",
    top: "30%",
    left: 24,
    right: 24,
    shadowRadius: 10,
    shadowOpacity: 0.15,
  },
  labelEmail: {
    position: "absolute",
    backgroundColor: COLORS.white,
    borderRadius: 35,
    height: 60,
    flexDirection: "row",
    top: "15%",
    left: 24,
    right: 24,
    shadowRadius: 10,
    shadowOpacity: 0.15,
  },
});

export default Register;
