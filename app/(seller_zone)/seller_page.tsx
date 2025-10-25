import MyProductCard from "@/components/Screen/MyProductCard";
import DefaultButton from "@/components/Shared/DefaultButton";

import { RootState } from "@/store";
import { supabase } from "@/supabase";
import { Product } from "@/types";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { useSelector } from "react-redux";

export default function SellerPage() {
  const goCreateProduct = () => router.push("/create_product");
  const session = useSelector((state: RootState) => state.auth.session);
  const [myProduct, setMyProduct] = useState<Product[]>([]);
  const getMyProduct = async () => {
    const { data = [] } = await supabase
      .from("product")
      .select("*")
      .eq("user_id", session?.user.id)
      .order("created_at", { ascending: false });
    setMyProduct(data as Product[]);
  };
  useEffect(() => {
    getMyProduct();
  }, [session?.user.id]);

  const handleDeleteProduct = async (productId: number) => {
    try {
      const { error } = await supabase
        .from("product")
        .delete()
        .eq("id", productId);
      
      if (error) {
        Alert.alert("Delete Failed", "Could not delete product");
        return;
      }
      
      // Remove from local state
      setMyProduct(prev => prev.filter(p => p.id !== productId));
    } catch (error) {
      Alert.alert("Delete Failed", "Something went wrong");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: "5%",
        paddingHorizontal: 10,
        justifyContent: "flex-start",
      }}
    >
      <DefaultButton style={{ width: "100%" }} onPress={goCreateProduct}>
        Create Product
      </DefaultButton>
      {myProduct.map((product) => (
        <MyProductCard key={product.id} product={product} onDelete={handleDeleteProduct} />
      ))}
    </View>
  );
}