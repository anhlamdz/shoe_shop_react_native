import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from "react-native";
import { icons, COLORS, FONTS, SIZES } from "../constant";
import connect from "../api/connect";
import { auth } from "./firebase";
const MyPurchases = ({ navigation }) => {
  const [user, setUser] = React.useState([]);
  useEffect(() => {
    navigation.addListener("focus", async () => {
      getData();
    });
  }, []);

  const getData = () => {
    connect.get("/User").then((res) => {
      setUser(res.data);
    });
  };

  function renderMyCart() {
    var data = [];
    let selectedShoes = user.filter(
      (a) => a.email.toLowerCase() == auth.currentUser?.email
    );
    if (selectedShoes.length > 0) {
      data = selectedShoes[0].shoe;
    }
    const renderData = ({ item }) => {
      return (
        <View
          style={{
            marginVertical: SIZES.base,
            alignItems: "center",
          }}
        >
          <View style={style.shoe}>
            {/* Shoe */}
            <View style={{ height: "95%", width: 150, paddingTop: 55 }}>
              <Image
                source={{ uri: item.itemCart.img[0] }}
                resizeMode="cover"
                style={{ height: 100, width: 150 }}
              />
            </View>
            <View
              style={{
                height: "100%",
                width: "62%",
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  width: "95%",
                  height: "50%",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textTransform: "uppercase",
                    fontSize: SIZES.h3,
                    marginTop: 15,
                    fontWeight: "bold",
                  }}
                >
                  {item.itemCart.name}
                </Text>
              </View>
              <View
                style={{
                  height: "20%",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    textTransform: "uppercase",
                    fontSize: 13,
                    color: COLORS.gray,
                    fontWeight: "bold",
                    marginTop: 5,
                    marginLeft: 15,
                  }}
                >
                  Size {item.itemCart.size}
                </Text>
                <Text
                  style={{
                    textTransform: "uppercase",
                    fontSize: 13,
                    color: COLORS.gray,
                    fontWeight: "bold",
                    marginTop: 5,
                    marginLeft: 15,
                  }}
                >
                  quality: {item.quality}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  position: "absolute",
                  width: "99%",
                  height: "35%",
                  bottom: 0,
                }}
              >
                <Text
                  style={{
                    textTransform: "uppercase",
                    fontSize: 25,
                    fontWeight: "bold",
                    marginTop: 10,
                    color: "red",
                    marginLeft: 10,
                  }}
                >
                  ${item.itemCart.retail}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    };

    return <FlatList data={data} renderItem={renderData} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightGray }}>
      <View
        style={{
          height: "10%",
          width: "100%",
          backgroundColor: COLORS.black,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={style.header}>My Purchases</Text>
      </View>
      <TouchableOpacity
        style={{
          width: 50,
          height: 30,
          position: "absolute",
          left: 20,
          marginTop: 25,
        }}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={icons.back}
          resizeMode="cover"
          style={{
            height: 25,
            width: 15,
            tintColor: COLORS.white,
          }}
        />
      </TouchableOpacity>
      <View style={{ marginBottom: "20%" }}>{renderMyCart()}</View>
    </View>
  );
};
const style = StyleSheet.create({
  header: {
    color: COLORS.white,
    lineHeight: 36,
    fontSize: 25,
    fontWeight: "700",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  shoe: {
    flexDirection: "row",
    borderRadius: 30,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    height: 160,
    width: "92%",
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
});
export default MyPurchases;
