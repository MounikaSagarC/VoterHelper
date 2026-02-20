import { BottomSheet, useBottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/Button";
import { View } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";
import { MenuItem } from "@/lib/helpers/profileHelper";
import { router } from "expo-router";

const menuItems = [
  { id: "edit", title: "Edit", icon: "✏️" },
  { id: "share", title: "Share", icon: "📤" },
  { id: "copy", title: "Copy Link", icon: "🔗" },
  { id: "bookmark", title: "Bookmark", icon: "🔖" },
  { id: "delete", title: "Delete", icon: "🗑️", destructive: true },
];

export function BottomSheetMenu() {
  const { isVisible, open, close } = useBottomSheet();

  return (
    <View>
      <Button onPress={open} className="bg-black mt-28 text-white">
        Show Menu
      </Button>

      <BottomSheet isVisible={isVisible} onClose={close} snapPoints={[0.4]}>
        <View className="bg-white rounded-2xl px-5">
          <MenuItem
            icon="person-outline"
            label="Parties"
            arrowicon="chevron-forward"
            onPress={() => router.push("/editProfile")}
          />

          <View className="border-t-2 border-gray-200">
            <MenuItem
              icon="location-outline"
              label="Categories"
              arrowicon="chevron-forward"
              onPress={() => {
                router.push("/adress");
              }}
            />
          </View>

          <View className="border-t-2 border-gray-200">
            <MenuItem
              icon="settings-outline"
              label="Questions"
              arrowicon="chevron-forward"
              onPress={() => {
                router.push("/settings");
              }}
            />
          </View>
          <View className="border-t-2 border-gray-200">
            <MenuItem
              icon="settings-outline"
              label="Office Types"
              arrowicon="chevron-forward"
              onPress={() => {
                router.push("/settings");
              }}
            />
          </View>
          <View className="border-t-2 border-gray-200">
            <MenuItem
              icon="settings-outline"
              label="Data Sources"
              arrowicon="chevron-forward"
              onPress={() => {
                router.push("/settings");
              }}
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}
