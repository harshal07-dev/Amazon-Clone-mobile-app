import { useLocalSearchParams, useNavigation } from "expo-router";
import { useMemo } from "react";
import {
    FlatList,
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

type Suggestion = {
    id: string;
    title: string;
    image: any;
};

const SUGGESTIONS: Suggestion[] = [
    { id: "1", title: "Electronics", image: require("@/assets/amazon-images/sug-1.png") },
    { id: "2", title: "Home & Kitchen", image: require("@/assets/amazon-images/sug-2.png") },
    { id: "3", title: "Fashion", image: require("@/assets/amazon-images/sug-3.png") },
    { id: "4", title: "Beauty", image: require("@/assets/amazon-images/sug-4.png") },
    { id: "5", title: "Grocery", image: require("@/assets/amazon-images/sug-5.png") },
    { id: "6", title: "Toys", image: require("@/assets/amazon-images/sug-6.png") },
    { id: "7", title: "Home Improvement", image: require("@/assets/amazon-images/sug-7.png") },
    { id: "8", title: "Books", image: require("@/assets/amazon-images/sug-8.png") },
];

export default function SearchScreen() {
    const navigation = useNavigation();
    const params = useLocalSearchParams<{ query?: string }>();
    const query = useMemo(() => (params?.query || "").toString(), [params?.query]);

    if (!query) {
        return (
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={{ fontSize: 18, fontWeight: "700", marginVertical: 12 }}>
                    Shop by category
                </Text>
                <FlatList
                    data={SUGGESTIONS}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={{ gap: 12 }}
                    columnWrapperStyle={{ gap: 12 }}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => navigation.setParams?.({ query: item.title })}
                            style={{
                                flex: 1,
                                backgroundColor: "white",
                                borderWidth: 1,
                                borderColor: "#e5e7eb",
                                borderRadius: 8,
                                overflow: "hidden",
                            }}
                        >
                            <Image
                                source={item.image}
                                resizeMode="cover"
                                style={{ width: "100%", height: 120 }}
                            />
                            <View style={{ paddingHorizontal: 12, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: "600" }}>{item.title}</Text>
                            </View>
                        </Pressable>
                    )}
                />
            </ScrollView>
        );
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <Text style={{ fontSize: 16, marginTop: 12 }}>
                Showing results for
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "800", marginBottom: 12 }}>
                {query}
            </Text>
            <View
                style={{
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "#e5e7eb",
                    borderRadius: 8,
                    padding: 16,
                }}
            >
                <Text style={{ fontSize: 14, color: "#6b7280" }}>
                    No live data connected. This is a placeholder for search results.
                </Text>
            </View>
        </View>
    );
}