import { createProjectService, getProjectTreeService } from '../services/projectService.js';



export const projectControllers = async(req,res)=>{
    try {
        const projectId=await createProjectService();
        return res.status(200).json({message : "project creted" , data:projectId});
    } catch (error) {
        
    }
}

export const getProjectTreeController = async(req,res)=>{
    try {
        const projectId = req.params.projectId
        console.log("this is project id",projectId);
        const tree = await getProjectTreeService(projectId);
        console.log("this is tree",tree);
        res.status(200).json({
            data:tree,
            message:"successfully fetched tree path"
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}