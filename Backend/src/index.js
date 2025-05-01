import express from 'express'
import cors from 'cors'

import {createServer} from 'node:http'
import { Server } from 'socket.io'
import chokidar from 'chokidar'

import { PORT } from './config/serverConfig.js';
import apiRouter from '../src/routes/index.js'
import { editorHandlerSocketEvent } from './SocketHandler/editorHandler.js'
import { handleContainerCreate, listContainer } from './containers/handleContainerCreate.js'

import {WebSocketServer} from 'ws'
import { handleTerminalCreation } from './containers/handleTerminalCreation.js'

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
    
   editorHandlerSocketEvent(socket,editorNameSpace)

    socket.on('disconnect',async()=>{
        // watcher.close();
        console.log('editor disconnected')
    })
})

server.listen(PORT,()=>{
    console.log(`server started at PORT :${PORT}`);
})


const webSocketForTerminal = new WebSocketServer({
    noServer:true,
})

server.on("upgrade",(req,tcpSocket,head)=>{
    console.log("sabse phele me chalunga")
    const isTerminal =req.url.includes("/terminal");
    if(isTerminal){
        console.log(req.url);
        const projectId = req.url.split("=")[1];
        console.log('helo from upgrade id is',projectId)
        
        webSocketForTerminal.handleUpgrade(req,tcpSocket,head,(establishedWSConn)=>{
            console.log("connection upgraded");
            webSocketForTerminal.emit("connection",projectId,establishedWSConn,req,tcpSocket,head);
        })
    }
})

webSocketForTerminal.on("connection",async(projectId,ws,req,tcpSocket,head)=>{
    const container=await handleContainerCreate(projectId,webSocketForTerminal,req,tcpSocket,head);
    if(container){
        console.log('terminal is connected',container);
        handleTerminalCreation(container, ws);
        listContainer();
        ws.on('close',()=>{
            container.remove({force:true},(err,data)=>{
                if(err){
                    console.log('error while remoivng container',err);
                }
                console.log('contaniner  removed',data);
            });
        })
    }
})