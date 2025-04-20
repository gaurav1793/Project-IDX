import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EditorComponent from '../components/molecules/EditorComponent/EditorComponent'
import EditorButton from '../components/atoms/EditorButton/EditorButton'
import TreeStructure from '../components/organisms/TreeStructure/TreeStructure'
import { useTreeStructureStore } from '../store/treeStructureStore'

const ProjectPlayground = () => {
    const {projectId:projectIdFromUrl} =useParams();

    const {projectId,setProjectId} =useTreeStructureStore();

    useEffect(()=>{
      setProjectId(projectIdFromUrl);
    },[projectIdFromUrl,projectId]);
  return (
    
    <div>
        {console.log("hi:" ,projectIdFromUrl)}
        ProjectPlayground id {projectIdFromUrl}
        <br/>
        <div className='flex'>
          {projectId &&
            <div className='bg-[#333254] pr-[10px] pt-[0.3vh] min-w-[250px] max-w-[25%] h-[99.7vh] overflow-auto'>
                <TreeStructure/>
            </div>
          }
            <div className='flex flex-col w-[100%]'>
              <div>
                <EditorButton isactive={false}/>
                <EditorButton isactive={true}/>
                <EditorButton isactive={false}/>
              </div>
              
              <EditorComponent/>
            </div>
        </div>
    </div>
  )
}

export default ProjectPlayground