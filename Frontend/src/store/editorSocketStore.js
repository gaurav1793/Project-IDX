import { create } from "zustand"
import { useActiveFileTabStore } from "./activeFileTabStore"
import { useTreeStructureStore } from "./treeStructureStore";
import { usePortStore } from "./portStore";



function editorSocketHandler(socket){

    const setActiveFileTabSetter = useActiveFileTabStore.getState().setActiveFileTab;
        //cannot use another hook in hook loop/condiotn/function
        //  but zustand give permisson to use it like this
    const setTreeStructureSetter =useTreeStructureStore.getState().setTreeStructure;
    const  portsetter= usePortStore.getState().setPort;
    
    socket.on('readFileSuccess',({path,data})=>{
        const extension =path.split('.').pop();
        console.log("extension is here",extension);
        setActiveFileTabSetter(path,data,extension)
        console.log("hell form editor readfile success front",path,"this is data =>",data);
    })

    socket.on('write file sucessfully',({path})=>{
        console.log("helo from write file on now emiting read file" ,path);
        socket.emit('readFile',{
            pathToFileOrFolder:path
        })
    })

    socket.on('deletedFileSucces',()=>{
        setTreeStructureSetter();
        console.log('hello form delete success')
    })

    socket.on('renameSuccess',()=>{
        console.log('helo before treestructure setter');
        setTreeStructureSetter();
        console.log("hello from rename success");
    })

    socket.on('folderCreated',()=>{
        setTreeStructureSetter();
        console.log("hello from folder creted success");
    })

    socket.on('folderRemoved',()=>{
        setTreeStructureSetter();
        console.log('removed folder success');
    })

    socket.on('createFileSuccess',()=>{
        setTreeStructureSetter();
        console.log('created success');
    })

    socket.on("getPortSuccess",({port})=>{
        console.log("port is ",port)
        portsetter(port);
    })
}
export const useEditorSocketStore = create((set)=>{
    return {
        editorSocket:null,
        setEditorSocket:(incomingSocket)=>{
            
            editorSocketHandler(incomingSocket);
            set({
                editorSocket:incomingSocket
            })
        }
    }
})

