import React from "react";
const Client = ({username}) => {
    return(
    <div className="client">
        <img src="/gamer.png" width="50px" alt="avatar"></img>
        <span className="userName">{username}</span>
    </div>
  );
};

export default Client;
