import React from 'react'
import { useParams } from 'react-router-dom'
import EditorComponent from '../components/molecules/EditorComponent/EditorComponent'

const ProjectPlayground = () => {
    const {projectId} =useParams()
  return (
    
    <div>
        {console.log("hi:" ,projectId)}
        ProjectPlayground id {projectId}
        <EditorComponent/>
    </div>
  )
}

export default ProjectPlayground