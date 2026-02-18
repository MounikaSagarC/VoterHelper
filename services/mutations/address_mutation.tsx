import { getCounty, getStates, getZipcodes } from "@/services/api/profile";
import { useAddressStore } from "@/store/addressStore";
import { useMutation } from "@tanstack/react-query";

export const useStateMutation = () => {
  const setStates = useAddressStore((s) => s.setStates);

  return useMutation({
    mutationFn: getStates,
    onSuccess: (options) => {
      setStates(options);
    },
    onError: (err) => {
    },
  });
};

export const useCountyMutation = () => {
  const setCounty = useAddressStore((s) => s.setCounties);

  return useMutation({
    mutationFn: (stateId: string) => getCounty(stateId),
    onSuccess: (data) => {
        setCounty(data)
    },
    onError: (err) => {
    },
  });
};

export const useZipcodeMutation = () => {
  const setZipCodeMap = useAddressStore((s) => s.setZipCodeMap);

  return useMutation({
    mutationFn: (countyId: string) => getZipcodes(countyId),
    onSuccess: (data) => {
      setZipCodeMap(data);
    },
  });
};
