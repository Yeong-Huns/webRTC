/**
 * fileName       : server.js
 * author         : Yeong-Huns
 * date           : 2024-09-23
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-23        Yeong-Huns       최초 생성
 */
 import express from 'express'
 import WebSocket from 'ws';
 import http from 'http';

const app = express();

 app.set("view engine", "pug"); // view 엔진으로 pug 를 사용한다 지정
 app.set("views", __dirname + "/views"); // views 폴더 경로 지정

 app.use("/public", express.static(__dirname + "/public"));

 app.get("/", (req, res) => res.render("home")); // views 아래있는 home 을 렌더링한다.
 app.get("/*", (req, res) => res.redirect("/")); // 리다이렉트

 const handleListen = () => console.log("Listening at http://localhost:3000");

 const server = http.createServer(app);
 const wss = new WebSocket.Server({ server });

/*
 function handleConnection(socket) {
  console.log(socket);
 }

 wss.on("connection", handleConnection);
*/

 const sockets = [];

 wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to Browser");
  socket.send("Hello!!WebRTC");
  socket.on("close", ()=> {
   console.log("Closed WebRTC From Browser");
  });
  socket.on("message", (message)=> {
   console.log(`${message}`);
   sockets.forEach(socket => {socket.send(`${message}`)});
  })
 })

 server.listen(3000, handleListen);