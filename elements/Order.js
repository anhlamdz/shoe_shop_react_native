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

function Order({
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
    backgroundColor:COLORS.lightGray,
    borderRadius: 10,
    top:'50%',
    height:'50%'
  },
  containerLoad: {
    backgroundColor:COLORS.lightGray,
    borderRadius: 10,
    height: '50%',
    top:'50%'
  },
});

export default Order;
