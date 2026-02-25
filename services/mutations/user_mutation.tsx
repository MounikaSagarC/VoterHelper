import { useMutation } from "@tanstack/react-query";
import { queryclient } from "@/app/_layout";
import { deleteUser } from "../api/users";

export const useDeleteUserMutation = () => {
    const deleteUserMutation = useMutation({
        mutationFn: (id: any) =>{
            return deleteUser(id);
        },
        onSuccess : ()=>{
            queryclient.invalidateQueries({queryKey: ["users"],exact: false,})
        }
        })

        return { deleteUserMutation }
}