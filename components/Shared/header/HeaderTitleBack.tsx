import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Pressable, View } from "react-native";

export  function HeaderTitle() {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Image source={require("@/assets/amazon-images/amazon-logo.png")} style={{ width: 90, height: 28, resizeMode: "contain" }} />
        </View>
    )
}

export function HeaderLeftBack({onPress} : {onPress: VoidFunction}) {
    return (
        <Pressable onPress={onPress} style={{ padding: 6 }}>
            <Ionicons name="chevron-back" size={22} />
        </Pressable>
    )
}