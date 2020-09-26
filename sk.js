var userName;
if(localStorage.getItem("pttUsername")){
    userName = localStorage.getItem("pttUsername");
    localStorage.setItem("pttUsername", userName);
}
else{
    userName = prompt("Enter a Username : ");
}

/* const socket = io("ws://localhost:3030"); */
const socket = io("https://pttserver.glitch.me/");

socket.on("connect", function(){
    console.log("Connected to server!!");
    socket.emit("userName", userName);
    socket.send("Hi server!");
});

function sendAudio(streamData){
    socket.emit("audioData", {
        streamAudio : streamData,
        username : userName
    });
    console.log("Sending audio.....");
    document.querySelector('.status').innerHTML = "Sending Audio....";
}

socket.on("recieveAudio" + userName, function(streamData){
    document.querySelector(".output").innerHTML = streamData.username;
    console.log("Recieving audio.....");
    playAudio(streamData.streamAudio);
    document.querySelector('.status').innerHTML = "Sending Audio....";
});