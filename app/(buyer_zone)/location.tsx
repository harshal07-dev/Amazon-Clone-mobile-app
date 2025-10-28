import { RootState } from "@/store";
import { supabase } from "@/supabase";
import { AmazonEmber } from "@/utils/Constant";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
export default function location() {
  const session = useSelector((state: RootState) => state.auth.session);
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const fetchText = async () => {
    const [data, error] = await supabase
      .from("profiles")
      .select("location, full_name")
      .eq("id", session?.user.id)
      .single();
      if(data) {
        setLocation(data.location) 
        setName(data.full_name)
      }
      if(error) {
        console.log("Fetch Error", error)
      }
  };
  useEffect(() => {
    fetchText()
  },[])
  // const handleNameChange = (text: string) => setName(text);
  const handleNameChange = async (value: string) => {
    setLoading (true);
    setName(value)
    const {error} = await supabase.from("profiles").upsert({
      id: session?.user.id,
      full_name: value
    })
  }
  const handleLocationChange = (text: string) => setLocation(text);
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
      <View style={{ position: "relative" }}>
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
          placeholder="Name"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <AntDesign
          name="check-circle"
          size={24}
          color={loading ? "#747775ff" : "green"}
          style={{ position: "absolute", right: 10, top: 12 }}
        />
      </View>

      <Text style={{ fontSize: 20, fontFamily: AmazonEmber }}>
        Give delivery address
      </Text>
      <View style={{ position: "relative" }}>
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
          placeholder="Enter Delivery Location"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <AntDesign
          name="check-circle"
          size={24}
          color={loading ? "#747775ff" : "green"}
          style={{ position: "absolute", right: 10, bottom: 12 }}
        />
      </View>
    </View>
  );
}
