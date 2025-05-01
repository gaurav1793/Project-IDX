import React, { useEffect, useRef } from 'react'
import {Terminal} from '@xterm/xterm'
import {FitAddon} from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'
import {AttachAddon} from '@xterm/addon-attach'
import { useTerminalSocketStore } from '../../../store/terminalSocketStore'

const BrowserTerminal = () => {

    const terminalRef = useRef(null);
    // const socket = useRef(null);
    const {terminalSocket}=useTerminalSocketStore();
    

    useEffect(()=>{
        const term = new Terminal({
            cursorBlink:true,
            theme:{
                background:"#282a37",
                foreground:"#f8f8f3",
                cursor:"#f8f8f3",
                cursorAccent:"#282a37",
                red:"#ff5544",
                green:"#50fa7c",
                yellow:"#f1fa8c",
                cyan:"#8be9fd"
            },
            fontSize: 20,
            fontFamily: 'Fira Code, monospace',
            convertEol: true,
        })

        term.open(terminalRef.current);
        let fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        fitAddon.fit();

        if(terminalSocket){
            
            terminalSocket.onopen=()=>{
                const attachAddon = new AttachAddon(terminalSocket);
                term.loadAddon(attachAddon);
                
            }
        }

        return ()=>{
            term.dispose(); 
        }
    },[terminalSocket])

    
  return (
    <div 
        ref={terminalRef}
        className='terminal'
        id='terminal-container'
        style={{
            height:'25vh',
            border:'2px'
        }}>
        
    </div>
  )
}

export default BrowserTerminal