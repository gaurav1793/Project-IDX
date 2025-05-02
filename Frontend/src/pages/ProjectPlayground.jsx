import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EditorComponent from '../components/molecules/EditorComponent/EditorComponent'
import EditorButton from '../components/atoms/EditorButton/EditorButton'
import TreeStructure from '../components/organisms/TreeStructure/TreeStructure'
import { useTreeStructureStore } from '../store/treeStructureStore'
import { useEditorSocketStore } from '../store/editorSocketStore'
import { io } from 'socket.io-client'
import BrowserTerminal from '../components/molecules/BrowserTerminal/BrowserTerminal'
import { useTerminalSocketStore } from '../store/terminalSocketStore'
import Browser from '../components/organisms/Browser/Browser'
import { usePortStore } from '../store/portStore'


const ProjectPlayground = () => {
    const {projectId:projectIdFromUrl} =useParams();

    const {projectId,setProjectId} =useTreeStructureStore();
    const { editorSocket ,setEditorSocket} = useEditorSocketStore();
    const { terminalSocket,setTerminalSocket}=useTerminalSocketStore();


    useEffect(()=>{
     if(projectIdFromUrl){
        setProjectId(projectIdFromUrl);
        const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`,{
          query:{
            projectId:projectIdFromUrl
          }
        })

        try {
          const ws=new WebSocket("ws://localhost:3000/terminal?projectId="+projectIdFromUrl);
          setTerminalSocket(ws);
        } catch (error) {
          console.log("error in creating websocket");
        }
        setEditorSocket(editorSocketConn);

        // if(terminalSocket){
        //   editorSocket?.emit("getPort",{
        //     containerName:projectIdFromUrl
        //   })
        // }

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
            <div className='flex flex-col min-w-[50%] overflow-hidden'>
              <div>
                <EditorButton isactive={false}/>
                <EditorButton isactive={true}/>
                <EditorButton isactive={false}/>
              </div>
              
              <EditorComponent/>
              <BrowserTerminal/>
            </div>
            <div>
              {projectId && terminalSocket && <Browser projectId={projectId}/>}
            </div>
            
        </div>
    </div>
  )
}

export default ProjectPlayground