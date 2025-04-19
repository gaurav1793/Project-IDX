import uuid4 from 'uuid4'
import fs  from 'fs/promises'
import { PROJECT_COMMAND } from '../config/serverConfig.js';
import { exec } from '../utils/execUtils.js';
import path from 'path'
import directoryTree from 'directory-tree'

export const createProjectService =async()=>{
    try {
        //create unique id and after that create a new folder in projects folder using that id as folder name
        const projectId = uuid4();
        console.log(projectId);
        await fs.mkdir(`./projects/${projectId}`);

        //need to run npm create vite command to create projct in that folder
        const response = await exec(PROJECT_COMMAND,{
            cwd:`./projects/${projectId}`
        })

        return projectId;
    } catch (error) {
        throw error;
    }
}

export const getProjectTreeService = async(projectId)=>{

    const projectPath = path.resolve(`./projects/${projectId}`);
    console.log("this is project paht in service ",projectPath)
    const tree = directoryTree(projectPath)
    console.log("tree in service ",tree);
    return tree;
}