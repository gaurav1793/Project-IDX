import React, { useState } from 'react'
import { IoIosArrowForward ,IoIosArrowDown } from "react-icons/io";
import FileIcon from '../../atoms/FileIcon/FileIcon';


const TreeNode = ({fileFolderData}) => {
    const [visiblity , setVisiblity]=useState({});

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
  return (
    (fileFolderData && 
        <div className='pl-[10px]'>
            {
                fileFolderData.children?
                (<button onClick={()=>{toggleVisiblity(fileFolderData.name)}} className='pt-[5px] border-none outline-none cursor-pointer  text-[16px] text-white flex justify-center items-center'>
                  { !visiblity[fileFolderData.name]? <IoIosArrowForward className='h-5 w-5 pr-[4px]' />:<IoIosArrowDown className='h-5 w-5 pr-[4px]'/>} <FileIcon extension={'folder'}/>{fileFolderData.name}
                </button>):
                (<p className='pt-[5px]  pl-[10px]  text-white cursor-pointer text-[15px] flex'>
                    <div className='flex justify-center items-center'>
                        <FileIcon extension={fileFolderData.name.split(".").pop()}/> {fileFolderData.name}
                    </div>
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