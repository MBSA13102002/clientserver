

const socket = io('https://hackilo.herokuapp.com');

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

const appending = (message,position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement)
};
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value
    appending(`You: ${message}`,'right')
    socket.emit('send',message)
    messageInput.value=""
})
const Name = prompt("Enter your name to join the Live chat");
socket.emit('new-user-joined', Name);

socket.on('user-joined',name =>{
appending(`${name} joined the chat`,"right")
})

socket.on('recieve',data =>{
appending(`${data.name}:${data.message}`,"left")
})

socket.on('left',data =>{
appending(`${data} left the chat`,"left")
})
