import React, { useEffect, useRef, useCallback } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { icons, FONTS, SIZES, COLORS } from "../constant";
import connect from "../api/connect";
const Product = ({ route, navigation }) => {
  const [shoe, setShoe] = React.useState(null);
  const [selectedShoe, setSelectedShoe] = React.useState();
  const [cart, setCart] = React.useState([]);
  const [showMore, setShowMore] = React.useState(false);
  const [selectedSize, setSelectedSize] = React.useState();
  const [on, setOn] = React.useState(true);

  React.useEffect(() => {
    let { shoe } = route.params;
    setShoe(shoe);
  }, [shoe]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    connect.get("/Cart").then((res) => {
      setCart(res.data);
    });
  };
  const handleAddToCart = (item) => {
    var check = -1;
    for (var i = 0; i < cart.length; i++) {
      if (
        cart[i].itemCart.name == item.name &&
        cart[i].itemCart.size == selectedSize
      ) {
        check = i;
        Alert.alert("Products already in the cart");
      }
    }
    if (check == -1) {
      var itemCart = {
        ...item,
        size: selectedSize,
      };

      connect
        .post("/Cart", { itemCart, quality: 1 })
        .then(function (res) {
          Alert.alert("Add to cart successful!");
        })
        .catch(function (error) {
          Alert.alert("Products already in the cart");
        });
      connect.get("/Cart").then((res) => {
        setCart(res.data);
      });
    }
  };

  function renderInfoShoe() {
    return (
      <View style={{ height: 370 }}>
        <View
          style={{
            alignItems: "center",
            height: 250,
            justifyContent: "center",
            marginTop: 25,
            marginBottom: 5,
          }}
        >
          <Image
            source={{ uri: selectedShoe ? selectedShoe : shoe.img[0] }}
            resizeMode="cover"
            style={{ height: 200, width: 275 }}
          />
        </View>
        <View style={{ marginHorizontal: 15 }}>
          <FlatList
            data={shoe.img}
            renderItem={({ item }) => {
              return (
                <View style={{ marginHorizontal: 5 }}>
                  <TouchableOpacity
                    style={selectedShoe == item ? styles.onclick : styles.click}
                    onPress={() => {
                      setSelectedShoe(item);
                    }}
                  >
                    <Image
                      source={{ uri: item }}
                      resizeMode="cover"
                      style={{ height: 55, width: 75 }}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
            horizontal
          />
        </View>
      </View>
    );
  }
  function Size() {
    const showSize = ({ item }) => {
      return (
        <TouchableOpacity
          style={
            selectedSize == item ? styles.buttonSizeSelected : styles.buttonSize
          }
          onPress={() => {
            setSelectedSize(item), setOn(false);
          }}
        >
          <Text
            style={
              selectedSize == item
                ? { color: COLORS.white }
                : { color: COLORS.black }
            }
          >
            {item}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <View>
        <FlatList
          data={shoe.size}
          showsHorizontalScrollIndicator={false}
          renderItem={showSize}
          horizontal
        />
      </View>
    );
  }
  if (shoe) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{ marginBottom: 80 }}>
            {renderInfoShoe()}
            <TouchableOpacity
              style={{
                width: 50,
                height: 30,
                marginLeft: 10,
                borderRadius: 15,
                position: "absolute",
                top: "3%",
                alignItems: "center",
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
            <TouchableOpacity
              style={{
                marginTop: 17,
                borderRadius: 15,
                position: "absolute",
                right: "8%",
              }}
              onPress={() => navigation.navigate("MyCart")}
            >
              <Image
                source={icons.cart}
                resizeMode="cover"
                style={{ height: 25, width: 25 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                marginLeft: 15,
              }}
            >
              {shoe.name}
            </Text>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 22,
                  color: "gray",
                  textDecorationLine: "line-through",
                  marginLeft: 25,
                }}
              >
                ${shoe.resell}
              </Text>
              <Text style={{ fontSize: 22, color: "red" }}>
                {" "}
                ${shoe.retail}
              </Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 15,
                  width: 300,
                  fontWeight: "bold",
                  marginLeft: 15,
                  marginBottom: 15,
                }}
              >
                Select Size
              </Text>
              {Size()}
            </View>

            <Text
              style={{
                fontSize: 15,
                width: 300,
                fontWeight: "bold",
                marginLeft: 15,
                marginBottom: 5,
              }}
            >
              Product Details
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginHorizontal: 15,
                color: COLORS.gray,
              }}
              numberOfLines={showMore ? 0 : 3}
            >
              {shoe.title}
            </Text>
            <TouchableOpacity
              onPress={() => setShowMore(!showMore)}
              style={{ alignItems: "center" }}
            >
              <Text style={{ fontSize: 13 }}>
                {showMore ? "Show Less" : "Show More"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{
            height: 60,
            width: "80%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            backgroundColor: on == false ? "red" : COLORS.gray,
            position: "absolute",
            bottom: 10,
            marginLeft: 100,
          }}
          disabled={on}
          onPress={() => {
            on == false
              ? handleAddToCart(shoe)
              : Alert.alert("Haven't chosen a size yet!!!");
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
              textTransform: "uppercase",
            }}
          >
            Add To Cart
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else {
    return <></>;
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  click: {
    backgroundColor: "#dcdcdc",
    borderRadius: 5,
    width: 85,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowOpacity: 0.05,
  },
  onclick: {
    backgroundColor: "#dcdcdc",
    borderRadius: 5,
    width: 85,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    shadowRadius: 10,
    shadowOpacity: 0.05,
    borderColor: "orange",
  },
  label: {
    backgroundColor: COLORS.white,
    borderRadius: 35,
    height: 60,
    marginLeft: 20,
    marginRight: 20,
    shadowRadius: 10,
    shadowOpacity: 0.15,
    marginTop: 40,
  },
  buttonAddToCart: {
    height: 60,
    width: 150,
    backgroundColor: "#3cb371",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
    borderRadius: 10,
  },

  buttonOrder: {
    marginHorizontal: 20,
    height: 30,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonOrderSelect: {
    marginHorizontal: 20,
    height: 30,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#4169e1",
  },
  buttonSize: {
    borderColor: COLORS.gray,
    marginLeft: 20,
    borderWidth: 0.5,
    borderRadius: 10,
    height: 30,
    width: 50,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSizeSelected: {
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    width: 50,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
export default Product;
