const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// play & pause video
function toggleVideoStatus(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
    return true;
}

// update play/pause icon
function updatePlayIcon(){
    if(video.paused){
        play.innerHTML = '<i class="fa-solid fa-play fa-2x"></i>';
    }else{
        play.innerHTML = '<i class="fa-solid fa-pause fa-2x"></i>'
    }
    return true;
}

// update progress & timestamp
function updateProgress(){
    //calculate progress %
    progress.value = (video.currentTime / video.duration) * 100; // convert to %
    //console.log(video.currentTime)
    //console.log(video.duration)
    // console.log(progress.value)

    // get minutes
    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10) {
        mins = '0' + String(mins);
    }

    // get seconds
    let secs = Math.floor(video.currentTime % 60)
    if(secs < 10){
        secs = '0' + String(secs);
    }
    // format timestamp
    timestamp.innerHTML = `${mins}:${secs}`
}

// set video time to progress
function setVideoProgress(){
    // set video current time to the value on progress
    video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop video: set time to 0, then pause()
function stopVideo(){
    video.currentTime = 0; 
    video.pause();
}

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);