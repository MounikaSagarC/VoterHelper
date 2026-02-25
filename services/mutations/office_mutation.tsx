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
            return updateOfficeType(payload); // ✅ send full object
          },
        onSuccess : ()=>{
            queryclient.invalidateQueries({queryKey: ["officeTypes"]})
        }
        })

    const deleteOfficeTypeMutate = useMutation({
        mutationFn: (id: number) =>{
            return deleteOfficeType(id);
        },
        onSuccess : ()=>{
            queryclient.invalidateQueries({queryKey: ["officeTypes"]})
        }
        })
    return {createOfficeTypeMutate, updateOfficeTypeMutate, deleteOfficeTypeMutate};

}