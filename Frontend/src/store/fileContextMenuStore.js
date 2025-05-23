import { create } from "zustand";


export const useFileContextMenuStore=create((set)=>{
    return{
        x:null,
        y:null,
        isOpen:null,
        path:null,
        setX:(inComingX)=>{
            set({
                x:inComingX
            })
        },
        setY:(inComingY)=>{
            set({
                y:inComingY
            })
        },
        setOpen:(inComingIsOpen)=>{
            set({
                isOpen:inComingIsOpen
            })
        },
        setPath:(path)=>{
            set({
                path:path
            })
        }
    }
})