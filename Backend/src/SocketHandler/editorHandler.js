import fs from 'fs/promises'
import path from 'path'

export const editorHandlerSocketEvent = (socket,editorNameSpace)=>{

    socket.on('writeFile',async({data,pathToFileOrFolder})=>{
        try {
            console.log("helo from writeFile handler this is data =>",data);
            console.log("helo from writeFile handler this is path =>",pathToFileOrFolder);

            const response = await fs.writeFile(pathToFileOrFolder,data);

            editorNameSpace.emit("write file sucessfully",{
                data:"file written successfully",
                path:pathToFileOrFolder
            })
        } catch (error) {
            socket.emit('error',{
                data:'error writing in file'
            })
            throw {
                message:error.message
            }
            
        }
    })

    socket.on("createFile",async({pathToFileOrFolder})=>{
        
        const fileAlreadyExist = await fs.stat(pathToFileOrFolder);
        if(fileAlreadyExist){
            socket.emit('error',{
                data :"file already exist"
            })
        }

        try {
            const response =  await fs.writeFile(pathToFileOrFolder ,"");
            socket.emit('createFileSuccess',{
                data:'file created successfully'
            })
        } catch (error) {
            console.log('error in create file',error.message);
            socket.emit('error',{
                data:`error in creating file ${error.message}`
            })
            
        }
    })

    socket.on('readFile',async({pathToFileOrFolder})=>{
        try {
            const response =  await fs.readFile(pathToFileOrFolder);
            console.log(response.toString(),pathToFileOrFolder);
            
            socket.emit('readFileSuccess',{
                path:pathToFileOrFolder,
                data:response.toString()
            })
        } catch (error) {
            socket.emit('error',{
                data:`error ${error.message}`
            })
        }
    })

    socket.on('deleteFile',async({pathToFileOrFolder})=>{
        try {
            const response = await fs.unlink(pathToFileOrFolder);
            socket.emit('deletedFileSucces',{
                data:'file deleted successfully'
            })
        } catch (error) {
            socket.emit('deletedFile',{
                data:`file is deleted`
            })
        }
    })

    socket.on('createFolder' , async({pathToFileOrFolder})=>{
        const folderAlreadyExist = await fs.stat(pathToFileOrFolder);
        if(folderAlreadyExist){
            socket.emit('folderExist',{
                data:"folder already exsits"
            })
        }

        try {
            const response = await fs.mkdir(pathToFileOrFolder);
            socket.emit('folderCreated',{
                data:'folder created succcessfully'
            })
        } catch (error) {
            socket.emit('error',{
                data:`error in creating folder ${error.message}`
            })
        }
    })


    socket.on('rename',async({oldName,newName})=>{
        console.log("hlo from rename",oldName,newName);
        const dir = path.dirname(oldName);
        const newPath = path.join(dir,newName);
        console.log('new path',newPath)
        try {
            const response = await fs.rename(oldName,newPath);
            socket.emit('renameSuccess',{
                data:"rename success"
            })
        } catch (error) {
            socket.emit('error',{
                data:`error occured  ${error.message}`
            })
        }
    })

    socket.on('createFolder',async({newFolderPath})=>{
       try {
        const safePath = path.normalize(newFolderPath)
        console.log('back ', safePath);

        // await fs.mkdir(newPath);
        // socket.emit('folderCreatedSuccess',{
        //     data:'created success'
        // })
       } catch (error) {
        throw error
       }
        
    })
}