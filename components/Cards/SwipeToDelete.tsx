// components/SwipeToDeleteCard.tsx
import { useRef } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  SwipeableCard,
  SwipeableCardRef,
} from "./SwipeableCard";
import { AlertDialog, useAlertDialog } from "../ui/alert-dialog";

type Props = {
  children: React.ReactNode;
  onDelete: () => void;
};

export const SwipeToDeleteCard = ({ children, onDelete }: Props) => {
  const cardRef = useRef<SwipeableCardRef>(null);
  const { isVisible, open, close } = useAlertDialog();

  const handleCancel = () => {
    close();
    cardRef.current?.reset(); // 🔥 THIS fixes it
  };

  return (
    <>
      <SwipeableCard
        ref={cardRef}
        onOpen={open}
        rightSlot={
          <TouchableOpacity onPress={open} style={{ alignItems: "center" }}>
            <Ionicons name="trash-bin-outline" size={26} color="#DC2626" />
            <Text className="text-red-500 text-sm mt-1">Delete</Text>
          </TouchableOpacity>
        }
      >
        {children}
      </SwipeableCard>

      <AlertDialog
        isVisible={isVisible}
        title="Delete"
        description="This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onClose={handleCancel}
        onConfirm={() => {
          onDelete();
          close();
          cardRef.current?.reset();
        }}
      />
    </>
  );
};