import { useMutation } from "@tanstack/react-query"
import { queryclient } from "@/app/_layout"
import { deleteOfficeType, postOfficeType, updateOfficeType } from "../api/officeType"
import { deleteQuestion, postQuestion, updateQuestion } from "../api/questions"

export const useQuestionMutation = () => {

  const createQuestionMutate = useMutation({
    mutationFn : postQuestion,
    onSuccess : ()=>{
        queryclient.invalidateQueries({queryKey: ["officeTypes"]})
    }
    })

    const updateQuestionMutate = useMutation({
        mutationFn: (payload: any) => {
            console.log("UPDATE QUESTION MUTATION CALLED WITH:", payload);
            return updateQuestion(payload); // ✅ send full object
          },
        onSuccess : ()=>{
            queryclient.invalidateQueries({queryKey: ["officeTypes"]})
        }
        })

    const deleteQuestionMutate = useMutation({
        mutationFn: (id: number) =>{
            console.log("DELETE QUESTION MUTATION CALLED WITH ID:", id);
            return deleteQuestion(id);
        },
        onSuccess : ()=>{
            console.log("Question deleted, invalidating questions query...");
            queryclient.invalidateQueries({queryKey: ["questions"]})
        }
        })
    return {createQuestionMutate, updateQuestionMutate, deleteQuestionMutate};

}