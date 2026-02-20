import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useCountyMutation,
  useStateMutation,
  useZipcodeMutation,
} from "@/services/mutations/address_mutation";

import {
  usePostAddressMutation,
  useUpdateAddressMutation,
} from "@/services/mutations/profile_mutation";

import Map from "@/components/screens/Map";
import { InputField } from "@/components/ui/InputField";
import { FormCombo } from "@/lib/helpers/formCombo";
import { addressSchema, AddressType } from "@/services/schemas/profileSchema";
import { useAddressStore } from "@/store/addressStore";

const AddressForm = () => {
  const { mode, address } = useLocalSearchParams();
  const navigation = useNavigation();
  const isEditMode = mode === "edit";

  const parsedAddress: AddressType | null = address
    ? JSON.parse(address as string)
    : null;

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddressType>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      addressLine1: "",
      addressLine2: "",
      state: "",
      county: "",
      city: "",
      zipCode: "",
      isPrimary: false,
    },
  });

  const {
    stateId,
    countyId,
    cityId,
    zipcode,
    states,
    counties,
    cities,
    zipcodes,
    zipCodeMap,
    selectState,
    selectCounty,
    selectCity,
    selectZipcode,
    reset: resetStore,
  } = useAddressStore();

  const selectedState = states.find((s) => s.value === stateId) ?? null;
  const selectedCounty = counties.find((c) => c.value === countyId) ?? null;
  const selectedCity = cities.find((ci) => ci.value === cityId) ?? null;
  const selectedZipcode = zipcodes.find((z) => z.value === zipcode) ?? null;

  const { mutate: fetchStates } = useStateMutation();

  const { mutate: fetchCounties } = useCountyMutation();

  const { mutate: fetchZipcodes } = useZipcodeMutation();

  const { postAddressMutate } = usePostAddressMutation();
  const updateAddressMutate = useUpdateAddressMutation();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStates();
  }, []);

  const hydratedRef = useRef({
    state: false,
    county: false,
    city: false,
    zip: false,
  });

  useEffect(() => {
    if (!stateId) return;
    fetchCounties(stateId);
  }, [stateId]);

  useEffect(() => {
    if (!countyId) return;
    fetchZipcodes(countyId);
  }, [countyId]);

  useEffect(() => {
    if (!isEditMode) {
      reset();
      resetStore();
    }
    navigation.setOptions({
      title: isEditMode ? "Edit Address" : "Add Address",
    });
  }, [isEditMode]);

  useEffect(() => {
    if (!isEditMode || !parsedAddress) return;
    if (hydratedRef.current.state) return;

    hydratedRef.current.state = true;

    reset(parsedAddress);
    selectState(parsedAddress.state);
    setValue("state", parsedAddress.state);
  }, [isEditMode, parsedAddress]);

  useEffect(() => {
    if (!isEditMode || !parsedAddress) return;
    if (!stateId || !counties.length) return;
    if (hydratedRef.current.county) return;

    hydratedRef.current.county = true;

    selectCounty(parsedAddress.county);
    setValue("county", parsedAddress.county);
  }, [stateId, counties]);

  useEffect(() => {
    if (!isEditMode || !parsedAddress) return;
    if (!countyId || !Object.keys(zipCodeMap).length) return;
    if (hydratedRef.current.city) return;

    hydratedRef.current.city = true;

    selectCity(parsedAddress.city);
    setValue("city", parsedAddress.city);
  }, [countyId, zipCodeMap]);

  useEffect(() => {
    if (!isEditMode || !parsedAddress) return;
    if (!cityId || !zipcodes.length) return;
    if (hydratedRef.current.zip) return;

    hydratedRef.current.zip = true;

    selectZipcode(parsedAddress.zipCode);
    setValue("zipCode", parsedAddress.zipCode);
  }, [cityId, zipcodes]);

  const onSubmit = async (data: AddressType) => {
    try {
      setLoading(true);

      if (isEditMode && parsedAddress?.id) {
        await updateAddressMutate.mutateAsync({
          id: parsedAddress.id,
          data,
        });

        router.back();
      } else {
        await postAddressMutate.mutateAsync(data);
        reset();
        router.back();
      }
    } catch (error: unknown) {
      const message = isAxiosError(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : "Something went wrong";
      setError("root", { message });
    } finally {
      setLoading(false);
    }
  };

  return (
  <ImageBackground
    source={require("@/assets/images/maps.webp")} // your image
    style={{ flex: 1 }}
    imageStyle={{ opacity: 0.7 }} // light opacity
    resizeMode="cover"
  >
    {/* Optional overlay for better readability */}
    <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.85)" }}>
      <View className="mt-5 flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="px-3 gap-4">
            {/* Address Line 1 */}
            <InputField
              label="Address Line 1"
              name="addressLine1"
              control={control}
              required
            />

            <InputField
              label="Address Line 2"
              name="addressLine2"
              control={control}
            />

            {/* State + County */}
            <View className="flex flex-row gap-6">
              <View className="flex-1">
                <Controller
                  control={control}
                  name="state"
                  render={({ fieldState: { error } }) => (
                    <View>
                      <FormCombo
                        label="State"
                        value={selectedState}
                        options={states}
                        onSelect={(o) => {
                          selectState(o.value);
                          setValue("state", o.value);
                        }}
                      />
                      {error && (
                        <Text className="text-red-500">{error.message}</Text>
                      )}
                    </View>
                  )}
                />
              </View>

              <View className="flex-1">
                <Controller
                  control={control}
                  name="county"
                  render={({ fieldState: { error } }) => (
                    <View>
                      <FormCombo
                        label="County"
                        value={selectedCounty}
                        options={counties}
                        onSelect={(o) => {
                          selectCounty(o.value);
                          setValue("county", o.value);
                        }}
                      />
                      {error && (
                        <Text className="text-red-500">{error.message}</Text>
                      )}
                    </View>
                  )}
                />
              </View>
            </View>

            {/* City + Zip */}
            <View className="flex flex-row gap-6">
              <Controller
                control={control}
                name="city"
                render={({ fieldState: { error } }) => (
                  <View className="flex-1">
                    <FormCombo
                      label="City"
                      value={selectedCity}
                      options={cities}
                      onSelect={(o) => {
                        selectCity(o.value);
                        setValue("city", o.value);
                      }}
                    />
                    {error && (
                      <Text className="text-red-500">{error.message}</Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="zipCode"
                render={({ fieldState: { error } }) => (
                  <View className="flex-1">
                    <FormCombo
                      label="Zip Code"
                      value={selectedZipcode}
                      options={zipcodes}
                      onSelect={(o) => {
                        selectZipcode(o.value);
                        setValue("zipCode", o.value);
                      }}
                    />
                    {error && (
                      <Text className="text-red-500">{error.message}</Text>
                    )}
                  </View>
                )}
              />
            </View>

            {/* Primary Switch */}
            <Controller
              control={control}
              name="isPrimary"
              render={({ field: { value, onChange } }) => (
                <View className="flex flex-row-reverse items-center justify-end">
                  <Text>Set as Primary Address</Text>
                  <Switch value={value} onValueChange={onChange} />
                </View>
              )}
            />

            <TouchableOpacity
              className="bg-blue-500 py-4 rounded-xl mt-5"
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              <Text className="font-semibold text-white self-center">
                {loading ? "Saving..." : "Submit"}
              </Text>
            </TouchableOpacity>

            {errors.root?.message && (
              <Text className="text-red-500 self-center">
                {errors.root.message}
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  </ImageBackground>
);

};

export default AddressForm;
