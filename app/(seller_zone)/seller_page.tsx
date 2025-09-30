import DefaultButton from "@/components/Shared/DefaultButton";
import { router } from "expo-router";
import { View } from "react-native";

export default function SellerPage () {
    const goCreateProduct = () => router.push("/create_product");
    return <View style={{
        flex:1, 
        marginTop: "5%", 
        paddingHorizontal: 10, 
        justifyContent: "flex-start"
        }}>
        <DefaultButton style={{width: "100%"}} onPress={goCreateProduct}>Create Product</DefaultButton>
    </View>
}