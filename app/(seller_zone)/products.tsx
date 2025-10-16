import { RootState } from "@/store";
import { supabase } from "@/supabase";
import { Product } from "@/types";
import { AmazonEmber, AmazonEmberBold } from "@/utils/Constant";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function ProductsScreen() {
    const session = useSelector((state: RootState) => state.auth.session);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;
        const fetchProducts = async () => {
            if (!session?.user?.id) {
                setProducts([]);
                setLoading(false);
                return;
            }
            setLoading(true);
            const { data, error } = await supabase
                .from("product")
                .select("*")
                .eq("user_id", session.user.id)
                .order("id", { ascending: false });
            if (!isMounted) return;
            if (error) {
                console.error("Load products failed:", error.message);
                setProducts([]);
            } else {
                setProducts((data as unknown as Product[]) || []);
            }
            setLoading(false);
        };
        fetchProducts();
        return () => {
            isMounted = false;
        };
    }, [session?.user?.id]);

    const renderHeader = () => (
        <View style={{ flexDirection: "row", padding: 10, backgroundColor: "#f3f3f3" }}>
            <Text style={{ flex: 1, fontFamily: AmazonEmberBold }}>Image</Text>
            <Text style={{ flex: 2, fontFamily: AmazonEmberBold }}>Name</Text>
            <Text style={{ flex: 1, fontFamily: AmazonEmberBold }}>Price</Text>
            <Text style={{ flex: 1, fontFamily: AmazonEmberBold }}>Stock</Text>
        </View>
    );

    const renderItem = ({ item }: { item: Product }) => (
        <View style={{ flexDirection: "row", padding: 10, alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#eee" }}>
            <View style={{ flex: 1 }}>
                {!!item.imageUrl && (
                    <Image source={{ uri: item.imageUrl }} style={{ width: 40, height: 40, borderRadius: 4, backgroundColor: "#ddd" }} />
                )}
            </View>
            <Text style={{ flex: 2, fontFamily: AmazonEmber }}>{item.name}</Text>
            <Text style={{ flex: 1, fontFamily: AmazonEmber }}>₹ {item.currentPrice}</Text>
            <Text style={{ flex: 1, fontFamily: AmazonEmber }}>{item.amountInStock}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            {renderHeader()}
            <FlatList
                data={products}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                ListEmptyComponent={() => (
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontFamily: AmazonEmber }}>No products found.</Text>
                    </View>
                )}
            />
        </View>
    );
}


