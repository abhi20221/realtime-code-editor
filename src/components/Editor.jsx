import React from "react";
import { useEffect,useRef } from "react";
import Codemirror from "codemirror";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/darcula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { ACTIONS } from "../Action";
//theme is not working!!!
//react-avatar version 4.0.0
const Editor = ({socketRef,roomId,onCodeChange}) => {
  const editorRef = useRef(null);
  useEffect(()=>{
    async function init(){
      editorRef.current = Codemirror.fromTextArea(document.querySelector("#realtimeEditor"),{
        mode:{name:'javascript++',json:true},
        theme:'darcula',
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      })
      editorRef.current.on('change',(instance,changes)=>{
       // console.log(changes);
        const {origin} = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if(origin !== 'setValue'){
          console.log("working!!");
          socketRef.current.emit(ACTIONS.CODE_CHANGE,{
            roomId,
            code, 
          });
        }
        console.log(code);
      })
  
    }
    
    init();
  },[]);
  useEffect(()=>{
    if(socketRef.current){
      socketRef.current.on(ACTIONS.CODE_CHANGE,({code})=>{
        console.log('recieving',code);
        if(code!==null){
          editorRef.current.setValue(code);
        }
      })
    }
    return ()=>{
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    }
  },[socketRef.current])
  return(
    <textarea id="realtimeEditor"></textarea>
  )
};

export default Editor;
