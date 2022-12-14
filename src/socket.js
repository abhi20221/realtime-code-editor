import {io} from 'socket.io-client';

export const initSocket = async ()=>{
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    } 
    //console.log(process);
   // const url = process.env.REACT_APP_BACKEND_URL;
    const url = "https://itsabhi-weather-app.herokuapp.com";
    return io(url,options);
}
