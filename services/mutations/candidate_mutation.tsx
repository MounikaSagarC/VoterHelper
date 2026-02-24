import { useMutation } from "@tanstack/react-query";
import { deleteCategory } from "../api/category";
import { queryclient } from "@/app/_layout";
import { deleteCandidate } from "../api/candidate";

export const useDeleteCandidateMutation = () => {
    const deleteCandidateMutate = useMutation({
        mutationFn: (id: number) =>{
            return deleteCandidate(id);
        },
        onSuccess : ()=>{
            queryclient.invalidateQueries({queryKey: ["candidates"],exact: false,})
        }
        })

        return { deleteCandidateMutate}
}