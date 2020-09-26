var mediaRec;
var mic = document.querySelector('.mic-btn');
var outp = document.querySelector('.output');
var recording = false;

var constraints = {
    audio : true,
    video : false
};
mic.addEventListener("click", function(){
    if(recording){
        stopRecording();
    }
    else{
        startRecording();
    }
});

function startRecording(){
    navigator.mediaDevices.getUserMedia(constraints)
    .then(mediaStream => {
        var chunks = [];
        mediaRec = new MediaRecorder(mediaStream);
        recording = true;
        recordAnime();
        outp.innerHTML = 'stop';
        /* mic.style.border = "20px solid red"; */

        mediaRec.start();
        console.log("Listening.....")
        mediaRec.ondataavailable = function(ev){
            chunks.push(ev.data);
        };
        mediaRec.onstop = function(ev){
            /* playAudio(chunks); */
            console.log("Stopping....")
            sendAudio(chunks);
        };
    }).catch(console.error);
}

function stopRecording(){
    mediaRec.stop();
    recording = false;
    recordAnime();
    outp.innerHTML = 'mic';
}

function playAudio(chunkData){
    var mediaBlob = new Blob(chunkData);
    var mediaURL = URL.createObjectURL(mediaBlob);
    var finalAudio = new Audio(mediaURL);
    finalAudio.play();
    recieveAnime(finalAudio.duration);
}

function recordAnime(){
    if(recording){
        mic.style.animationName = "record";
    }
    else{
        mic.style.animationName = "none";
    }
}

function reciveAnime(duration){
    mic.style.animationName = "recieve";
    setTimeout(function(){
        mic.style.animationName = "none";
    }, duration);
}