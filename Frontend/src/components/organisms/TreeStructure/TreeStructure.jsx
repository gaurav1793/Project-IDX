import React, { useEffect } from 'react'
import { useTreeStructureStore } from '../../../store/treeStructureStore'
import { useParams } from 'react-router-dom';

const TreeStructure = () => {
    const {treeStructure,setTreeStructure} = useTreeStructureStore();
    const {projectId} =  useParams();

    useEffect(()=>{
        console.log("helo projectID",projectId);
        if(treeStructure){
            console.log("tree =>",treeStructure);
        }
        else{
            console.log("helo from set");
            setTreeStructure(projectId);
        }
    },[projectId,treeStructure,setTreeStructure])
  return (
    <>
        <div>TreeStructure</div>
    </>
  )
}

export default TreeStructure