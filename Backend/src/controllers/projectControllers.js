import util from 'util'
import  child_process from 'child_process'
import uuid4 from 'uuid4'
import fs  from 'fs/promises'

const exec = util.promisify(child_process.exec);


export const projectControllers = async(req,res)=>{
    try {
        //create unique id and after that create a new folder in projects folder using that id as folder name
        const projectId = uuid4();
        console.log(projectId);
        await fs.mkdir(`./projects/${projectId}`);

        //need to run npm create vite command to create projct in that folder
        const response = await exec('npm create vite@latest sandbox -- --template react',{
            cwd:`./projects/${projectId}`
        })

        return res.status(200).json({message : "project creted" , data:projectId});
    } catch (error) {
        throw error;
    }
}