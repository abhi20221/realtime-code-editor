import React,{useState} from "react";
import {v4 as uuidv4} from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [roomId,setRoomId] = useState('');
    const [username,setUsername] = useState(''); 
    const createNewRoom = (e)=>{
        e.preventDefault();
        const id = uuidv4();
        setRoomId(id);
        toast.success('Created a new room');
    }
    const joinRoom = ()=>{
        if(!roomId||!username){
            toast.error('ROOM ID and UserName is required');
            return;
        }
        //redirect
        navigate(`/editor/${roomId}`,{
          state:{
            username,
          }  
        });
    }
    const enterClick = (e)=> {
        if(e.code==='Enter'){
             joinRoom();
        }
    }
  return(
    <div className="homePageWrapper">
        <div className="formWrapper">
            <img src="/code-sync.png" className="homePageLogo" alt="code-sync-logo" />
            <h4 className="mainLabel">Paste invitation ROOM ID</h4>
            <div className="inputGroup">
                <input 
                    type="text" 
                    className="inputBox"
                    value={roomId} 
                    onChange={(e)=>setRoomId(e.target.value)}
                    onKeyUp={enterClick}
                    placeholder="ROOM ID"/>
                <input 
                    type="text" 
                    className="inputBox" 
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    onKeyUp={enterClick}
                    placeholder="USERNAME"/>
                <button onClick={joinRoom} className="btn joinBtn">Join</button>
                <span className="createInfo">
                    If you don't have an invite then create &nbsp;
                    <a onClick={createNewRoom} href="" className="createNewBtn">new room</a>    
                </span>            
            </div>
        </div>
        <footer>
            <h4>Built with💛&nbsp;by <a href="#">Abhijeet Rishi</a> && <a href="#">Ankush Kumar</a></h4>
        </footer>
    </div>
  )
};

export default Home;
