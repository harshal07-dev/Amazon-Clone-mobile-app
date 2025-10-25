import { Product } from "@/types";
import { AmazonEmber } from "@/utils/Constant";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  product: Product;
  onDelete: (productId: number) => void;
}

export default function MyProductCard({ product, onDelete }: Props) {
    const productDelete = async () => {
        onDelete(product.id);
    }
  return (
    <View
      style={{
        height: 70,
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#d8d8d8ff",
        marginTop: 20,
        paddingVertical: 14,
        borderRadius: 10,
      }}
    >
      <Image
        source={{ uri: product.imageUrl ?? "" }}
        style={{
          objectFit: "contain",
          height: 50,
          width: 70,
          alignSelf: "center",
          borderRadius: 20,
        }}
      />
      <Text
        style={{
          fontSize: 16,
          alignSelf: "flex-start",
          width: 110,
          flexWrap: "wrap",
          fontFamily: AmazonEmber,
        }}
      >
        {product.name.split(" ").length > 8
          ? product.name.split(" ").slice(0, 8).join(" ") + "..."
          : product.name}
      </Text>

      <Text
        style={{
          fontSize: 14,
          alignSelf: "flex-start",
          width: 80,
          flexWrap: "wrap",
          fontFamily: AmazonEmber,
        }}
      >{`D.P ₹${product.currentPrice}`}</Text>

      <Text
        style={{
          fontSize: 14,
          alignSelf: "flex-start",
          width: 80,
          flexWrap: "wrap",
          fontFamily: AmazonEmber,
        }}
      >{`D.P ₹${product.deliveryPrice}`}</Text>
      <TouchableOpacity onPress={productDelete}>
        <AntDesign
          name="delete"
          size={22}
          color="red"
          style={{ alignSelf: "flex-start" }}
        />
      </TouchableOpacity>
    </View>
  );
}
