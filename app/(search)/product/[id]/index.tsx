import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Product() {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>{String(id)}</Text>
        </View>
    );
}


