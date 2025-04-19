import axios from '../config/axiosConfig.js'

export const createProjectApi = async ()=>{
    try {
        const response = await axios.post('/api/v1/project');
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error
    }
}


export const getProjectTree = async({projectId})=>{
    try {
       const response= await axios.get(`/api/v1/project/${projectId}/tree`);
       console.log("response from getproject tree" , response.data.data);
       return response?.data?.data;
    } catch (error) {
        throw error
    }
}
