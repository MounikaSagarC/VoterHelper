import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ImageBackground,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
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

  const stateOptions =
  states?.map((item: any) => ({
    label: item.state,
    value: String(item.id),
  })) ?? [];


  const selectedState = stateOptions.find((s) => s.value === stateId) ?? null;
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
    if (!isEditMode || !parsedAddress || hydratedRef.current.state) return;
    hydratedRef.current.state = true;
    reset(parsedAddress);
    selectState(parsedAddress.state);
    setValue("state", parsedAddress.state);
  }, [parsedAddress]);

  useEffect(() => {
    if (
      !isEditMode ||
      !parsedAddress ||
      !stateId ||
      !counties.length ||
      hydratedRef.current.county
    )
      return;

    hydratedRef.current.county = true;
    selectCounty(parsedAddress.county);
    setValue("county", parsedAddress.county);
  }, [stateId, counties]);

  useEffect(() => {
    if (
      !isEditMode ||
      !parsedAddress ||
      !countyId ||
      !Object.keys(zipCodeMap).length ||
      hydratedRef.current.city
    )
      return;

    hydratedRef.current.city = true;
    selectCity(parsedAddress.city);
    setValue("city", parsedAddress.city);
  }, [countyId, zipCodeMap]);

  useEffect(() => {
    if (
      !isEditMode ||
      !parsedAddress ||
      !cityId ||
      !zipcodes.length ||
      hydratedRef.current.zip
    )
      return;

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
      } else {
        await postAddressMutate.mutateAsync(data);
        reset();
      }

      router.back();
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
      source={require("@/assets/images/maps.webp")}
      style={styles.bg}
      imageStyle={styles.bgImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.wrapper}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.form}>
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

              <View style={styles.row}>
                <View style={styles.flex1}>
                  <Controller
                    control={control}
                    name="state"
                    render={({ fieldState: { error } }) => (
                      <>
                        <FormCombo
                          label="State"
                          value={selectedState}
                          options={stateOptions}
                          onSelect={(o) => {
                            selectState(o.value);
                            setValue("state", o.value);
                          }}
                        />
                        {error && (
                          <Text style={styles.error}>{error.message}</Text>
                        )}
                      </>
                    )}
                  />
                </View>

                <View style={styles.flex1}>
                  <Controller
                    control={control}
                    name="county"
                    render={({ fieldState: { error } }) => (
                      <>
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
                          <Text style={styles.error}>{error.message}</Text>
                        )}
                      </>
                    )}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.flex1}>
                  <Controller
                    control={control}
                    name="city"
                    render={({ fieldState: { error } }) => (
                      <>
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
                          <Text style={styles.error}>{error.message}</Text>
                        )}
                      </>
                    )}
                  />
                </View>

                <View style={styles.flex1}>
                  <Controller
                    control={control}
                    name="zipCode"
                    render={({ fieldState: { error } }) => (
                      <>
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
                          <Text style={styles.error}>{error.message}</Text>
                        )}
                      </>
                    )}
                  />
                </View>
              </View>

              <Controller
                control={control}
                name="isPrimary"
                render={({ field: { value, onChange } }) => (
                  <View style={styles.primaryRow}>
                    <Text>Set as Primary Address</Text>
                    <Switch value={value} onValueChange={onChange} />
                  </View>
                )}
              />

              <TouchableOpacity
                style={styles.submit}
                onPress={handleSubmit(onSubmit)}
                disabled={loading}
              >
                <Text style={styles.submitText}>
                  {loading ? "Saving..." : "Submit"}
                </Text>
              </TouchableOpacity>

              {errors.root?.message && (
                <Text style={styles.errorCenter}>
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

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  bgImage: {
    opacity: 0.7,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.85)",
  },
  wrapper: {
    marginTop: 20,
    flex: 1,
  },
  scroll: {
    paddingBottom: 40,
  },
  form: {
    paddingHorizontal: 12,
    gap: 16,
  },
  row: {
    flexDirection: "row",
    gap: 24,
  },
  flex1: {
    flex: 1,
  },
  primaryRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  submit: {
    backgroundColor: "#3B82F6", // blue-500
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 20,
  },
  submitText: {
    color: "white",
    fontWeight: "600",
    alignSelf: "center",
  },
  error: {
    color: "#EF4444",
  },
  errorCenter: {
    color: "#EF4444",
    alignSelf: "center",
  },
});