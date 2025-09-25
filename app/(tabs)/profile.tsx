import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";
import { Pressable, ScrollView, View } from "react-native";

export default function Profile() {
  const session = true;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const openSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  return (
    <ScrollView contentContainerStyle={{ backgroundColor: "white" }}>
      {session ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
            gap: 20,
          }}
        ></View>
      ) : (
          <Pressable onPress={openSheet}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 50,
                  backgroundColor: "gray",
                }}
              />
            </View>
          </Pressable>
      )}
    </ScrollView>
  );
}
