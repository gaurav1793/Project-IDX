import React, { useState } from 'react'
import { useFolderContextMenuStore } from '../../../store/folderContextMenuStore';
import { useEditorSocketStore } from '../../../store/editorSocketStore';

const FolderContextMenu = ({x,y,path}) => {

    const {setOpen}= useFolderContextMenuStore();
    const {editorSocket} = useEditorSocketStore();
    const [folderName , setFolderName] =useState('');
    const [folderInputOpen ,setFolderInputOpen]=useState(false);
    const [fileName,setFileName]=useState('');
    const [fileInputOpen ,setFileInputOpen]=useState(false);
    const [openRenameInput,setOpenRenameInput] = useState(false);
    const [folderRename,setFolderRename]=useState('');
  
    function handleCreateFile(){
        setFileInputOpen(true);
    }

    function handleFileName(e){
      setFileName(e.target.value)
    }

    function handleFileEnter(e){
      const newPath = `${path}\\${fileName}`
      if(e.key=='Enter'){
        editorSocket.emit('createFile',{
          pathToFileOrFolder:newPath
        })
        setFileInputOpen(false)
      }
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
              pathToFileOrFolder:`${path}\\${folderName}`
            })
        }
    }

    function handleDelete(){
      editorSocket.emit('deleteFolder',{
        path:path
      })
    }

    function handleRename(){
      setOpenRenameInput(true);
    }

    function handleRenameInput(e){
      setFolderRename(e.target.value);
    }

    function handleRenameEnter(e){
      if(e.key=='Enter'){
        editorSocket.emit('rename',{
          oldName:path,
          newName:folderRename
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
        <button className='w-[100%] h-[30px]  cursor-pointer rounded-md hover:bg-[#4d4b4b]' onClick={handleDelete}>Delete Folder</button>
        
        { openRenameInput ? <input  
                              className='text-black w-[100%] rounded-md'
                              value={folderRename}
                              onChange={(e)=>{handleRenameInput(e)}}
                              onKeyDown={(e)=>{handleRenameEnter(e)}}
                              /> 
          :
         <button className='w-[100%] h-[30px]  cursor-pointer rounded-md hover:bg-[#4d4b4b]' onClick={handleRename}>Rename Folder</button>
        }
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
       { fileInputOpen?
          <input  
          className='text-black w-[100%] rounded-md'
          value={fileName}
          onChange={(e)=>{handleFileName(e)}}
          onKeyDown={(e)=>{handleFileEnter(e)}}
        />
        :
        <button className='w-[100%] h-[30px]  cursor-pointer rounded-md hover:bg-[#4d4b4b]' onClick={handleCreateFile}>Create File</button>}
    </div>
  )
}

export default FolderContextMenu