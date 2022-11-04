import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from "react-native";
import { icons, COLORS, FONTS, SIZES } from "../constant";
import connect from "../api/connect";
import StepInput from "../elements/StepInput";
import { SwipeListView } from "react-native-swipe-list-view";
import { auth } from "./firebase";
const MyCart = ({ navigation }) => {
  const [cart, setCart] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(true);
  const [total, setTotal] = React.useState();
  const [user, setUser] = React.useState([]);
  useEffect(() => {
    navigation.addListener("focus", async () => {
      getData();
    });
  }, []);

  useEffect(() => {
    const sum = cart.reduce(
      (c, v) => (c = c + v.itemCart.retail * v.quality),
      0
    );
    setTotal(sum);
  }, [cart]);
  const getData = () => {
    connect.get("/Cart").then((res) => {
      setCart(res.data);
      setRefreshing(false);
    });
    connect.get("/User").then((res) => {
      setUser(res.data);
    });
  };
  const onRefresh = () => {
    setCart([]);
    getData();
  };
  function HandleUpdateQuality(newQuality, id) {
    const newMyCartList = cart.map((c) =>
      c.id === id ? { ...c, quality: newQuality } : c
    );
    setCart(newMyCartList);
  }
  function removeMyCartHandle(name) {
    let newMyCartList = [...cart];
    const index = newMyCartList.find((data) => data.itemCart.name === name);
    connect
      .delete("/Cart/" + index.id)
      .then(function (res) {
        console.log("delete item");
      })
      .catch(function (error) {
        Alert.alert(error.message);
      });
    getData();
  }

  function renderMyCart() {
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
                <StepInput
                  value={item.quality}
                  onAdd={() => HandleUpdateQuality(item.quality + 1, item.id)}
                  onMinus={() => {
                    if (item.quality > 1) {
                      HandleUpdateQuality(item.quality - 1, item.id);
                    }
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      );
    };
    const renderHiddenItem = (data, rowMap) => {
      return (
        <View
          style={{
            borderRadius: 30,
            backgroundColor: "red",
            height: 160,
            width: "91%",
            marginTop: 8,
            marginLeft: 17,
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              right: "3%",

              marginTop: 60,
              height: 50,
              width: 50,
            }}
            onPress={() => removeMyCartHandle(data.item.itemCart.name)}
          >
            <Image
              source={icons.bin}
              resizeMode="cover"
              style={{
                height: 35,
                width: 35,
              }}
            />
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <View>
        {refreshing ? (
          <ActivityIndicator />
        ) : (
          <View>
            <SwipeListView
              data={cart}
              renderItem={renderData}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              disableRightSwipe={true}
              rightOpenValue={-75}
              renderHiddenItem={renderHiddenItem}
            />
          </View>
        )}
      </View>
    );
  }
  const handlePutAndDelete = () => {
    const isUser = [...user];
    const index = isUser.find(
      (data) => data.email.toLowerCase() === auth.currentUser?.email
    );
    var order = {
      ...index,
      shoe: [...cart],
    };
    connect
      .put("/User/" + index.id, order)
      .then((res) => console.log(order))
      .catch((err) => err.message);
    const postIdsArray = cart.map((item) => item.id);
    for (var i = 0; i < postIdsArray.length; i++) {
      connect
        .delete("/Cart/" + postIdsArray[i])
        .then((res) => console.log("delete item" + [i]))
        .catch((error) => error.message);
    }
    navigation.replace("Home");
    Alert.alert("Thank you for purchases");
  };
  const Checkout = () => {
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
        <TouchableOpacity
          style={{
            width: "70%",
            height: "50%",
            backgroundColor: COLORS.black,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Checkout
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={{
          width: "70%",
          height: "50%",
          backgroundColor: COLORS.black,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
        }}
        onPress={() => {
          handlePutAndDelete();
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Checkout
        </Text>
      </TouchableOpacity>
    );
  };
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
        <Text style={style.header}>MyCart</Text>
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
      <View style={{ marginBottom: "10%", height: "80%" }}>
        {renderMyCart()}
      </View>

      <View
        style={{
          height: "10%",
          width: "100%",
          backgroundColor: "red",
          position: "absolute",
          bottom: 0,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: "30%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: COLORS.white,
            }}
          >
            $ {total}
          </Text>
        </View>
        <View
          style={{
            width: "70%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Checkout()}
        </View>
      </View>
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
export default MyCart;
