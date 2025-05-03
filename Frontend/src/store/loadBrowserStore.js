import { create } from "zustand";


export const useLoadBrowserStore =create((set)=>{
    return {
        loadBrowser:false,
        setLoadBrowser:(value)=>{
            set({
                loadBrowser:value,
            })
        }
    }
})