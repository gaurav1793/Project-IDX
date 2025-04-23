import { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { getProjectTree } from "../apis/ProjectApi";



export const useTreeStructureStore = create((set,get) => {

    const queryClient = new QueryClient();

    return {
        projectId:null,
        setProjectId:(id)=>{
            set({
                projectId:id
            })
        },

        
        treeStructure: null,
        setTreeStructure: async () => {
            const projectId=get()?.projectId;
            console.log("hlo form store tree structure id ",projectId);
            const data = await queryClient.fetchQuery({
                queryKey: [`treeStructure-${projectId}`],
                queryFn: () => getProjectTree({projectId})
            })

            console.log("hlo form tree structure store", data);
            
            set({
                treeStructure: data
            })
        }
    }

})