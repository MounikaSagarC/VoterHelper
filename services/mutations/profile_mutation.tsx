import { queryclient } from "@/app/_layout";
import { useToast } from "@/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Alert } from "react-native";
import {
  address,
  changePassword,
  deleteAddress,
  putAddress,
  updateProfile,
} from "../api/profile";
import { AddressType } from "../schemas/profileSchema";

export const useProfileMutation = () => {
  const { toast } = useToast();
  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: () => {
      toast({
        title: "Error occurred while updating profile",
        variant: "error",
      });
    },
    onSuccess: async () => {
      toast({ title: "Profile updated successfully", variant: "success" });
      await queryclient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
  return { updateProfileMutation };
};

export const useChangepwdMutation = () => {
  const { toast } = useToast();
  const changePasswordMutate = useMutation({
    mutationFn: changePassword,
    onError: (error) => {
      let message = "Something went wrong";

      if (isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      Alert.alert("Password change failed", message);
      toast({
        title: "Password change failed",
        description: message,
        variant: "error",
      });
    },
    onSuccess: () => {
      Alert.alert("Success", "Password changed successfully");
      toast({ title: "Password changed successfully", variant: "success" });
    },
  });

  return { changePasswordMutate };
};

export const usePostAddressMutation = () => {
  const { toast } = useToast();
  const postAddressMutate = useMutation({
    mutationFn: async (data: AddressType) => {
      const response = await address(data);

      if (response.code !== 1) {
        throw response;
      }

      return response;
    },
    onError: (error) => {
      let message = "Something went wrong";

      if (isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      Alert.alert("Address creation failed", message);
      toast({
        title: "Address creation failed",
        description: message,
        variant: "error",
      });
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["getAddress"] });
      toast({ title: "Address added successfully", variant: "success" });
    },
  });

  return { postAddressMutate };
};

export const useDeleteAddressMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: deleteAddress,

    onError: () => {
      Alert.alert("Error occurred while deleting address");
      toast({
        title: "Error occurred while deleting address",
        variant: "error",
      });
    },

    onSettled: () => {
      // Sync with server quietly
      queryClient.invalidateQueries({ queryKey: ["getAddress"] });
      toast({ title: "Address deleted successfully", variant: "success" });
    },
  });
};

export const useUpdateAddressMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: AddressType }) => {
      const response = await putAddress(id, data);

      if (response.code !== 1) {
        throw response; // 👈 throw full response
      }

      return response;
    },
    onError: (error) => {
      let message = "Something went wrong";

      if (isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      Alert.alert("Address update failed", message);
      toast({
        title: "Address update failed",
        description: message,
        variant: "error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAddress"] });
      toast({ title: "Address updated successfully", variant: "success" });
    },
  });
};
