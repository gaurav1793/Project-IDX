import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EditorComponent from '../components/molecules/EditorComponent/EditorComponent'
import EditorButton from '../components/atoms/EditorButton/EditorButton'
import TreeStructure from '../components/organisms/TreeStructure/TreeStructure'
import { useTreeStructureStore } from '../store/treeStructureStore'
import { useEditorSocketStore } from '../store/editorSocketStore'
import { io } from 'socket.io-client'
import BrowserTerminal from '../components/molecules/BrowserTerminal/BrowserTerminal'
import { useTerminalSocketStore } from '../store/terminalSocketStore'
import Browser from '../components/organisms/Browser/Browser'
import { usePortStore } from '../store/portStore'
import { Allotment } from 'allotment'
import { useLoadBrowserStore } from '../store/loadBrowserStore'

const ProjectPlayground = () => {
  const { projectId: projectIdFromUrl } = useParams();

  const { projectId, setProjectId } = useTreeStructureStore();
  const { editorSocket, setEditorSocket } = useEditorSocketStore();
  const { terminalSocket, setTerminalSocket } = useTerminalSocketStore();
  // const [loadBrowser, setLoadBrowser] = useState(false);
  const {loadBrowser, setLoadBrowser}=useLoadBrowserStore();


  useEffect(() => {
    if (projectIdFromUrl) {
      setProjectId(projectIdFromUrl);
      const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
        query: {
          projectId: projectIdFromUrl
        }
      })

      try {
        const ws = new WebSocket("ws://localhost:3000/terminal?projectId=" + projectIdFromUrl);
        setTerminalSocket(ws);
      } catch (error) {
        console.log("error in creating websocket");
      }
      setEditorSocket(editorSocketConn);

      // if(terminalSocket){
      //   editorSocket?.emit("getPort",{
      //     containerName:projectIdFromUrl
      //   })
      // }

    }
  }, [projectIdFromUrl, setProjectId, setEditorSocket]);

  return (

    <div>
      <div className='flex'>
        {projectId &&
          <div className='bg-[#333254] '>
            <TreeStructure />
          </div>
        }
        <div className='w-[100vw] h-[100vh]'>
          <Allotment>
            <div className='h-[100%] w-[100%]  bg-[#282a36]'>

                <div>
                <EditorComponent />
                </div>
                <div>
                  <BrowserTerminal />
                </div>

            </div>
            <div>
             {(!loadBrowser)&& <div className="flex items-center justify-center h-full bg-[#1e1e2f]">
  <div className='p-5 space-y-4 h-[100vh]'>
    <div>
      <button
        className="px-6 py-3 text-white bg-purple-600 hover:bg-purple-700 border-2 border-purple-800 rounded-xl shadow-md transition-all duration-200"
        onClick={() => setLoadBrowser(true)}
      >
        🚀 Get Browser
      </button>
    </div>
    <div className="bg-white border border-gray-300 p-4 rounded-lg shadow max-w-2xl w-full mb-6">
  <p className="font-semibold text-gray-700 mb-2">Run these commands in terminal:</p>
  <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap font-mono text-blue-600">
{`npm install
npm run dev`}
  </pre>
  <p className="text-sm text-gray-500 mt-2">
    If terminal does not respond, try refreshing the browser after a few seconds.
  </p>
</div>

    <div>
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
    </div>
  </div>
</div>}
              {loadBrowser && projectId && terminalSocket && <Browser projectId={projectId} />}
            </div>
          </Allotment>
        </div>
        {/* <div className=''>
              <div>
                <EditorButton isactive={false}/>
                <EditorButton isactive={true}/>
                <EditorButton isactive={false}/>
              </div>
              
            </div> */}

      </div>

    </div>
  )
}

export default ProjectPlayground