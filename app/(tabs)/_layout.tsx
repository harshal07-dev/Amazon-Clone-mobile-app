import Header from "@/components/Shared/header/Header";
import { AmazonEmberBold } from "@/utils/Constant";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
interface Tab {
  name: string;
  icon: "home-outline" | "account-outline" | "cart-check";
}

export default function TabLayout() {
  const tabs: Tab[] = [
    {
      name: "index",
      icon: "home-outline",
    },
    {
      name: "profile",
      icon: "account-outline",
    },
    {
      name: "cart",
      icon: "cart-check",
    },
  ];

  const cartItems = "Cart Items"
  return (
    <Tabs>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarStyle: {
              borderTopWidth: 1,
              borderTopColor: "lightgray",
            },
            tabBarLabel: () => null,
            header: (props) => <Header {...props} />,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  alignItems: 'center'
                }}
              >
                <View style={{ flexDirection: "row", width: 100 , height: 4, borderRadius: 20, backgroundColor: focused ? "#238db0" : "transparent"}}/>
                <MCIcon name={tab.icon} size={30} color={focused ? "#238db0" : "black"}/>
                {tab.name === 'cart' && (
                    <Text style={{
                        paddingHorizontal: 4,
                        borderRadius: 10,
                        position: "absolute",
                        top: 4,
                        right: 20,
                        backgroundColor: cartItems.length === 0 ? "transparent" : "#de1b1bff",
                        fontFamily: AmazonEmberBold,
                        fontSize: 12,
                        color: cartItems.length === 0 ? "transparent" : "white"
                    }}>
                        {cartItems.length}
                    </Text>
                )}
              </View>
            ),
          }}
        ></Tabs.Screen>
      ))}
    </Tabs>
  );
}
