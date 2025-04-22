import { create } from "zustand";


export const useFileContextMenuStore=create((set)=>{
    return{
        x:null,
        y:null,
        path:null,
        setX:(x)=>{
            set({x:x})
        },
        setY:(y)=>{
            set({y:y})
        },
        setPath:(path)=>{
            set({path:path})
        }
    }
})