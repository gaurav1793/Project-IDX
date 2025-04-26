import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EditorComponent from '../components/molecules/EditorComponent/EditorComponent'
import EditorButton from '../components/atoms/EditorButton/EditorButton'
import TreeStructure from '../components/organisms/TreeStructure/TreeStructure'
import { useTreeStructureStore } from '../store/treeStructureStore'
import { useEditorSocketStore } from '../store/editorSocketStore'
import { io } from 'socket.io-client'
import BrowserTerminal from '../components/molecules/BrowserTerminal/BrowserTerminal'

const ProjectPlayground = () => {
    const {projectId:projectIdFromUrl} =useParams();

    const {projectId,setProjectId} =useTreeStructureStore();
    const { setEditorSocket} = useEditorSocketStore();

    useEffect(()=>{
     if(projectIdFromUrl){
        setProjectId(projectIdFromUrl);
        const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`,{
          query:{
            projectId:projectIdFromUrl
          }
        })
        setEditorSocket(editorSocketConn);
     }
    },[projectIdFromUrl,setProjectId ,setEditorSocket]);
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
            <div className='flex flex-col w-[80%] overflow-hidden'>
              <div>
                <EditorButton isactive={false}/>
                <EditorButton isactive={true}/>
                <EditorButton isactive={false}/>
              </div>
              
              <EditorComponent/>
              <BrowserTerminal/>
            </div>
            
        </div>
    </div>
  )
}

export default ProjectPlayground