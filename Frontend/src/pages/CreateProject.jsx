import React from 'react'
import { useCreateProject } from '../hooks/apis/mutation/useCreateProject.js'
import {Button, Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
    const { createProjectMutation } = useCreateProject();
    const navigate = useNavigate();
    async function handleCreateProject() {
        console.log("Creating project");
        try {
            const response = await createProjectMutation();
            console.log('response', response);
            const projectId=response.data;
            console.log('hlo fomr craet project pid:',projectId);
            navigate(`/project/${projectId}`);
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