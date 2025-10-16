import Header from "@/components/Shared/header/Header";
import { AmazonEmberBold } from "@/utils/Constant";
import { Entypo } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface Tab {
    name: string;
    icon: "add-to-list" | "archive" | "list";
}
export default function TabLayout() {
    const onGoBack = () => router.back();
    const undeliveredCount = 0
    const tabs: Tab[] = [
        {
            name: "seller_page",
            icon: "add-to-list",
        },
        {
            name: "product_ordered",
            icon: "archive"
        },
        {
            name: "products",
            icon: "list"
        }
    ]
    return (
        <Tabs>
            {tabs.map((tab) => (
                <Tabs.Screen 
                key={tab.name}
                name={tab.name}
                options={
                    {
                        tabBarStyle: {
                            borderWidth: 1, 
                            borderTopColor: "lightgray"
                        },
                        header: (props)=> <Header {...props}/>,
                        headerLeft: () => (
                            <Pressable onPress={onGoBack} style={{ padding: 6 }}>
                                <Text style={{ fontFamily: AmazonEmberBold, fontSize: 16 }}>Back</Text>
                            </Pressable>
                        ),
                        headerTitle: () => (
                            <Text style={{ fontFamily: AmazonEmberBold, fontSize: 16 }}>Amazon.in</Text>
                        ),
                        tabBarLabel: () => null,
                        tabBarIcon: ({focused}) => (
                            <View style={
                                {
                                    flex: 1,
                                    marginTop: -5,
                                    gap: 10,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }
                            }>
                                <View style={{
                                    flexDirection: "row",
                                    width: 50,
                                    height: 4,
                                    borderRadius: 20,
                                    backgroundColor: focused ? "#238db0" : "transparent",
                                }}/>
                                <Entypo 
                                name={tab.icon} 
                                size={30} 
                                color={focused ? "#238db0" : "#959493ff"} 
                                />
                                {tab.name === "product_ordered" && (
                                    <Text 
                                    style={{
                                        paddingHorizontal: 4,
                                        borderRadius: 10,
                                        position: "absolute",
                                        top: 8,
                                        backgroundColor: undeliveredCount === 0 ? "transparent": "#de1b1bff",
                                        fontFamily: AmazonEmberBold,
                                        fontSize: 12,
                                        color: undeliveredCount === 0 ? "transparent" : "#fff"
                                    }}
                                    >
                                        {undeliveredCount}
                                        </Text>
                                )}
                            </View>
                        )
                    }
                }/>
            ))}
        </Tabs>
    )
}