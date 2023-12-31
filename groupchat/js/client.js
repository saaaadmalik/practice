const socket = io('http://localhost:8000')

const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('tune.mp3')

const append = (message, position) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if(position=='left'){
        audio.play()
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const message = messageInput.value
    append(`You: ${message}`, 'right')
    socket.emit('send',message)
    messageInput.value=''
})
let user = prompt("Enter your name to join")

socket.emit('new-user-joined', user)
socket.on('user-joined', data => {
    append(`${data} joined the chat`, 'right')
})
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})
socket.on('left', data => {
    append(`${data} has left the chat `, 'left')
})