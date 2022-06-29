import { renderOneMessage } from "./render.js";
import socket from "./socket.js";

const addMessage = (event) => {
  event.preventDefault();

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
  const getDate = () => new Date().toLocaleString("en-US");

  const message = {
    timestamp: getDate(),
    author: {
      email: body.get("email"),
      name: body.get("name"),
      surname: body.get("surname"),
      age: body.get("age"),
      alias: body.get("alias"),
      avatar: body.get("avatar"),
    },
    content: body.get("message"),
  };
  req.open(method, url);

  req.setRequestHeader("Content-type", "application/json");
  req.addEventListener("load", renderOnResponse);
  req.send(JSON.stringify(message));

};

export { addMessage };
