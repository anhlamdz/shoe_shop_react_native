import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FONTS, SIZES, COLORS } from "../constant";

const StepInput = ({ style, value = 1, onAdd, onMinus }) => {
  return (
    <View
      style={{
        marginTop: 15,
        height: "45%",
        width: "60%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          height: 25,
          width: "80%",
          borderRadius: 15,
          backgroundColor: COLORS.lightGray,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.gray,
            bottom: "2%",
          }}
          onPress={onMinus}
        >
          <Text style={{ color: COLORS.white }}>-</Text>
        </TouchableOpacity>
        <Text style={{ top: "3%" }}>{value}</Text>
        <TouchableOpacity
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "red",
            bottom: "2%",
          }}
          onPress={onAdd}
        >
          <Text style={{ color: COLORS.white }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default StepInput;
