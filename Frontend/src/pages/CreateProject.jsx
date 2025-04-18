import React from 'react'
import { useCreateProject } from '../hooks/apis/mutation/useCreateProject.js'

const CreateProject = () => {
    const { createProjectMutation } = useCreateProject();
    async function handleCreateProject() {
        console.log("Creating project");
        try {
            await createProjectMutation();
            console.log('completed now redirecting to editior')
        } catch (error) {
            console.log("error in creating a project",error.message)
        }
    }
  return (
    <div>
        <h1>createProject</h1>
        <button onClick={handleCreateProject}>create</button>
    </div>
  )
}

export default CreateProject