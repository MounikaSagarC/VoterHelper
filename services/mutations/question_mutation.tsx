import { useMutation } from "@tanstack/react-query"
import { queryclient } from "@/app/_layout"
import { deleteOfficeType, postOfficeType, updateOfficeType } from "../api/officeType"
import { deleteQuestion, postQuestion, updateQuestion } from "../api/questions"
import { Question } from "../schemas/admin_schema"

export const useQuestionMutation = () => {

  const createQuestionMutate = useMutation({

    mutationFn : postQuestion,
    onSuccess : ()=>{
        queryclient.invalidateQueries({queryKey: ["questions"]})
    }
    })

    const updateQuestionMutate = useMutation({
        mutationFn: (payload: Question) => {
            console.log("mutation hit")
            return updateQuestion(payload); // ✅ send full object
          },
        onSuccess : ()=>{
            queryclient.invalidateQueries({queryKey: ["questions"]})
        }
        })

    const deleteQuestionMutate = useMutation({
        mutationFn: (id: number) =>{
            return deleteQuestion(id);
        },
        onSuccess : ()=>{
            queryclient.invalidateQueries({queryKey: ["questions"]})
        }
        })
    return {createQuestionMutate, updateQuestionMutate, deleteQuestionMutate};

}