    import React, { useEffect, useRef } from 'react'
    import { useEditorSocketStore } from '../../../store/editorSocketStore';
    import { usePortStore } from '../../../store/portStore';
    import { RxReload } from "react-icons/rx";
    import { useTerminalSocketStore } from '../../../store/terminalSocketStore';

    const Browser = ({projectId}) => {
        
        const browserRef = useRef(null);

        const { port } = usePortStore();

        const { editorSocket } = useEditorSocketStore();
        const {terminalSocket}=useTerminalSocketStore();

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

        if(!port){
            return <div>Loading...</div>
        }
    return (
        <div className='bg-[#22212b]  w-[133%] border-2 border-yellow-300'>
            <div className='flex justify-center items-center gap-4 p-2'>
            <RxReload color='red' className='cursor-pointer' size={30} onClick={handleRefresh}/>
            <input  style={{
                width:'100%',
                height:'30px',
                color:'white',
                fontFamily:'Fire Code',
                backgroundColor:"#282a35",

                }} 
                defaultValue={`http://localhost:${port}`}
            />
            
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