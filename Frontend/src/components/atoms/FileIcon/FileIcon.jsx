import React from 'react'
import { FaGitAlt, FaSquareJs ,FaCircleInfo ,FaCss3,FaReact } from "react-icons/fa6";
import { RiNodejsFill } from "react-icons/ri";
import { SiHtml5 ,SiSvg } from "react-icons/si";
import { FcSettings  ,FcOpenedFolder} from "react-icons/fc";


const FileIcon = ({extension}) => {
  return (
    (extension==='js' && <FaSquareJs color='yellow' style={{height:"20px", width:"20px", paddingRight:"4px"}}/> ||
    extension==='json' && <RiNodejsFill color='GreenYellow' style={{height:"20px", width:"20px", paddingRight:"4px"}} /> ||
    extension==='gitignore' && <FaGitAlt color='red' style={{height:"20px", width:"20px", paddingRight:"4px"}}/>  ||
    extension==='html' && <SiHtml5 color='OrangeRed' style={{height:"20px", width:"20px", paddingRight:"4px"}}/>||
    extension==='svg' && <SiSvg color='Gold' style={{height:"20px", width:"20px", paddingRight:"4px"}}/> ||
    extension==='md' && <FaCircleInfo color='DodgerBlue' style={{height:"20px", width:"20px", paddingRight:"4px"}}/>  ||
    extension==='css' && <FaCss3 color='RoyalBlue' style={{height:"20px", width:"20px", paddingRight:"4px"}}/> ||
    extension==='jsx' && <FaReact color='aqua' style={{height:"20px", width:"20px", paddingRight:"4px"}}/>||
    extension==='env' && <FcSettings color='SandyBrown' style={{height:"20px", width:"20px", paddingRight:"4px"}}/> ||
    extension==='folder' && <FcOpenedFolder style={{height:"25px", width:"25px", paddingRight:"4px"}}/> 
    )
  )
}

export default FileIcon