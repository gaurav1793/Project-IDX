import React, { useState } from 'react'
import { IoIosArrowForward ,IoIosArrowDown } from "react-icons/io";
import FileIcon from '../../atoms/FileIcon/FileIcon';
import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { useFileContextMenuStore } from '../../../store/fileContextMenuStore';
import { useFolderContextMenuStore } from '../../../store/folderContextMenuStore';


const TreeNode = ({fileFolderData}) => {
    const [visiblity , setVisiblity]=useState({});
    const {editorSocket} = useEditorSocketStore();
    const {setX ,setY,setOpen,setPath}= useFileContextMenuStore();
    const {setX:folderX , setY:folderY , setOpen:folderOpen,setPath:folderPath}=useFolderContextMenuStore();

    function toggleVisiblity(name){
        setVisiblity({...visiblity, [name]:!visiblity[name]} )
        // console.log(visiblity[name]);

        // let x={"a":true , "b":true}
        //so when i write x["a"] it will give me value true
        //and now i am creating a new obj 
        //where for this key  "a" : !x["a"] ==> "a":!ture ==> "a":false
        // let y = {"a":false}
        // name is a string and when key is a string we can not write if we just write name
        //  then it will create a name a key 
        // but we want that actual file name public should be key

    }

    function handleClick(fileFolderData){
        console.log("hi form handle click",fileFolderData); 
        editorSocket.emit('readFile',{
            pathToFileOrFolder:fileFolderData.path
        })
    }

    function handleFolderRightClick(e,path){
        e.preventDefault();
        folderX(e.clientX);
        folderY(e.clientY);
        folderPath(path);
        folderOpen(true);
    }

    function handleRightClick(e,fileFolderData){
        e.preventDefault();
        console.log(fileFolderData.path,e.clientX,e.clientY);
        setX(e.clientX);
        setY(e.clientY);
        setOpen(true);
        setPath(fileFolderData.path);
    }
  return (
    (fileFolderData && 
        <div className='pl-[10px]'>
            {
                fileFolderData.children?
                (<button onClick={()=>{toggleVisiblity(fileFolderData.name)}}
                    onContextMenu={(e)=>{handleFolderRightClick(e,fileFolderData.path)}}
                    className='pt-[5px] border-none outline-none cursor-pointer  text-[16px] text-white flex justify-center items-center'>
                    { !visiblity[fileFolderData.name]? <IoIosArrowForward className='h-5 w-5' />:<IoIosArrowDown className='h-5 w-5'/>} <FileIcon extension={'folder'}/>{fileFolderData.name}
                    </button>
                ):
                (
                <p className='pt-[5px]  pl-[25px]  text-white cursor-pointer text-[15px] flex'
                    onClick={()=>{handleClick(fileFolderData)}}
                    onContextMenu={(e)=>{handleRightClick(e,fileFolderData)}}
                >
                        <FileIcon extension={fileFolderData.name.split(".").pop()}/> {fileFolderData.name}
                    
                </p>)
            }
            {
                visiblity[fileFolderData.name] && //children check knre k jrurt hi nhi kyuki agar koe 
                //file hai to vo kabhi visibltiy object m jayegi hi nhi
                (fileFolderData.children.map((child)=>
                    (   
                        <TreeNode fileFolderData={child} key={child.name}/>
                    )
                ))
            }
        </div>
    )
  )
}

export default TreeNode