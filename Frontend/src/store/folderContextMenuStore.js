import { create } from "zustand";


export const useFolderContextMenuStore = create((set)=>{
    return {
        x:null,
        y:null,
        path:null,
        isOpen:null,
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