import express from 'express'
import cors from 'cors'

import {createServer} from 'node:http'
import { Server } from 'socket.io'
import chokidar from 'chokidar'

import { PORT } from './config/serverConfig.js';
import apiRouter from '../src/routes/index.js'
import { editorHandlerSocketEvent } from './SocketHandler/editorHandler.js'

const app = express();
const server = createServer(app);
const io = new Server(server ,{
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// io.on('connection',(socket)=>{
//     console.log('user is connected');
// })

app.use('/api',apiRouter);


const editorNameSpace = io.of('/editor');

editorNameSpace.on('connection',(socket)=>{
    console.log('editor is connected');

    let projectId=socket.handshake.query.projectId;

    console.log('helo from editer name space project id is =>',projectId);
    if(projectId){
        var watcher = chokidar.watch(`/projects/${projectId}`,{
            ignored:(path)=>path.includes('node_modules'), //ignore any changes happen in node_module folder
            persistent:true, //keep watcher in running state till the app is running
            awaitWriteFinish:{
                stabilityThreshold:2000 // wait for 2 second instead of direclty emit a event of add or delete
                //if user make any change in file or folder
            },
            ignoreInitial:true //ignore initail files in directory
        });

        watcher.on('all',(event , path)=>{
            console.log('path : ',path);
            console.log('event : ',event);
        });
    }
    
   editorHandlerSocketEvent(socket)

    socket.on('disconnect',async()=>{
        // watcher.close();
        console.log('editor disconnected')
    })
})

server.listen(PORT,()=>{
    console.log(`server started at PORT :${PORT}`);
})