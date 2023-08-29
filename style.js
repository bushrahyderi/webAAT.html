console.log("Welcome to Spotify");

//Initialize the Variables
let songIndex=0;
let audioElement= new Audio('C:\\Users\\bushr\\OneDrive\\Documents\\music player\\1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    {songName: "Night Changes - One Direction", filePath:"C:\\Users\\bushr\\OneDrive\\Documents\\music player\\1.mp3",coverPath:"C:\\Users\\bushr\\OneDrive\\Documents\\music player\\1.jpeg"},
    {songName: "Give Me Some Sunshine - Suraj Jagan & Sharman Joshi", filePath:"C:\\Users\\bushr\\OneDrive\\Documents\\music player\\2.mp3",coverPath:"C:\\Users\\bushr\\OneDrive\\Documents\\music player\\2.jpeg"},
    {songName: "Snap - Rosa Linn", filePath:"C:\\Users\\bushr\\OneDrive\\Documents\\music player\\3.mp3",coverPath:"C:\\Users\\bushr\\OneDrive\\Documents\\music player\\3.jpeg"},
    {songName: "As It Was - Harry Syles", filePath:"C:\\Users\\bushr\\OneDrive\\Documents\\music player\\4.mp3",coverPath:"C:\\Users\\bushr\\OneDrive\\Documents\\music player\\4.jpeg"},
    {songName: "Agar Tum Saath Ho - Arijit Singh & Alka Yagnik", filePath:"C:\\Users\\bushr\\OneDrive\\Documents\\music player\\5.mp3",coverPath:"C:\\Users\\bushr\\OneDrive\\Documents\\music player\\5.jpeg"},
    {songName: "Senorita - Camila Cabello, Shawn Mendes", filePath:"C:\\Users\\bushr\\OneDrive\\Documents\\music player\\6.mp3",coverPath:"C:\\Users\\bushr\\OneDrive\\Documents\\music player\\6.jpeg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    
})

// audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
   Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
       element.classList.remove('fa-circle-pause');
       element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `C:\\Users\\bushr\\OneDrive\\Documents\\music player\\${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `C:\\Users\\bushr\\OneDrive\\Documents\\music player\\${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `C:\\Users\\bushr\\OneDrive\\Documents\\music player\\${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

//sign up

function clearErrors(){

    errors = document.getElementsByClassName('formerror');
    for(let item of errors)
    {
        item.innerHTML = "";
    }
}
function seterror(id, error){   
    //sets error inside tag of id
    element = document.getElementById(id+"-formerror");
    element.innerHTML = error;

}

function validateForm(){
    var returnval = true;
    clearErrors();
 

    //perfrom validation if validation fails, set the value of returnval to false
    var name = document.forms['myForm']["name"].value;    
    if (name.length<3){
        seterror("name","*Length of name is too short!");
        returnval = false;
    }
    
    if (name.length == 0){
        seterror("name","*Please enter a name!");
        returnval = false;
    }

    var email = document.forms['myForm']["email"].value;    
    if (email.length>25){
        seterror("email","*Email length is too long!");
        returnval = false;
    }

    var password = document.forms['myForm']["password"].value;    
    if (password.length<6){
        seterror("password","*Password should be atleast 6 characters long!");
        returnval = false;
    }
    
    var confirmpassword = document.forms['myForm']["confirmpassword"].value;    
    if (confirmpassword != password){
        seterror("confirmpassword","*Password and Confirm Password should match!");
        returnval = false;
    }
    
    var phone = document.forms['myForm']["phone"].value;    
    if (phone.length!=10){
        seterror("phone","*Phone number should be of 10 digits!");
        returnval = false;
    }


    return returnval;
}
