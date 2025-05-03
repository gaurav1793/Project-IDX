    import React, { useEffect, useRef } from 'react'
    import { useEditorSocketStore } from '../../../store/editorSocketStore';
    import { usePortStore } from '../../../store/portStore';
    import { RxReload } from "react-icons/rx";
    import { useTerminalSocketStore } from '../../../store/terminalSocketStore';
    import "allotment/dist/style.css";
    import { useLoadBrowserStore } from '../../../store/loadBrowserStore';
    import { FaRegWindowClose } from "react-icons/fa";

    const Browser = ({projectId}) => {
        
        const browserRef = useRef(null);

        const { port } = usePortStore();

        const { editorSocket } = useEditorSocketStore();
        const {terminalSocket}=useTerminalSocketStore();
        const {setLoadBrowser}=useLoadBrowserStore();

        useEffect(() => {
            if(!port ) {
                console.log("getting port");
                editorSocket?.emit("getPort", {
                    containerName: projectId
                })
            }
        }, [port,editorSocket]); 

        function handleRefresh() {
            if(browserRef.current) {
                const oldAddr = browserRef.current.src;
                browserRef.current.src = oldAddr;
            }
        }
        function handleCross(){
            console.log("clicked close");
            setLoadBrowser(false);
        }

        if(!port){
            return <div>Loading...</div>
        }
    return (
        <div className='bg-[#22212b]'>
            <div className='flex justify-center items-center gap-4 p-2'>
            <RxReload color='green' className='cursor-pointer' size={30} onClick={handleRefresh}/>
            <input  style={{
                width:'100%',
                height:'30px',
                color:'white',
                fontFamily:'Fire Code',
                backgroundColor:"#282a35",

                }} 
                defaultValue={`http://localhost:${port}`}
            />
            <FaRegWindowClose  color='red' className='cursor-pointer' size={30} onClick={handleCross}/>
            </div>
            <iframe ref={browserRef}
                src={`http://localhost:${port}`}
                style={{
                    width:"100%",
                    height:"95vh",
                    border:'none'
                }}
            />
            
        </div>
    )
    }

    export default Browser