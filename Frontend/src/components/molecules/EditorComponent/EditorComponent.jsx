import React, { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'

import { useActiveFileTabStore } from '../../../store/activeFileTabStore'
import { useEditorSocketStore } from '../../../store/editorSocketStore'

const EditorComponent = () => {

    let timeOut = null;
    const [editorState,setEditorState] =useState({theme:null})
    const {activeFileTab} = useActiveFileTabStore();
    const {editorSocket } =useEditorSocketStore();
    

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

    function handleChange(value,e){
        
        if(timeOut != null){
            clearTimeout(timeOut)
        }
       timeOut = setTimeout(()=>{
            
            editorSocket.emit('writeFile',{
                data:value,
                pathToFileOrFolder:activeFileTab?.path
            })
       } ,2000);
    }

    function handleEditorlang(extension){
        const fileTypes={
            css: 'css',
            js: 'javascript',
            jsx: 'javascript',
            ts: 'typescript',
            tsx: 'typescript',
            json: 'json',
            html: 'html',
            htm: 'html',
            md: 'markdown',
            markdown: 'markdown',
            mjs: 'javascript',
            cjs: 'javascript',
            yaml: 'yaml',
            yml: 'yaml',
            xml: 'xml',
            sh: 'shell',
            bash: 'shell',
            py: 'python',
            pyw: 'python',
            java: 'java',
            c: 'c',
            cpp: 'cpp',
            cc: 'cpp',
            h: 'cpp',
            cs: 'csharp',
            php: 'php',
            go: 'go',
            rs: 'rust',
            swift: 'swift',
            ruby: 'ruby',
            rb: 'ruby',
            sql: 'sql',
            dockerfile: 'dockerfile',
            makefile: 'makefile',
            ini: 'ini',
            toml: 'toml',
            plist: 'xml',
            vue: 'html',
        }

        return fileTypes[extension];
    }

  return (
    <>
        {
            editorState.theme &&
            <Editor
                height={'95vh'}
                width={'100%'}
                defaultLanguage='plaintext'
                defaultValue="//welcome to Playground"
                options={{
                    fontSize:'20px'
                }}
                onMount={handleEditorThemeMount}  
                onChange={handleChange}
                value={activeFileTab?.value ? activeFileTab.value : "//welcome to Playground"}
                language={activeFileTab?.extension ? handleEditorlang(activeFileTab.extension): 'plaintext'}
            />
        }
    </>
  )
}

export default EditorComponent