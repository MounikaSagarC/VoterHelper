import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import { useEffect, useRef } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  Image,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { InputField } from "@/components/ui/InputField";
import { userProfile } from "@/services/api/profile";
import { useProfileMutation } from "@/services/mutations/profile_mutation";
import { ProfileTypes } from "@/services/schemas/profileSchema";
import { useProfilestore } from "@/store/profile_store";

const EditProfile = () => {
  const { formData } = useProfilestore();
  const updateForm = useProfilestore((s) => s.updateForm);
  const { updateProfileMutation } = useProfileMutation();
  const navigation = useNavigation();
  const hydrated = useRef(false);

  const { control, reset, handleSubmit } = useForm<ProfileTypes>({
    defaultValues: formData,
  });

  /* 1️⃣ Store → Form (ONCE) */
  useEffect(() => {
    if (formData && !hydrated.current) {
      reset(formData);
      hydrated.current = true;
    }
  }, [formData, reset]);

  /* 2️⃣ Form → Store (LIVE) */
  const watchedValues = useWatch({ control });

  useEffect(() => {
    if (hydrated.current) {
      updateForm(watchedValues);
    }
  }, [watchedValues, updateForm]);

  const { data } = useQuery({
    queryKey: ["userProfile"],
    queryFn: userProfile,
  });

  useEffect(() => {
    if (data) {
      updateForm({
        ...data,
        showEmailPublicly: !!data.showEmailPublicly,
        showRealNamePublicly: !!data.showRealNamePublicly,
        showAgePublicly: !!data.showAgePublicly,
      });
    }
  }, [data, updateForm]);

  const hydratedRef = useRef(false);

  useEffect(() => {
    if (data && !hydratedRef.current) {
      updateForm({
        ...data,
        showEmailPublicly: !!data.showEmailPublicly,
        showRealNamePublicly: !!data.showRealNamePublicly,
        showAgePublicly: !!data.showAgePublicly,
      });

      hydratedRef.current = true;
    }
  }, [data, updateForm]);

  console.log("profile data", data);

  const onSubmit = (formData: ProfileTypes) => {
    updateProfileMutation.mutate(formData, {
      onSuccess: () => {
        updateForm(formData);
      },
    });
    navigation.goBack();
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-4 pt-6 pb-10">
        {/* Avatar */}
        <View className="items-center mb-8">
          <Pressable onPress={() => {}} className="relative">
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=12" }}
              className="w-28 h-28 rounded-full"
            />

            <View className="absolute bottom-1 right-1 bg-indigo-600 p-2 rounded-full">
              <Ionicons name="camera" size={16} color="white" />
            </View>
          </Pressable>
        </View>

        {/* Form */}
        <View className="gap-5">
          <View className="flex flex-row gap-4 justify-between">
            <View className="flex-1">
              <InputField
                label="First Name"
                name="firstName"
                control={control}
              />
            </View>
            <View className="flex-1">
              <InputField label="Last Name" name="lastName" control={control} />
            </View>
          </View>
          <View className="flex flex-row justify-between gap-4">
            <View className="flex-1">
              <InputField label="Mobile" name="phoneNumber" control={control} />
            </View>
            <View className="flex-1">
              <InputField label="Nick Name" name="nickname" control={control} />
            </View>
          </View>

          <InputField
            className="h-36 mb-5 flex justify-start items-start"
            label="Bio"
            name="bio"
            control={control}
          />
          <View className="mt-24">
            <Text className="font-semibold">Date of Birth</Text>
            <View className="flex gap-4 mt-2 flex-row">
              <View className="flex-1">
                <InputField
                  name="birthYear"
                  placeholder={data?.birthYear.toString()}
                  control={control}
                  label="Year"
                  className="w-30"
                />
              </View>
              <View className="flex-1">
                <InputField
                  name="birthMonth"
                  placeholder={data?.birthMonth.toString()}
                  control={control}
                  label="Month"
                  className="w-full"
                />
              </View>
              <View className="flex-1">
                <InputField
                  name="ageRange"
                  control={control}
                  label="Age Range"
                  placeholder="18-30"
                  className="w-full"
                />
              </View>
            </View>
          </View>
          <View className="flex-row gap-3">
            <View className="flex-1 flex-row items-center  rounded-md">
              <Text>Show Email</Text>
              <Controller
                control={control}
                name="showEmailPublicly"
                render={({ field: { value, onChange } }) => (
                  <Switch value={value ?? false} onValueChange={onChange} />
                )}
              />
            </View>

            <View className="flex-1 flex-row items-center rounded-md">
              <Text>Show RealName</Text>
              <Controller
                control={control}
                name="showRealNamePublicly"
                render={({ field: { value, onChange } }) => (
                  <Switch value={value ?? false} onValueChange={onChange} />
                )}
              />
            </View>
          </View>
          <View className="flex-1 flex-row items-center  rounded-md ">
            <Text>Show Age</Text>
            <Controller
              control={control}
              name="showAgePublicly"
              render={({ field: { value, onChange } }) => (
                <Switch value={value} onValueChange={(v) => onChange(v)} />
              )}
            />
          </View>
        </View>

        {/* Save */}
        <Pressable>
          <TouchableOpacity className="bg-blue-400 py-4 rounded-xl mt-5">
            <Text
              className="font-semibold text-white self-center"
              onPress={handleSubmit(onSubmit)}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default EditProfile;
