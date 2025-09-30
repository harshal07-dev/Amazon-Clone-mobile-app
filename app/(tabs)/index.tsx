import HomeCarousel from "@/components/Screen/HomeCarousel";
import HomeSuggestion from "@/components/Screen/Homesuggestion";
import ProductDealCard from "@/components/Screen/ProductDealCard";
import DefaultButton from "@/components/Shared/DefaultButton";
import DeliveryLocation from "@/components/Shared/DeliveryLocation";
import { HeaderTabsProps } from "@/components/Shared/header/HeaderTabs";
import { deals } from "@/dummy_data/product_deal";
import { Product } from "@/types";
import { AmazonEmberBold } from "@/utils/Constant";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

export default function Home() {
  const navigation = useNavigation();
  const session = true;

  const tabs: HeaderTabsProps["tabs"] = [
    {
      active: true,
      title: "Alexa Lists",
      onPress: () => Alert.alert("Alexa Lists"),
    },
    {
      title: "Prime",
      onPress: () => Alert.alert("Prime"),
    },
    {
      title: "Video",
      onPress: () => Alert.alert("Video"),
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerSearchShown: true,
      headerTabsProps: { tabs },
    });
  }, [navigation, tabs]);

  const onProductPress = ({id}: Product) => {
    router.push({ pathname: "/(search)/product/[id]", params: { id: String(id) } });
  }

  const onClickAuth = () => router.push("/(auth)")
  return (
    <ScrollView
      scrollEnabled
      contentContainerStyle={{
        paddingBottom: 10,
      }}
      showsVerticalScrollIndicator={false}
    >
      <DeliveryLocation />
      <HomeCarousel />
      <HomeSuggestion />
      <View
        style={{
          marginTop: "40%",
          backgroundColor: "white",
          width: "100%",
          gap: 20,
          padding: 20,
        }}
      >
        <Text
          style={{
            alignItems: "flex-start",
            fontFamily: AmazonEmberBold,
            fontSize: 20,
          }}
        >
          {session
            ? "Deals for you"
            : "Sign in for your best experience"}
        </Text>
        {!session ? (
          <View
            style={{
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {deals.map((product) => (
              <ProductDealCard key={product.id} product={product} onPress={() => onProductPress(product)}/>
            ))}
          </View>
        ): (<DefaultButton onPress={onClickAuth}>Sign in Securely</DefaultButton>)}
      </View>
    </ScrollView>
  );
}
