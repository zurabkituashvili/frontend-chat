import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

// const socket = io.connect("http://localhost:3001");

const socket = io.connect("https://backend-chat-7be3.onrender.com");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="UserName..."
            onChange={(event) => {
              setUsername(event.target.value);
              setRoom(1);
            }}
          ></input>
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
