import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () =>
  console.log("http://localhost:3000, ws://localhost:3000");

// http 서버 위에 ws 서버를 만듦
const server = http.createServer(app);
// websocket 서버만 동작 시키려면 괄호 안에 안넣어도 됨
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  console.log("Connected to Browser");
  socket.on("close", () => {
    console.log("Disconnected to Browser ❌");
  });
  socket.on("message", (message) => {
    console.log(message.toString("utf8"));
  });
  socket.send("hello!!");
});

server.listen(3000, handleListen);
