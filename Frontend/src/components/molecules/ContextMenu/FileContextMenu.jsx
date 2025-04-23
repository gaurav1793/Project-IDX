import React, { useState } from 'react'
import { useEditorSocketStore } from '../../../store/editorSocketStore'
import { useFileContextMenuStore } from '../../../store/fileContextMenuStore';


const FileContextMenu = ({x,y,path}) => {

    const {editorSocket}= useEditorSocketStore();
    const {setOpen} = useFileContextMenuStore();
    const [openInput , SetOpenInput]=useState(false);
    const [value,setValue]= useState('');

    function handleDelete(){
        editorSocket.emit('deleteFile',{
            pathToFileOrFolder:path
        })
    }

    function handleRename(){
      console.log("cicked on rename")
        SetOpenInput(true);
    }
    {console.log("re-render hua hai")}
    function handleInput(e){
      setValue(e.target.value);
    }
    function handleEnter(e){
      if(e.key=='Enter'){
        editorSocket.emit('rename',{
          oldName:path,
          newName:value
        })
        setOpen(false);
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
        <button className='w-[100%] h-[30px]  cursor-pointer rounded-md hover:bg-[#4d4b4b]' onClick={handleDelete}>Delete File</button>
        
        { openInput ? <input  
                              className='text-black w-[100%] rounded-md'
                              value={value}
                              onChange={(e)=>{handleInput(e)}}
                              onKeyDown={(e)=>{handleEnter(e)}}
                              /> 
          :
         <button className='w-[100%] h-[30px]  cursor-pointer rounded-md hover:bg-[#4d4b4b]' onClick={handleRename}>Rename File</button>}
    </div>
  )
}

export default FileContextMenu