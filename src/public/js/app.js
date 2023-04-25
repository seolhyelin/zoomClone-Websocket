const MessageList = document.querySelector("ul");
const MessageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
  console.log("New Message", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected to Server ❌");
});

function handleSubmit(event) {
  event.preventDefault();
  const input = MessageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
}

MessageForm.addEventListener("submit", handleSubmit);
