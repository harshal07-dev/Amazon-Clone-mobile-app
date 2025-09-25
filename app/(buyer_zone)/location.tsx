import { AmazonEmber } from "@/utils/Constant";
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
export default function location() {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(false);
  const handleNameChange = () => {};
  const handleLocationChange = () => {}
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 20,
        gap: 14,
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ fontSize: 20, fontFamily: AmazonEmber }}>Name</Text>
      <TextInput
        value={name}
        onChangeText={handleNameChange}
        style={{
          borderColor: "black",
          padding: 8,
          fontFamily: AmazonEmber,
          borderWidth: 1,
          borderRadius: 8,
          minHeight: 50,
          textAlignVertical: "top",
          fontSize: 16,
        }}
        placeholder="Enter Delivery Location"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <AntDesign name="check-circle" size={24} color={loading ? "#747775ff" : "green"} style={{position: "absolute", right: 25, top: 65}}/> 
      
      <Text style={{fontSize: 20, fontFamily: AmazonEmber}}>Give delivery address</Text>
      <TextInput
        value={location}
        onChangeText={handleLocationChange}
        style={{
          borderColor: "black",
          padding: 8,
          fontFamily: AmazonEmber,
          borderWidth: 1,
          borderRadius: 8,
          minHeight: 100,
          textAlignVertical: "top",
          fontSize: 16,
        }}
        placeholder="Enter  Location"
        autoCapitalize="none"
        autoCorrect={false}
        
      />
      
      <AntDesign name="check-circle" size={24} color={loading ? "#747775ff" : "green"} style={{position: "absolute", right: 25, top: 65}}/> 
    </View>
  );
}
