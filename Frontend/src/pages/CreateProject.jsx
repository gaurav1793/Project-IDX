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
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center px-6 py-12">
      
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Create a Vite React Playground</h1>

      <p className="text-gray-600 text-center max-w-2xl mb-6">
        By clicking the button below, a <span className="font-semibold text-purple-700">Vite + React project</span> will be created for you.
        After creation, run <code className="bg-gray-100 px-2 py-1 rounded text-sm">npm install</code> inside the terminal.
      </p>

      <div className="bg-white border border-gray-300 p-4 rounded-lg shadow max-w-2xl w-full mb-6">
        <p className="font-semibold text-gray-700 mb-2">Update your <code className="bg-gray-100 px-1 rounded">vite.config.js</code>:</p>
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap font-mono">
  {'export default defineConfig({\n'}
  <span className="text-green-600 font-semibold">
    {'  server: {\n'}
    {'    host: \'0.0.0.0\',  \n'}
    {'    port: 5173,\n'}
    {'    watch: {\n'}
    {'      usePolling: true,  \n'}
    {'      interval: 100,\n'}
    {'    },\n'}
    {'  },\n'}
  </span>
  {'  plugins: [react()]\n'}
  {'})'}
</pre>
      </div>

      <p className="text-gray-500 text-sm mb-4">
        If the terminal doesn't display output, try refreshing the  tab.
      </p>

      <Button
        type="primary"
        size="large"
        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-lg shadow-md"
        onClick={handleCreateProject}
      >
        🚀 Create Playground
      </Button>
    </div>
  )
}

export default CreateProject