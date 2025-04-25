import React, { useState } from 'react'
import { useFolderContextMenuStore } from '../../../store/folderContextMenuStore';
import { useEditorSocketStore } from '../../../store/editorSocketStore';

const FolderContextMenu = ({x,y,path}) => {

    const {setOpen}= useFolderContextMenuStore();
    const {editorSocket} = useEditorSocketStore();
    const [folderName , setFolderName] =useState('');
    const [folderInputOpen ,setFolderInputOpen]=useState(false);

    function handleCreateFile(){
        console.log("clicked on create file");
    }

    function handleCreateFolder(){
        setFolderInputOpen(true)
    }

    function handleFolderName(e){
        setFolderName(e.target.value);
    }

    function handleEnter(e){
        if(e.key =='Enter'){
            setFolderInputOpen(false);
            console.log("tere folder ka path",path);
            console.log('tere folder k value',folderName)
              const vsl =  `${path}\\${folderName}`
              console.log('newPath',vsl);
              const newPathFolder=path
            editorSocket.emit('createFolder',{
              newFolderPath:`${path}\\${folderName}`
            })
        }
    }

  return (
    <div className='w-[120px] text-white  border-[0.2px] p-1 border-slate-400 rounded-md bg-[#363545]'
      style={{
        position:'fixed',
        left:x,
        top:y
      }}
      onMouseLeave={()=>{
        setOpen(false);
      }}
    >
        <button className='w-[100%] h-[30px]  cursor-pointer rounded-md hover:bg-[#4d4b4b]' >Delete Folder</button>
        
        {/* { openInput ? <input  
                              className='text-black w-[100%] rounded-md'
                              value={value}
                              onChange={(e)=>{handleInput(e)}}
                              onKeyDown={(e)=>{handleEnter(e)}}
                              /> 
          :
         <button className='w-[100%] h-[30px]  cursor-pointer rounded-md hover:bg-[#4d4b4b]' onClick={handleRename}>Rename Folder</button>
        } */}
        {   folderInputOpen?

            <input  
                className='text-black w-[100%] rounded-md'
                value={folderName}
                onChange={(e)=>{handleFolderName(e)}}
                onKeyDown={(e)=>{handleEnter(e)}}
            />
            :
            <button className='w-[100%] h-[30px]  cursor-pointer rounded-md hover:bg-[#4d4b4b]' onClick={handleCreateFolder}>Create Folder</button>
        }
        <button className='w-[100%] h-[30px]  cursor-pointer rounded-md hover:bg-[#4d4b4b]' onClick={handleCreateFile}>Create File</button>
    </div>
  )
}

export default FolderContextMenu