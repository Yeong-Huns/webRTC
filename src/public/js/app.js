const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);



socket.addEventListener("open", ()=> {
	console.log("서버와 연결됨")
})

socket.addEventListener("message", (message)=> {
	console.log(`수신한 메세지: ${ message.data }`);
	const li = document.createElement("li");
	li.innerText = message.data;
	messageList.appendChild(li);
})

socket.addEventListener("close", ()=> {
	console.log("서버와 연결 해제됨")
})


const handleSubmit = (event) => {
	event.preventDefault();
	const input = messageForm.querySelector("input");
	socket.send(input.value);
	input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);