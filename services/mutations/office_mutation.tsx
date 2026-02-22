import { useMutation } from "@tanstack/react-query"
import { queryclient } from "@/app/_layout"
import { deleteOfficeType, postOfficeType, updateOfficeType } from "../api/officeType"

export const useOfficeTypeMutattions = () => {

  const createOfficeTypeMutate = useMutation({
    mutationFn : postOfficeType,
    onSuccess : ()=>{
        queryclient.invalidateQueries({queryKey: ["officeTypes"]})
    }
    })

    const updateOfficeTypeMutate = useMutation({
        mutationFn: (payload: any) => {
            console.log("UPDATE OFFICE TYPE MUTATION CALLED WITH:", payload);
            return updateOfficeType(payload); // ✅ send full object
          },
        onSuccess : ()=>{
            queryclient.invalidateQueries({queryKey: ["officeTypes"]})
        }
        })

    const deleteOfficeTypeMutate = useMutation({
        mutationFn: (id: number) =>{
            console.log("DELETE OFFICE TYPE MUTATION CALLED WITH ID:", id);
            return deleteOfficeType(id);
        },
        onSuccess : ()=>{
            console.log("Office Type deleted, invalidating office types query...");
            queryclient.invalidateQueries({queryKey: ["officeTypes"]})
        }
        })
    return {createOfficeTypeMutate, updateOfficeTypeMutate, deleteOfficeTypeMutate};

}