import React from 'react'
import { useParams } from 'react-router-dom'
import EditorComponent from '../components/molecules/EditorComponent/EditorComponent'
import EditorButton from '../components/atoms/EditorButton/EditorButton'
import TreeStructure from '../components/organisms/TreeStructure/TreeStructure'

const ProjectPlayground = () => {
    const {projectId} =useParams()
  return (
    
    <div>
        {console.log("hi:" ,projectId)}
        ProjectPlayground id {projectId}
        <br/>
        <TreeStructure/>
        <EditorButton isactive={false}/>
        <EditorButton isactive={true}/>
        <EditorButton isactive={false}/>
        <br/>
        <EditorComponent/>
    </div>
  )
}

export default ProjectPlayground