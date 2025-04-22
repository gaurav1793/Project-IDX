import React from 'react'
import { useEditorSocketStore } from '../../../store/editorSocketStore'


const FileContextMenu = ({x,y,path}) => {

    const {editorSocket}= useEditorSocketStore();

    function handleDelete(e){
        e.preventDefault();
        console.log("clicked on delete")
        // editorSocket.emit('deleteFile',{
        //     pathToFileOrFolder:path
        // })
    }

    function handleRename(){
        console.log("cicked on rename")
        // editorSocket.emit('rename',{
        //     pathToFileOrFolder:path
        // })
    }

  return (
    <div className='w-[120px] fixed  left-[x] top-[y] border-2 border-solid border-black'>
        <button onClick={handleDelete}>Delete File</button>
        <button onClick={handleRename}>Rename File</button>
    </div>
  )
}

export default FileContextMenu