import { ProfileTypes } from '@/services/schemas/profileSchema'
import { create } from 'zustand'

type ActiveTypes = {
    isActive: boolean
    isEdit: boolean
    formData:Partial<ProfileTypes>

    updateForm:(data:Partial<ProfileTypes>)=>void
    clearForm:()=>void
    setIsedit:(value:any)=>void
    setActive: (value: any) => void
}

const initialState:ActiveTypes = {
    isActive:false,
    isEdit:false,
    formData:{},

    updateForm:()=>{},
    clearForm:()=>{},
    setIsedit:()=>{},
    setActive:()=>{}
}

export const useProfilestore = create<ActiveTypes>((set) => ({
    ...initialState,
    setActive: (value: any) => set({ isActive: value }),
    setIsedit: (value:any) => set({isEdit : value}),

    updateForm : (data) => {
        set((state)=>({formData:{...state.formData,...data}}))
    },
    clearForm : () =>{
        set({
            formData:{}
        })
    }
}))