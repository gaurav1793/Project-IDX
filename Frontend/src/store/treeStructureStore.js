import { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { getProjectTree } from "../apis/ProjectApi";


export const useTreeStructureStore = create((set) => {

    const queryClient = new QueryClient();

    return {
        treeStructure: null,
        setTreeStructure: async (projectId) => {

            const data = await queryClient.fetchQuery({
                queryKey: [`treeStructure-${projectId}`],
                queryFn: () => getProjectTree({ projectId })
            })

            console.log("hlo form tree structure store", data);
            
            set({
                treeStructure: data
            })
        }
    }

})