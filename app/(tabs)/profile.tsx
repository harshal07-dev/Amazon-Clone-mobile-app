import ProfileUnauthoredBanner from "@/components/Screen/ProfileUnauthoredBanner";
import DefaultButton from "@/components/Shared/DefaultButton";
import { AmazonEmber } from "@/utils/Constant";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useCallback, useRef } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function Profile() {
  const session = false;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const openSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  const onClickLogin = () => router.push("/(auth)");
  const onClickSignUp = () => router.push("/(auth)/signup");
  return (
    <ScrollView contentContainerStyle={{ backgroundColor: "white" }}>
      {session ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
            gap: 20,
          }}
        >
          <Pressable onPress={openSheet}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                height: 40,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  height: 30,
                  width: 30,
                  marginHorizontal: 10,
                  borderRadius: 50,
                  backgroundColor: "gray",
                }}
              />
              <Text style={{ fontSize: 18, fontFamily: AmazonEmber }}>
                Hello user!
              </Text>
              <Ionicons name="chevron-down" size={20} />
            </View>
          </Pressable>
        </View>
      ) : (
        <View
          style={{ flex: 1, paddingTop: 40, alignItems: "center", gap: 45 }}
        >
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              gap: 40,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 24,
                fontFamily: AmazonEmber,
              }}
            >
              Sign in for the optimal experience
            </Text>
            <View style={{width: "90%", gap: 15}}>
              <DefaultButton onPress={onClickLogin}>Sign In</DefaultButton>
              <DefaultButton onPress={onClickSignUp} variant="secondary">Create account</DefaultButton>
            </View>
          </View>
          <ProfileUnauthoredBanner/>
        </View>
      )}
    </ScrollView>
  );
}
