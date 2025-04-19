import React, { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'

const EditorComponent = () => {

    const [editorState,setEditorState] =useState({theme:null})

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
  return (
    <>
        {
            editorState.theme &&
            <Editor
                height={'80vh'}
                width={'100%'}
                defaultLanguage='javascript'
                defaultValue='// Welcome to Playground'
                options={{
                    fontSize:'20px'
                }}
                onMount={handleEditorThemeMount}  
            />
        }
    </>
  )
}

export default EditorComponent