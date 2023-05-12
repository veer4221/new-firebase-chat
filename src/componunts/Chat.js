import { Avatar, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import firebase from "firebase";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from '@material-ui/icons/Send';
import db from "../firebase";
import "./Chat.css";
import { useParams } from "react-router-dom";
import { useStateValue } from "../StateProvider";
function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [isDisplay, setisDisplay] = useState(false);
  const [field, setfield] = useState({
    username: "",
    password: ""
  });
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  // const [isDisplay, setisDisplay] = useState(false);
  const loginform = () => {
    // alert(JSON.stringify(field))
    if (field.username == "hero" && field.password == "hero7676") return setisDisplay(true)
    alert("small ma nakhjo passwod ne userid")
  }
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshort) => setRoomName(snapshort.data().name));
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshort) =>
          setMessages(snapshort.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    // alert(`message is ${input}`);
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (<>
    {!isDisplay ?
      <div className="p-3">
        {/* <form> */}
        <input className="mt-1 form-control" type="text" placeholder="enter User ID" onChange={(e) => setfield({ ...field, username: e.target.value })} />
        <input className="mt-1 form-control" type="password" placeholder="enterpassword" onChange={(e) => setfield({ ...field, password: e.target.value })} />
        <button className="mt-1 btn btn-info" onClick={loginform}>Login</button>
        {/* </form> */}
      </div> :
      <div className="chat">
        <div className="chat__header">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="chat__headerInfo">
            <h3>{roomName}</h3>
            <p>
              Last massage {`  `}
              {
                new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()
                ).toUTCString()
              }
            </p>
          </div>
          <div className="chat__headerRight">
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton>
              <AttachFileIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className="p-1" style={{ height: "80vh", overflowX: "auto" }}>
          {messages.map((message) => (
            <p
              className={`chat__message ${message.name === user.displayName && "chat__reciever"
                }`}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          ))}
        </div>
        <div className="chat__footer">
          <InsertEmoticonIcon />
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              type="text"
            />

            <button onClick={sendMessage} type="submit">
              send a message
            </button>
          </form>
          {/* <button onClick={sendMessage} type="submit"> */}
          <SendIcon onClick={sendMessage} />
          {/* </button> */}
          <MicIcon />
        </div>
      </div >}
  </>
  );
}

export default Chat;
