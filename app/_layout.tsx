import { store } from "@/store";
import { setSession } from "@/store/slices/authSlice";
import { supabase } from "@/supabase";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AppState } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useDispatch } from "react-redux";
SplashScreen.preventAutoHideAsync();

AppState.addEventListener("change", (state ) => {
    if(state === "active") {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
})
function Layout() {
    const dispatch = useDispatch();
    const [loaded, error] = useFonts({
        "AmazonEmber" : require("@/assets/fonts/Amazon-Ember.ttf"),
        "AmazonEmberBold" : require("@/assets/fonts/Amazon-Ember-Bold.ttf"),
        "AmazonEmberLight" : require("@/assets/fonts/Amazon-Ember-Light.ttf"),
    }); 
    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            dispatch(setSession(session));
        })
        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((_event, session) => {
            dispatch(setSession(session))
        });
        return () => {
            subscription?.unsubscribe();
        }
    }, [dispatch])
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
            <Stack.Screen name="(seller_zone)"/>
        </Stack>
        </>
    )
}

export default function RootLayout() {
    return (
        <GestureHandlerRootView>
            <Provider store={store}>
                <Layout/>
            </Provider>
        </GestureHandlerRootView>
    )
}