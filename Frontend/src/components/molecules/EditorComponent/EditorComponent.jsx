import React, { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import { useEditorSocketStore } from '../../../store/editorSocketStore'
import { useActiveFileTabStore } from '../../../store/activeFileTabStore'

const EditorComponent = () => {

    const [editorState,setEditorState] =useState({theme:null})
    const {editorSocket}= useEditorSocketStore();
    const {activeFileTab,setActiveFileTab} = useActiveFileTabStore();
    

    const DownloadTheme =async()=>{
        const response=await fetch('/themes/Dracula.json')
        const data =await response.json();
        console.log(data);
        setEditorState({...editorState,theme:data});
    }

    useEffect(()=>{
        DownloadTheme();
    },[])

    function handleEditorThemeMount(editor,monaco){
        monaco.editor.defineTheme('Dracula', editorState.theme);
        monaco.editor.setTheme('Dracula');
    }

   
    editorSocket?.on('readFileSuccess',({path,data})=>{
        const extension =path.split('.').pop();
        console.log("extension is here",extension);
        setActiveFileTab(path,data)
        console.log("hell form editor readfile success front",path,"this is data =>",data);
    })
  return (
    <>
        {
            editorState.theme &&
            <Editor
                height={'80vh'}
                width={'100%'}
                defaultLanguage='javascript'
                defaultValue="//welcome to Playground"
                options={{
                    fontSize:'20px'
                }}
                onMount={handleEditorThemeMount}  
                value={activeFileTab?.value ? activeFileTab.value : "//welcome to Playground"}
            />
        }
    </>
  )
}

export default EditorComponent