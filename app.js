const url = "wss://echo.websocket.org/"

const openBTN = document.querySelector("#open")
const closeBTN = document.querySelector("#close")
const sendBTN = document.querySelector("#send")
const geoBTN = document.querySelector("#geo")

const msg = document.querySelector("#message")
const output = document.querySelector(".output")

let websocket

function displayMessage(message) {
    let pre = document.createElement("p")
    pre.innerHTML = message
    output.appendChild(pre)
}

function success(position) {
    const latitude  = position.coords.latitude
    const longitude = position.coords.longitude

    let msg = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`

    displayMessage("SENT: " + msg)
    websocket.send(msg)

    websocket.onmessage = function(event) {
        displayMessage("RESPONSE: ")
    }
}

function error() {
    console.log("Error")
  }

openBTN.addEventListener("click", () => {
    websocket = new WebSocket(url)
    
    websocket.onopen = function(event) {
        displayMessage("CONNECTED")
    }

    websocket.onclose = function(event) {
        displayMessage("DISCONNECTED")
    }

    websocket.onerror = function(event) {
        displayMessage("ERROR: " + event.data)
    }
})

closeBTN.addEventListener("click", () => {
    websocket.close()
    websocket = null
})

sendBTN.addEventListener("click", () => {
    const message = msg.value
    displayMessage("SENT: " + message)
    websocket.send(message)
    websocket.onmessage = function(event) {
        displayMessage("RESPONSE: " + event.data)
    }
})

geoBTN.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, error)
    }
})