import { queryclient } from "@/app/_layout";
import { useToast } from "@/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { createParty, inActivateParty, updateParty } from "../api/party";
import { Party } from "../schemas/admin_schema";
import { createSource, deleteSource, updateSource } from "../api/sources";

export const useInActivatePartyMutation = () => {
  const { toast } = useToast();
  const inActivatePartyMutate = useMutation({
    mutationFn: (id: number) => inActivateParty(id),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["parties"] });
      toast({ title: "Party status updated", variant: "success" });
    },
  });

  return  inActivatePartyMutate ;
};


export const usePartyMutations = () => {

  const createPartyMutate = useMutation({
    mutationFn: createParty,
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["parties"] });
    },
  });

const updatePartyMutate = useMutation({
  mutationFn: (payload: any) => {
    return updateParty(payload); // ✅ send full object
  },
  onSuccess: () => {
    queryclient.invalidateQueries({ queryKey: ["parties"] });
  },
});

  return { createPartyMutate, updatePartyMutate };
};

export const useSourceMutations = () => {

  const createSourceMutate = useMutation({
    mutationFn: createSource,
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["sources"] });
    },
  });

const updateSourceMutate = useMutation({
  mutationFn: (payload: any) => {
    return updateSource(payload); // ✅ send full object
  },
  onSuccess: () => {
    queryclient.invalidateQueries({ queryKey: ["sources"] });
  },
});

const deleteSourceMutate = useMutation({
  mutationFn: (id: number) => {
    return deleteSource(id); // ✅ send full object
  },
  onSuccess: () => {
    queryclient.invalidateQueries({ queryKey: ["sources"] });
  },
  onError: (error) => {
    if (isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
  },
})
  return { createSourceMutate, updateSourceMutate, deleteSourceMutate };
}

