import React from 'react'
import { useCreateProject } from '../hooks/apis/mutation/useCreateProject.js'
import {Button, Col, Row } from 'antd'

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
    <div > 
        <div className='flex justify-center  '> 
                <Button type='primary' size='large' onClick={handleCreateProject}>
                    Create PlayGround
                </Button>
        </div>
    </div>
  )
}

export default CreateProject