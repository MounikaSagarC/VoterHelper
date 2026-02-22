import { useMutation } from "@tanstack/react-query"
import { createCategory, deleteCategory, updateCategory } from "../api/category"
import { queryclient } from "@/app/_layout"

export const useCategoryMutations = () => {

  const createCategoryMutate = useMutation({
    mutationFn : createCategory,
    onSuccess : ()=>{
        queryclient.invalidateQueries({queryKey: ["categories"]})
    }
    })

    const updateCategoryMutate = useMutation({
        mutationFn: (payload: any) => {
            console.log("UPDATE CATEGORY MUTATION CALLED WITH:", payload);
            return updateCategory(payload); // ✅ send full object
          },
        onSuccess : ()=>{
            queryclient.invalidateQueries({queryKey: ["categories"]})
        }
        })

    const deleteCategoryMutate = useMutation({
        mutationFn: (id: number) =>{
            console.log("DELETE CATEGORY MUTATION CALLED WITH ID:", id);
            return deleteCategory(id);
        },
        onSuccess : ()=>{
            console.log("Category deleted, invalidating categories query...");
            queryclient.invalidateQueries({queryKey: ["categories"]})
        }
        })
    return {createCategoryMutate, updateCategoryMutate, deleteCategoryMutate};

}