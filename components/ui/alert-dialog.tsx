import React, { useEffect } from "react";
import { Modal, TouchableWithoutFeedback, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./Button";

export type AlertDialogProps = {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  dismissible?: boolean;
  showCancelButton?: boolean;
};

export function AlertDialog({
  isVisible,
  onClose,
  title,
  description,
  children,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  dismissible = true,
  showCancelButton = true,
}: AlertDialogProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withTiming(1, { duration: 200 });
    } else {
      opacity.value = withTiming(0, { duration: 200 }, (finished) => {
        if (finished) {
          runOnJS(onClose)();
        }
      });
      scale.value = withTiming(0.95, { duration: 200 });
    }
  }, [isVisible]);

  // 🖤 Black transparent backdrop
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    backgroundColor: "rgba(0,0,0,0.5)",
  }));

  // 🤍 Solid white modal
  const modalStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const close = () => {
    onCancel?.();
    opacity.value = withTiming(0, { duration: 200 }, () => {
      runOnJS(onClose)();
    });
    scale.value = withTiming(0.95, { duration: 200 });
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      statusBarTranslucent
      animationType="none"
    >
      {/* Backdrop */}
      <Animated.View
        style={backdropStyle}
        className="flex-1 items-center justify-center px-6"
      >
        <TouchableWithoutFeedback
          onPress={dismissible ? close : undefined}
        >
          <View className="absolute inset-0" />
        </TouchableWithoutFeedback>

        {/* Modal */}
        <Animated.View
          style={{ ...modalStyle , backgroundColor:"white"}}
          className="w-full rounded-2xl overflow-hidden bg-white"
        >
          {/* Card is transparent */}
          <Card style={{backgroundColor:"white"}}>
            {(title || description) && (
              <CardHeader>
                {title && (
                  <CardTitle  style={{color:"black",fontSize:20,fontWeight:"600"}}>
                    {title}
                  </CardTitle>
                )}
                {description && (
                  <CardDescription style={{fontSize:15}}>
                    {description}
                  </CardDescription>
                )}
              </CardHeader>
            )}

            {children && (
              <CardContent>
                {children}
              </CardContent>
            )}

            <CardFooter className="flex-row gap-2">
              {showCancelButton && (
                <Button
                  variant="outline"
                  onPress={close}
                  className="flex-1"
                >
                  {cancelText}
                </Button>
              )}

              <Button
                onPress={() => {
                  onConfirm?.();
                  close();
                }}
                className="flex-1"
              >
                {confirmText}
              </Button>
            </CardFooter>
          </Card>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

export function useAlertDialog() {
  const [isVisible, setIsVisible] = React.useState(false);

  const open = React.useCallback(() => setIsVisible(true), []);
  const close = React.useCallback(() => setIsVisible(false), []);
  const toggle = React.useCallback(
    () => setIsVisible((v) => !v),
    []
  );

  return { isVisible, open, close, toggle };
}
