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

const app = express();

 app.set("view engine", "pug"); // view 엔진으로 pug 를 사용한다 지정
 app.set("views", __dirname + "/views"); // views 폴더 경로 지정

 app.use("/public", express.static(__dirname + "/public"));

 app.get("/", (req, res) => res.render("home")); // views 아래있는 home 을 렌더링한다.
 app.get("/*", (req, res) => res.redirect("/")); // 리다이렉트

 const handleListen = () => console.log("Listening at http://localhost:3000");
 app.listen(3000, handleListen);