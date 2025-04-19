import { useMutation } from "@tanstack/react-query"
import { createProjectApi } from "../../../apis/ProjectApi"

export const useCreateProject = ()=>{
    const {mutateAsync, isPending ,isSuccess,isError}=useMutation({
        mutationFn:createProjectApi,
        onSuccess:(data)=>{console.log(data)},
        onError:(error)=>{console.log(error)}
    })

    return {
        createProjectMutation:mutateAsync,
        isPending,
        isSuccess,isError
    }
}