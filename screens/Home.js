import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
import { icons, COLORS, FONTS, SIZES } from "../constant";
import connect from "../api/connect";

const Home = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [query, setQuery] = useState("");
  const [dataShoes, setDataShoes] = useState([]);

  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    navigation.addListener("focus", async () => {
      connect.get("/Release").then((res) => {
        setTabs(res.data);
        // console.log(res.data);
      });
    });
  }, []);

  useEffect(() => {
    setDataShoes(tabs[selectedTab]?.shoe);
  }, [tabs]);

  const handleSearch = (text) => {
    // const formattedQuery = text.toLowerCase();
    // console.log(tabs[0].shoe);
    const tmp = tabs[selectedTab].shoe;
    const result = [];
    tmp.forEach((item) => {
      if (item.name.toLowerCase().includes(text.toLowerCase())) {
        result.push(item);
      }
    });
    setDataShoes(result);
    setQuery(text);
  };

  function renderTabView() {
    // console.log(tabs);
    const renderTab = ({ item }) => {
      return (
        <TouchableOpacity
          style={[item.id == selectedTab ? style.buttonActive : style.button]}
          onPress={() => setSelectedTab(item.id)}
        >
          {selectedTab == item.id && (
            <Text style={{ color: COLORS.black }}>{item.name}</Text>
          )}
          {selectedTab != item.id && (
            <Text style={{ color: COLORS.gray }}>{item.name}</Text>
          )}
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ flex: 1, paddingLeft: SIZES.padding }}>
        <FlatList
          data={tabs}
          showsHorizontalScrollIndicator={false}
          renderItem={renderTab}
          horizontal
        />
      </View>
    );
  }
  function renderDataTabView() {
    var shoes = [];
    // setSelectedShoes(selectedShoes1)

    let selectedShoes = tabs.filter((a) => a.id == selectedTab);

    // console.log("haha",selectedShoes);
    if (selectedShoes.length > 0) {
      shoes = selectedShoes[0].shoe;
    }
    // console.log(shoes);
    const renderData = ({ item }) => {
      return (
        <View
          style={{
            marginVertical: 12,
            alignItems: "center",
            flex: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Product", { shoe: item })}
          >
            {/* Shoe */}
            <View style={style.shoe}>
              <View style={{ marginTop: 15, marginLeft: 5 }}>
                <Image
                  source={{ uri: item.img[0] }}
                  resizeMode="cover"
                  style={{
                    height: 100,
                    width: 150,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  marginLeft: 10,
                  marginTop: 10,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  position: "absolute",
                  bottom: 15,
                  color: "red",
                  marginLeft: 20,
                }}
              >
                {" "}
                ${item.retail} -{" "}
                <Text
                  style={{
                    fontSize: 12,
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    position: "absolute",
                    bottom: 20,
                    color: "gray",
                    marginLeft: 20,
                    textDecorationLine: "line-through",
                  }}
                >
                  {item.resell}
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <View>
        <FlatList
          data={query ? dataShoes : shoes}
          renderItem={renderData}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* header */}
      <View
        style={{
          height: "18%",
          width: "100%",
          backgroundColor: COLORS.black,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <View style={{ flexDirection: "row", height: "70%" }}>
          <View style={{ width: "60%", height: "100%" }}>
            <Text style={style.header}>HOME</Text>
          </View>
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

        {/* search */}
        <View style={style.label}>
          <TextInput
            style={{
              flex: 1,
              marginLeft: SIZES.font,
              fontSize: 15,
              fontWeight: "bold",
              marginLeft: 35,
            }}
            value={query}
            onChangeText={(queryText) => handleSearch(queryText)}
            placeholder="Search"
            placeholderTextColor={COLORS.gray}
          />
          {query ? (
            <TouchableOpacity
              style={{
                marginTop: 20,
                marginRight: 15,
              }}
              onPress={() => setQuery("")}
            >
              <Image
                source={icons.clear}
                resizeMode="cover"
                style={{ height: 20, width: 20, tintColor: COLORS.gray }}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </View>
      {/* product */}
      <View style={{ padding: 15 }}></View>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 15,
            paddingBottom: SIZES.base,
          }}
        >
          {renderTabView()}
        </View>
        <View style={{ marginHorizontal: 10 }}>{renderDataTabView()}</View>
      </ScrollView>
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
    fontSize: 30,
    paddingLeft: SIZES.body1,
    paddingTop: SIZES.body1 + 15,
    fontWeight: "700",
    letterSpacing: 3,
  },
  label: {
    position: "absolute",
    backgroundColor: COLORS.white,
    borderRadius: 35,
    height: 60,
    flexDirection: "row",
    top: "76%",
    left: SIZES.padding,
    right: SIZES.padding,
    shadowRadius: 10,
    shadowOpacity: 0.15,
  },
  releasesList: {
    flexDirection: "row",
    marginTop: SIZES.padding + 6,
    marginBottom: SIZES.radius + 8,
    justifyContent: "space-between",
  },
  buttonActive: {
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 110,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.black,
    marginTop: 15,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 110,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gray,
    marginTop: 15,
  },
  shoe: {
    backgroundColor: COLORS.white,
    height: 200,
    width: 170,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 20,
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
});
export default Home;
