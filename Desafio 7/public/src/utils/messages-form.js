import { renderOneMessage } from "./render.js";
import socket from "./socket.js";

const addMessage = (event) => {
  event.preventDefault();

  const getTimestamp = () => moment().format("DD/MM/YYYY DD:MM:SS");

  const renderOnResponse = async ({ target: { response } }) => {
    const { added } = JSON.parse(response);
    await renderOneMessage(added);
    socket.emit("message-added", added);
    document.getElementById("message").value = "";
  };

  const req = new XMLHttpRequest();

  const body = new FormData(event.target);
  const method = event.target.getAttribute("method");
  const url = event.target.getAttribute("action");

  const message = {
    author: body.get("author"),
    content: body.get("message"),
    timestamp: getTimestamp(),
  };

  req.open(method, url);
  req.setRequestHeader("Content-type", "application/json");
  req.addEventListener("load", renderOnResponse);

  req.send(JSON.stringify(message));
};

export { addMessage };
