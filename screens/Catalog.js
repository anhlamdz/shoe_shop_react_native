import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
} from "react-native";
import connect from "../api/connect";
import { icons, COLORS, FONTS, SIZES, images } from "../constant";
import { BlurView } from "expo-blur";

const Catalog = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [catalog, setCatalog] = React.useState([]);
  const [search, setSearch] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [showAddToBagModal, setShowAddToBagModal] = React.useState(false);
  useEffect(() => {
    navigation.addListener("focus", async () => {
      connect.get("/Release/2").then((res) => {
        setCatalog(res.data);
      });
    });
  }, []);
  const handleSearch = (text) => {
    const tmp = catalog.shoe;
    const result = [];
    tmp.forEach((item) => {
      if (item.name.toLowerCase().includes(text.toLowerCase())) {
        result.push(item);
      }
    });
    setSearch(result);
    setQuery(text);
  };
  function renderCatalogList() {
    const renderCatalog = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setSelectedItem(item);
            setShowAddToBagModal(true);
          }}
        >
          <View style={style.dataCatalog}>
            <Image
              source={{ uri: item.img[0] }}
              resizeMode="cover"
              style={{ height: 100, width: 150, marginTop: 10, marginLeft: 5 }}
            />
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
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ flex: 1, paddingHorizontal: 19, marginTop: 20 }}>
        <FlatList
          data={query ? search : catalog.shoe}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCatalog}
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
            <Text style={style.header}>CATALOG</Text>
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
        <View style={style.label}>
          <TextInput
            style={{
              flex: 1,
              marginLeft: SIZES.font,
              fontSize: 15,
              fontWeight: "bold",
              marginLeft: 25,
            }}
            value={query}
            onChangeText={(queryText) => handleSearch(queryText)}
            placeholder="Search"
            placeholderTextColor={COLORS.gray}
          />
          {query ? (
            <TouchableOpacity
              style={{
                marginRight: 20,
                marginTop: 20,
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
      {/* Catalog list */}
      <View style={{ padding: 5 }}></View>
      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showAddToBagModal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <BlurView
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            blurType="light"
            blurAmount={20}
            reducedTransparencyFallbackColor="white"
          >
            {/* Button to close modal */}
            <TouchableOpacity
              style={style.absolute}
              onPress={() => {
                setSelectedItem(null);
                setShowAddToBagModal(false);
              }}
            ></TouchableOpacity>

            {/* Modal content */}
            <View
              style={{
                justifyContent: "center",
                width: "85%",
                backgroundColor: "black",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: -SIZES.padding * 2,
                }}
              >
                <Image
                  source={{ uri: selectedItem.img[0] }}
                  resizeMode="contain"
                  style={{
                    width: "90%",
                    height: 170,
                    transform: [{ rotate: "-10deg" }],
                  }}
                />
              </View>
              <Text
                style={{
                  marginTop: 10,
                  marginHorizontal: SIZES.padding,
                  color: COLORS.white,
                  fontSize: 20,
                  lineHeight: 30,
                }}
              >
                {selectedItem.name}
              </Text>
              <Text
                style={{
                  marginHorizontal: 5,
                  marginVertical: SIZES.padding,
                  color: COLORS.white,
                  fontSize: 15,
                }}
              >
                {selectedItem.title}
              </Text>
            </View>
          </BlurView>
        </Modal>
      )}
      {renderCatalogList()}
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
    fontSize: 25,
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
    left: 24,
    right: 24,
    shadowRadius: 10,
    shadowOpacity: 0.15,
  },
  dataCatalog: {
    backgroundColor: COLORS.white,
    height: 185,
    width: 170,
    marginHorizontal: SIZES.base,
    marginVertical: SIZES.base,
    borderRadius: 20,
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default Catalog;
