import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { COLORS, SIZES, icons } from "../constant";
import { auth } from "./firebase";

const ForgetPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");

  const handleForgetPassword = () => {
    auth
      .sendPasswordResetEmail(email)
      .then(
        () => alert("Password reset email sent"),
        navigation.navigate("Login")
      )
      .catch((err) => alert(err));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: "40%",
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
            top: "10%",
          }}
          onPress={() => navigation.replace("Me", { screen: "Me" })}
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
            marginBottom: 10,
          }}
        >
          Hello Again!
        </Text>
        <Text style={{ fontSize: 25 }}>Wellcome back you're </Text>
        <Text style={{ fontSize: 25, marginBottom: 40 }}>been missed!</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.labelUserName}>
          <TextInput
            style={{
              flex: 1,
              fontSize: 15,
              fontWeight: "bold",
              marginLeft: 35,
            }}
            value={email}
            onChangeText={(emailText) => setEmail(emailText)}
            placeholder="Enter Email"
            placeholderTextColor={COLORS.gray}
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
            bottom: "65%",
            left: "20%",
          }}
          onPress={() => handleForgetPassword()}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
            ForgetPassword
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
});

export default ForgetPassword;
