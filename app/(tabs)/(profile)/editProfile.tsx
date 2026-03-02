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
  StyleSheet,
} from "react-native";

import { InputField } from "@/components/ui/InputField";
import { userProfile } from "@/services/api/profile";
import { useProfileMutation } from "@/services/mutations/profile_mutation";
import { ProfileTypes } from "@/services/schemas/profileSchema";
import { useProfilestore } from "@/store/profile_store";
import SwitchButton from "@/components/ui/SwitchButton";
import { TAB_BAR_HEIGHT } from "../_layout";

const EditProfile = () => {
  const { formData } = useProfilestore();
  const updateForm = useProfilestore((s) => s.updateForm);
  const { updateProfileMutation } = useProfileMutation();
  const navigation = useNavigation();
  const hydrated = useRef(false);

  const { control, reset, handleSubmit } = useForm<ProfileTypes>({
    defaultValues: formData,
  });

  useEffect(() => {
    if (formData && !hydrated.current) {
      reset(formData);
      hydrated.current = true;
    }
  }, [formData, reset]);

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

  const onSubmit = (formData: ProfileTypes) => {
    updateProfileMutation.mutate(formData, {
      onSuccess: () => updateForm(formData),
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          <Pressable style={styles.avatarPressable}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=12" }}
              style={styles.avatar}
            />
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={16} color="white" />
            </View>
          </Pressable>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* <View style={styles.row}> */}
            <View style={styles.flex1}>
              <InputField label="First Name" name="firstName" control={control} />
            </View>
            <View style={styles.flex1}>
              <InputField label="Last Name" name="lastName" control={control} />
            </View>
          {/* </View> */}

          {/* <View style={styles.row}> */}
            <View style={styles.flex1}>
              <InputField label="Mobile" name="phoneNumber" control={control} />
            </View>
            <View style={styles.flex1}>
              <InputField label="Nick Name" name="nickname" control={control} />
            </View>
          {/* </View> */}

          <InputField
            label="Bio"
            name="bio"
            control={control}
            // style={styles.bio}
          />

          <View style={styles.dobSection}>
            <Text style={styles.sectionTitle}>Date of Birth</Text>
            <View style={styles.row}>
              <View style={styles.flex1}>
                <InputField
                  name="birthYear"
                  label="Year"
                  placeholder={data?.birthYear?.toString()}
                  control={control}
                />
              </View>
              <View style={styles.flex1}>
                <InputField
                  name="birthMonth"
                  label="Month"
                  placeholder={data?.birthMonth?.toString()}
                  control={control}
                />
              </View>
              <View style={styles.flex1}>
                <InputField
                  name="ageRange"
                  label="Age Range"
                  placeholder="18-30"
                  control={control}
                />
              </View>
            </View>
          </View>

          {/* Toggles */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleItem}>
              <Text>Show Email</Text>
              <Controller
                control={control}
                name="showEmailPublicly"
                render={({ field: { value, onChange } }) => (
                  <SwitchButton value={value ?? false} onChange={onChange} />
                )}
              />
            </View>

            <View style={styles.toggleItem}>
              <Text>Show Real Name</Text>
              <Controller
                control={control}
                name="showRealNamePublicly"
                render={({ field: { value, onChange } }) => (
                  <SwitchButton value={value ?? false} onChange={onChange} />
                )}
              />
            </View>
          </View>

          <View style={styles.toggleSingle}>
            <Text>Show Age</Text>
            <Controller
              control={control}
              name="showAgePublicly"
              render={({ field: { value, onChange } }) => (
                <SwitchButton value={value ?? false} onChange={onChange} />
              )}
            />
          </View>
        </View>

        {/* Save */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", // gray-50
    marginBottom:TAB_BAR_HEIGHT
  },
  inner: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
  },

  avatarWrapper: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatarPressable: {
    position: "relative",
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "#4F46E5", // indigo-600
    padding: 8,
    borderRadius: 999,
  },

  form: {
    gap: 20,
  },
  row: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
  },
  flex1: {
    flex: 1,
  },

  bio: {
    height: 144,
    marginBottom: 20,
  },

  sectionTitle: {
    fontWeight: "600",
  },

  toggleRow: {
    flexDirection: "row",
    gap: 12,
  },
  toggleItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggleSingle: {
    flexDirection: "row",
    alignItems: "center",
    gap:40
    // justifyContent: "space-between",
  },

  submitButton: {
    backgroundColor: "#60A5FA", // blue-400
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 20,
  },
  submitText: {
    color: "white",
    fontWeight: "600",
    alignSelf: "center",
  },
});