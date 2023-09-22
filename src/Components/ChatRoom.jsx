import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SocketIOClient from "socket.io-client";
import classes from "./ChatRoomStyles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ChatRoom() {
  const socket = React.useRef(
    SocketIOClient.connect("http://localhost:3010/socket")
  );
  const messageInput = useRef();
  const body = useRef();
  const location = useLocation();
  const [messages, setMessages] = useState([]);

  let sendMessage = (e) => {
    e.preventDefault();
    socket.current.emit("newMessage", {
      id: "",
      msg: messageInput.current.value,
      sender: {
        name: location.state?.name,
        gender: location.state?.gender,
      },
    });
    messageInput.current.value = "";
  };

  let deleteMessage = (id) => {
    socket.current.emit("deleteMessage", {
      id,
    });
  };

  useEffect(() => {
    socket.current.on("deleteMessage", (data) => {
      let newMessages = messages;
      newMessages = newMessages.filter((message) => message.id != data.id);
      setMessages(newMessages);
    });
  }, [messages]);

  useEffect(() => {
    socket.current.on("newMessage", (data) => {
      setMessages((prev) => {
        return [...prev, data];
      });
      body.current?.lastElementChild?.scrollIntoView({
        behavior: "smooth",
      });
    });
  }, []);

  return (
    <div className={classes.chatRoom}>
      <div className={classes.header}>
        <h2>Chat Room</h2>
      </div>
      <div className={classes.body} ref={body}>
        {messages.map((message, index) => {
          return (
            <div
              key={index}
              className={
                message.sender?.name === location.state?.name
                  ? classes.reverseMessageBox
                  : classes.messageBox
              }
            >
              <div className={classes.senderInfo}>
                <span className={classes.nameTitle}>
                  {message.sender?.name || "guest user"}
                </span>
                <span className={classes.message}>{message.msg}</span>
                <span className={classes.dateSection}>
                  {message.sender?.name === location.state?.name && (
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteMessage(message.id)}
                    />
                  )}
                  {message.date}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className={classes.footer}>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            className={classes.input}
            ref={messageInput}
          ></input>
          <div className={classes.sendButton}>
            <button onClick={sendMessage}>
              <span>send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
