import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        "AmazonEmber" : require("@/assets/fonts/Amazon-Ember.ttf"),
        "AmazonEmberBold" : require("@/assets/fonts/Amazon-Ember-Bold.ttf"),
        "AmazonEmberLight" : require("@/assets/fonts/Amazon-Ember-Light.ttf"),
    }); 
    useEffect(() => {
        if(loaded || error ) {
            setTimeout (() => SplashScreen.hideAsync(), 1000); 
        }
    }, [error, loaded]);
    if(!loaded && !error) {
        return null
    }
    return (
        <>
        <StatusBar style="auto"/>
        <Stack screenOptions={{headerShown: false, headerTitleAlign: "center"}}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="(tabs)"/>
            <Stack.Screen name="(search)"/>
        </Stack>

        </>
    )
}