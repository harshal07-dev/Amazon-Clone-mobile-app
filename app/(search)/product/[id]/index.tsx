import DefaultButton from "@/components/Shared/DefaultButton";
import { supabase } from "@/supabase";
import { Product } from "@/types";
import { deliveryDate } from "@/utils/deliveryDate";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
export default function ProductPage() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectOpen, setSelectOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const fetchProducts = useCallback(async () => {
    try {
      const { data = null } = await supabase
        .from("product")
        .select("*")
        .eq("id", id)
        .single();
      if (!data) router.back();
      setProduct(data);
    } catch (error) {
      console.log("error", error);
    }
  }, [id]);

  const onViewType = (viewType: "3D" | "AR") => {
    router.push(`/product/[id]/${viewType}?modelUrl=${product?.model3DUrl}`);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (!product) return null;
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          backgroundColor: "white",
          gap: 20,
        }}
      >
        <Text style={{ color: "#4b5563", fontSize: 20, fontWeight: "500" }}>
          {product.name}
        </Text>
        <Image
          source={{
            uri: product.imageUrl ?? "",
          }}
          style={{
            height: 300,
            resizeMode: "contain",
            width: "100%",
            backgroundColor: "#f8f8f8",
          }}
        />

        <View
          style={{
            flexDirection: "row",
            gap: 15,
            marginVertical: 20,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: "#0e4bd3",
              backgroundColor: "white",
              paddingVertical: 12,
              paddingHorizontal: 16,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              justifyContent: "center",
            }}
            onPress={() =>
              product.model3DUrl ? onViewType("3D") : console.log("No 3D model")
            }
          >
            <MaterialCommunityIcons
              name="rotate-3d"
              size={20}
              color="#0e4bd3"
            />
            <Text style={{ color: "#0e4bd3", fontSize: 14, fontWeight: "500" }}>
              VIEW IN 3D
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: "#0e4bd3",
              backgroundColor: "white",
              paddingVertical: 12,
              paddingHorizontal: 16,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              justifyContent: "center",
            }}
            onPress={() =>
              product.model3DUrl ? onViewType("AR") : console.log("No 3D model")
            }
          >
            <MaterialCommunityIcons
              name="view-grid"
              size={20}
              color="#0e4bd3"
            />
            <Text style={{ color: "#0e4bd3", fontSize: 14, fontWeight: "500" }}>
              VIEW IN YOUR ROOM
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={{ color: "red", fontSize: 24, fontWeight: "600" }}>
              -
              {product.previousPrice > 0
                ? Math.round(
                    ((product.previousPrice - product.currentPrice) /
                      product.previousPrice) *
                      100
                  )
                : 0}
            </Text>
          </View>
          <Text style={{ fontSize: 28, fontWeight: "bold" }}>
            ₹{product.currentPrice}
          </Text>
          <Text
            style={{
              textDecorationLine: "line-through",
              color: "#6b7280",
              fontSize: 16,
            }}
          >
            RRP: ₹{product.previousPrice}
          </Text>
          {product.isAmazonChoice && (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <MaterialCommunityIcons
                name="check-circle"
                size={20}
                color="#00b2f8ff"
              />
              <Text
                style={{
                  color: "dodgerblue",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                prime
              </Text>
            </View>
          )}
          <Text>
            The prices of products sold on Amazon include GST. Depending on your
            delivery address, GST may vary at the checkout.
          </Text>
          <View style={{ flexDirection: "row", marginVertical: 20 }}>
            <Text>
              {product.deliveryPrice === 0
                ? "Free"
                : `₹${product.deliveryPrice} Delivery`}{" "}
            </Text>
            <Text style={{ fontWeight: "bold" }}>
              {deliveryDate(product.deliveryInDays)}
            </Text>
          </View>
          <View style={{ gap: 20, marginBottom: 30 }}>
            {product.amountInStock > 20 ? (
              <Text style={{ fontSize: 20, color: "green" }}>In Stock</Text>
            ) : (
              <Text style={{ fontSize: 20, color: "red" }}>
                {product.amountInStock} In-stock
              </Text>
            )}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 15,
                backgroundColor: "#eee",
                borderRadius: 8
              }} onPress={() => setSelectOpen((prev) => !prev)}
            ><Text>Quantity {quantity}</Text>
            <Entypo name="chevron-down" size={24} color="black" />
            </TouchableOpacity>
            <DefaultButton onPress={()=>console.log("Added to cart")}>Add to cart</DefaultButton>
            <DefaultButton style={{backgroundColor: "#f97316"}} 
            onPress={()=> router.push({
                pathname: "/(buyer_zone)/buy_here",
                params: {
                  name: product.name,
                  quantity: quantity,
                  deliveryInDays: product.deliveryInDays,
                  productImage: product.imageUrl,
                  deliveryCharge: product.deliveryPrice - product.currentPrice,
                  currentPrice: product.currentPrice,
                  achoice:  String(product.isAmazonChoice),
                  deliveryPrice: product.deliveryPrice
                }
            })}>Buy now</DefaultButton>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
