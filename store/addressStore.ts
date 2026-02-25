import { AddressType } from "@/services/schemas/profileSchema";
import { create } from "zustand";

type Option = { label: string; value: string };
type ZipCodeMap = Record<string, number[]>;

type AddressStore = {
  stateId: string;
  countyId: string;
  cityId: string;
  zipcode: string;

  zipCodeMap: ZipCodeMap;
  states: Option[];
  counties: Option[];
  cities: Option[];
  zipcodes: Option[];

  getStateLabel: (id: string) => string;
  getCountyLabel: (id: string) => string;

  setZipCodeMap: (map: ZipCodeMap) => void;
  setStates: (states: Option[]) => void;
  setCounties: (counties: Option[]) => void;
  selectState: (id: string) => void;
  selectCounty: (id: string) => void;
  selectCity: (city: string) => void;
  selectZipcode: (zip: string) => void;

  setEditingAddress: (data: AddressType) => void;
  reset: () => void;
};

const initialState: Pick<
  AddressStore,
  | "stateId"
  | "countyId"
  | "cityId"
  | "zipcode"
  | "zipCodeMap"
  | "states"
  | "counties"
  | "cities"
  | "zipcodes"
> = {
  stateId: "",
  countyId: "",
  states: [],
  counties: [],
  cityId: "",
  zipcode: "",
  zipCodeMap: {},
  cities: [],
  zipcodes: [],
};

export const useAddressStore = create<AddressStore>((set, get) => ({
  ...initialState,

  setZipCodeMap: (map) => {
  set((state) => ({
    zipCodeMap: map,
    cities: Object.keys(map).map((c) => ({ label: c, value: c })),
    cityId: state.cityId,   // preserve
    zipcode: state.zipcode, // preserve
  }));
},


  setStates: (states) => set({ states }),
  setCounties: (counties) => set({ counties }),

  selectState: (stateId) =>
  set((state) => ({
    stateId,
    countyId: "",
    cityId: "",
    zipcode: "",
  })),

  selectCounty: (countyId) =>
  set((state) => ({
    countyId,
    cityId: state.cityId,
    zipcode: state.zipcode,
  })),


  selectCity: (cityId) => {
    const zipcodes =
      get().zipCodeMap[cityId]?.map((z) => ({
        label: String(z),
        value: String(z),
      })) ?? [];

    set({ cityId, zipcodes, zipcode: "" });
  },

  selectZipcode: (zipcode) => set({ zipcode }),

  getStateLabel: (id) => {
  return get().states.find((s) => s.value === id)?.label ?? id;
},

  getCountyLabel: (id) =>
    get().counties.find((c) => c.value === id)?.label ?? id,

  setEditingAddress: (data) => {
    const { zipCodeMap } = get();

    // Always set the basic address IDs first
    set({
      stateId: data.state,
      countyId: data.county,
      cityId: data.city,
      zipcode: data.zipCode,
    });

    // If zipCodeMap is available and has the city, set cities and zipcodes
    if (Object.keys(zipCodeMap).length && zipCodeMap[data.city]) {
      set({
        cities: Object.keys(zipCodeMap).map((c) => ({
          label: c,
          value: c,
        })),
        zipcodes: zipCodeMap[data.city].map((z) => ({
          label: String(z),
          value: String(z),
        })),
      });
    }
  },

  reset: () => set(initialState),
}));
