import React, { useEffect } from 'react'
import { useTreeStructureStore } from '../../../store/treeStructureStore'
import TreeNode from '../../molecules/TreeNode/TreeNode';


const TreeStructure = () => {

    const {treeStructure,setTreeStructure} = useTreeStructureStore();

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
        <div>
        <TreeNode fileFolderData={treeStructure}/>
        </div>
    </>
  )
}

export default TreeStructure