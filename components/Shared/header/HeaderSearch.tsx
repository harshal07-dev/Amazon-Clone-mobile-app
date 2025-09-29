import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import Icon from "@expo/vector-icons/Ionicons";
import { router, useSegments } from "expo-router";
import { useEffect, useRef, useState } from "react";
import type { TextInput as TextInputType } from "react-native";
import { Pressable, TextInput, View } from "react-native";

export default function HeaderSearch() {
  const segments = useSegments();
  const ref = useRef<TextInputType>(null);
  const [query, setQuery] = useState("");
  const onPressIn = () => {
    if (segments[0] !== "(search)") router.push("/(search)");
  };
  const onGoBack = () => {
    setQuery("");
    ref.current?.blur();
    router.dismissAll();
  };
  useDebouncedCallback(
    () => {
      if (query) router.setParams({ query });
    },
    [query],
    500
  );

  useEffect(() => {
    if (segments[0] === "(search)") {
      // Ensure focus after navigation/mount
      setTimeout(() => ref.current?.focus(), 0);
    }
  }, [segments]);
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {segments[0] === "(search)" && (
        <Pressable onPress={onGoBack}>
          <Icon name="arrow-back" color={"black"} size={24} />
        </Pressable>
      )}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          flex: 9,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#a4a5a6",
          borderRadius: 8,
          shadowColor: "gray",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 4,
          elevation: 3,
          paddingHorizontal: 6,
        }}
      >
        <Icon name="search" color={"black"} size={24} />
        <TextInput
          ref={ref}
          value={query}
          onPress={onPressIn}
          onChangeText={setQuery}
          // editable={segments[0] === "(search)"}
          autoFocus={segments[0] === "(search)"}
          placeholder="Search Amazon"
          style={{
            flex: 1,
            backgroundColor: "white",
            fontWeight: "800",
            fontSize: 20,
            borderWidth: 0,
            paddingHorizontal: 11,
            paddingVertical: 8,
            borderRadius: 8,
          }}
        />
        <Icon name="scan" color={"black"} size={24} />
      </View>
    </View>
  );
}