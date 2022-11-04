import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS, SIZES, icons } from "../constant";
import { auth } from "./firebase";

const Me = () => {
  const navigation = useNavigation();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container}>
        {/* header */}
        <View
          style={{
            height: "20%",
            width: "100%",
            backgroundColor: COLORS.black,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                height: 70,
                width: 200,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
                marginLeft: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 80,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  marginHorizontal: 10,
                  backgroundColor: "red",
                }}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={{ fontWeight: "bold", color: COLORS.white }}>
                  Sign In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 80,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  marginHorizontal: 10,
                  backgroundColor: COLORS.white,
                }}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={{ color: "red", fontWeight: "bold" }}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <View style={styles.container}>
      {/* header */}
      <View
        style={{
          height: "20%",
          width: "100%",
          backgroundColor: COLORS.black,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <View>
          <View style={{ width: "60%", height: "100%" }}>
            <Image />
            <Text style={styles.header}>HI</Text>
            <Text
              style={{
                color: COLORS.white,
                fontSize: 18,
                paddingLeft: SIZES.body1,
                fontWeight: "700",
              }}
            >
              {auth.currentUser?.email}
            </Text>
          </View>
          <TouchableOpacity
            style={{ position: "absolute", right: 35, marginTop: 45 }}
            onPress={() => navigation.navigate("MyCart")}
          >
            <Image
              source={icons.cart}
              resizeMode="cover"
              style={{ height: 25, width: 25, tintColor: "white" }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ borderBottomWidth: 1, height: "10%" }}>
          <TouchableOpacity
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              marginHorizontal: 20,
              marginTop: 15,
            }}
            activeOpacity="0.5"
            onPress={() => navigation.navigate("MyPurchases")}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              My Purchases
            </Text>
            <Text style={{ fontSize: 16 }}>View Purchases History</Text>
          </TouchableOpacity>
        </View>
        <View style={{ borderBottomWidth: 1, height: "10%" }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
              marginTop: 15,
            }}
            activeOpacity="0.5"
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Change Password
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: "10%" }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
              marginTop: 15,
            }}
            activeOpacity="0.5"
            onPress={handleSignOut}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Sign out</Text>
          </TouchableOpacity>
        </View>
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
  header: {
    color: COLORS.white,
    fontSize: 25,
    paddingLeft: SIZES.body1,
    marginTop: 40,
    fontWeight: "700",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
});

export default Me;
