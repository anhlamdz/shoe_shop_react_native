import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import { icons, COLORS, FONTS, SIZES, images } from "../constant";
import connect from "../api/connect";

const Feeds = ({ navigation }) => {
  const [post, setPost] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [like, setLike] = React.useState(null);

  useEffect(() => {
    connect.get("/NewFeeds").then((res) => {
      setPost(res.data);
      setSearchData(res.data);
      // console.log(res.data);
    });
  }, []);

  function renderNewFeeds() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          marginVertical: 15,
          marginHorizontal: 20,
          height: 500,
          width: 380,
          backgroundColor: COLORS.white,
          borderRadius: 30,
          shadowOpacity: 0.35,
          shadowRadius: 10,
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Image
            source={{ uri: item.post[0].img }}
            resizeMode="cover"
            style={{
              width: "100%",
              height: 380,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}
          />
          <View style={{ flexDirection: "row", height: "10%" }}>
            <Image
              source={{ uri: item.avatar }}
              resizeMode="cover"
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                marginTop: 10,
                marginLeft: 20,
              }}
            />
            <Text
              style={{
                marginLeft: 10,
                marginTop: 15,
                ...FONTS.body3,
                fontWeight: "bold",
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                marginLeft: 160,
                marginTop: 10,
                ...FONTS.body4,
                color: COLORS.gray,
              }}
            >
              {item.post[0].time}
            </Text>
          </View>
          <View style={{ height: "6%" }}>
            <Text style={{ marginLeft: 30, fontSize: 16 }}>
              {item.post[0].title}
            </Text>
          </View>
          <View
            style={{
              height: 40,
              backgroundColor: COLORS.white,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              flexDirection: "row-reverse",
            }}
          >
            <TouchableOpacity
              style={{
                width: "50%",
                alignItems: "center",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Image
                source={icons.comment}
                resizeMode="cover"
                style={{ height: 30, width: 30 }}
              />
              <Text style={{ marginLeft: 10, fontSize: 17 }}>
                {item.post[0].cmt}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "50%",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
              onPress={() => setLike(!like)}
            >
              <Image
                source={like ? icons.liked : icons.notLike}
                style={{ height: 35, width: 35 }}
              />
              <Text style={{ marginLeft: 10, fontSize: 17 }}>
                {item.post[0].like}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={post}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* header */}
      <View
        style={{
          height: "13%",
          width: "100%",
          backgroundColor: COLORS.black,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <View>
          <View style={{ width: "60%", height: "100%" }}>
            <Text style={style.header}>Feeds</Text>
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
      {/* New Feeds */}
      {renderNewFeeds()}
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 590,
          right: 20,
          backgroundColor: "red",
          borderRadius: 25,
          height: 50,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={icons.add}
          resizeMode="cover"
          style={{ height: 25, width: 25 }}
        />
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    color: COLORS.white,
    ...FONTS.h1,
    fontSize: 25,
    paddingLeft: SIZES.body1,
    marginTop: 40,
    fontWeight: "700",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  label: {
    position: "absolute",
    backgroundColor: COLORS.white,
    borderRadius: 35,
    height: 60,
    top: "76%",
    left: SIZES.padding,
    right: SIZES.padding,
    shadowRadius: 10,
    shadowOpacity: 0.15,
  },
});
export default Feeds;
