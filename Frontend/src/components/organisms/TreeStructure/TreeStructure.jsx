import React, { useEffect } from 'react'
import { useTreeStructureStore } from '../../../store/treeStructureStore'
import TreeNode from '../../molecules/TreeNode/TreeNode';
import { useFileContextMenuStore } from '../../../store/fileContextMenuStore';
import FileContextMenu from '../../molecules/ContextMenu/FileContextMenu';
import FolderContextMenu from '../../molecules/ContextMenu/FolderContextMenu';
import { useFolderContextMenuStore } from '../../../store/folderContextMenuStore';


const TreeStructure = () => {

    const {treeStructure,setTreeStructure} = useTreeStructureStore();
    const {
        x:fileContextX,
        y:fileContextY,
        path:fileContextPath,
        isOpen:fileContextOpen}= useFileContextMenuStore();

    const {
        x:folderContextX,
        y:folderContextY,
        isOpen:folderContextOpen,
        path:folderContextPath} = useFolderContextMenuStore();

    useEffect(()=>{
        if(treeStructure){
            console.log("tree =>",treeStructure);
        }
        else{
            console.log("helo from set");
            setTreeStructure();
        }
    },[treeStructure,setTreeStructure])
  return (
    <>
        <div >
        {
            fileContextX && fileContextY && fileContextOpen && (<FileContextMenu x={fileContextX} y={fileContextY} path={fileContextPath}/>)
        }
        {
            folderContextX && folderContextY && folderContextOpen && (<FolderContextMenu x={folderContextX} y={folderContextY} path={folderContextPath}/>)
        }
        <TreeNode fileFolderData={treeStructure}/>
        </div>
    </>
  )
}

export default TreeStructure