import { AmazonEmber } from "@/utils/Constant";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
export function DeliveryLocation ()  {
  return (
    <TouchableOpacity onPress={() => router.push("/(buyer_zone)/location")}>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          backgroundColor: "#c7e8f0",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: 15,
        }}
      >
        <Ionicons name="location-outline" color={"black"} size={24} />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 16,
            textAlign: "center",
            color: "black",
            fontWeight: "normal",
            fontFamily: AmazonEmber,
          }}
        >
          Deliver to
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: "black",
            fontWeight: "normal",
            fontFamily: AmazonEmber,
          }}
        >Select Location</Text>
        <Ionicons name="chevron-down" color={"black"} size={18}/>
      </View>
    </TouchableOpacity>
  );
};

export default DeliveryLocation;
