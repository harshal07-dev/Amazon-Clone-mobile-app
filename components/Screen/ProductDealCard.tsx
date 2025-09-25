import { Product } from "@/types";
import { AmazonEmber } from "@/utils/Constant";
import { offPercentage } from "@/utils/offPercentage";
import { Dimensions, Image, Pressable, Text, View } from "react-native";

interface Props {
  product: Product;
  onPress: VoidFunction;
}

export default function ProductDealCard({ product, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          width: Dimensions.get("window").width / 2 - 30,
          height: 180,
          marginBottom: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            padding: 5,
            width: "100%",
            height: "80%",
            borderRadius: 4,
            backgroundColor: "rgba(0,0,0,0.1)",
          }}
        >
          <Image
            source={{ uri: product.imageUrl }}
            style={{ objectFit: "contain" , 
                width: "100%",
                height: "100%"
            }}
          />
        </View>
        <View style={{flexDirection: "row", gap: 10,
            justifyContent: "space-between",
            alignItems: "center"
        }}><Text style={{
            borderRadius: 4,
            paddingHorizontal: 6,
            paddingVertical: 4,
            backgroundColor: "red",
            color: "white",
            fontWeight: "bold",
            fontSize: 11
        }}>{offPercentage(product.currentPrice, product.previousPrice)} % off</Text>
        <Text style={{fontSize: 12, color: "red", fontFamily: AmazonEmber}}>Limited Deal</Text></View>
      </View>
    </Pressable>
  );
}
