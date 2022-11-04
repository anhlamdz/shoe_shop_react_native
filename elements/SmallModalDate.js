import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { COLORS } from "../constant";

function SmallModalDate({
  isLoading,
  isOpen,
  onClose,
  children,
  style,
}) {
  return (
    <Modal
      visible={isOpen}
      animationType="none"
      transparent={true}
      style={style}
    >
      <TouchableOpacity
        style={{
          flex:1,
          backgroundColor:"rgba(0,0,0,0.5)",
        }}
        onPress={onClose}
      >
        <View style={styles.triangleShape}/>
        <View
          style={isLoading ? styles.containerLoad : styles.container}
        >
            {children}
         
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor:COLORS.lightGray,
    borderRadius: 10,
    width: 160,
    justifyContent: "center",
    alignItems: "center",
    top:'21%',
    left:'16%'
  },
  containerLoad: {
    padding: 10,
    backgroundColor:COLORS.lightGray,
    borderRadius: 10,
    width: 160,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    top:'21%',
    left:'16%'
  },
  triangleShape:{
    width:0,
    height:0,
    borderLeftWidth:10,
    borderRightWidth:10,
    borderBottomWidth:10,
    backgroundColor:'transparent',
    borderLeftColor:'transparent',
    borderRightColor:'transparent',
    borderBottomColor:COLORS.lightGray,
    top:'21%',
    left:'32%'
  },
});

export default SmallModalDate;
