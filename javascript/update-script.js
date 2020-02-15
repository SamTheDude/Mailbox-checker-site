/*
 * Javascript written to update the mailbox site with 
 * the number of letter in the mailbox and to change 
 * to colour of the number accordingly.
 * 
 * Copyright (c) 2020 Samuel Kent.
 */

 /*
  * ====================================
  * ===== Loading animation script =====
  * ====================================
  */

// Constant Definitions.
const LOADING_STRING = "Loading..."
const LOADING_TICK = 120;

function loadingFunction(loadingDiv){
    let bigNum = document.getElementById("big-number");
    loadingDiv.style.display = "block";

    // Checks if there is a value in the big number div 
    // to see if it should stop the loading animation.
    if(bigNum.innerHTML != ""){
        loadingDiv.style.display = "none";
        bigNum.style.display = "block";
    }else{
        // Ticks the animation 1 forward then runs the 
        // function again after a certain amount of time.
        tickLoadingAnimation(loadingDiv);
        setTimeout(function() {
            loadingFunction(loadingDiv);
        }, LOADING_TICK);
    }
}

function tickLoadingAnimation(loadingDiv){
    let textLength = loadingDiv.innerHTML.length;

    // Checks if the text in the div is the same length as 
    // the loading message and resets it to nothing if that 
    // is the case. Otherwise shows one more charachter of 
    // the loading string.
    if(textLength == LOADING_STRING.length){
        loadingDiv.innerHTML = "L";
    }else{
        loadingDiv.innerHTML = LOADING_STRING.substring(0, textLength+1);
    }
}


/*
 * =====================================
 * ===== AJAX get and display info =====
 * =====================================
 */

// Constants 
const REQUEST_LOCATION = "data-request-pages/number.php";
// Request intervals in seconds.
const REQUEST_INTERVAL = 50;
const ERR_REQUEST_INTERVAL = 10;
const ERR_MSG = "Could not retrive data from the server. Attempting to reconnect.";

function requestStats(){
    let bigNum = document.getElementById("big-number");
    let infoDump = document.getElementById("detailed-info");
    let loadingText = document.getElementById("loading-text"); 
    // Clear the info dump.
    infoDump.innerHTML = "";
    let xmlHttp = new XMLHttpRequest();
    
    // Function triggered by state change in the 
    // request object.
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == XMLHttpRequest.DONE) {
            if (xmlHttp.status == 200) {
                bigNum.innerHTML = xmlHttp.responseText;
            } else {
                infoDump.innerHTML = ERR_MSG;
                bigNum.innerHTML = "";
                if(loadingText.style.display == "none"){
                    loadingFunction(loadingText);
                }
            }
        }
    }
    
    // Send the request.
    xmlHttp.open("GET", REQUEST_LOCATION, true);
    xmlHttp.send();

    // Work out the current time in seconds.
    let now = new Date();
    let timeSeconds = Math.round(now.getTime()/1000);

    // Run the function to work out the timer 
    // and when next to call this function.
    reconnectTimer(timeSeconds + REQUEST_INTERVAL, false);
}

function reconnectTimer(time, speed){
    let timerDiv = document.getElementById("load-timer");
    let infoDump = document.getElementById("detailed-info");

    // Get the time remaining till the update.
    let now = new Date();
    let timeRemaining = time - Math.round(now.getTime()/1000);

    if(infoDump.innerHTML == ERR_MSG && speed == false){
        // Speed up the timer if the request was not successful.
        let now = new Date();
        reconnectTimer(Math.round(now.getTime()/1000) + ERR_REQUEST_INTERVAL, true);
    }else if(timeRemaining >= 0){
        // If the timer hasn't run out update the time then 
        // call the timer function 1 second later.
        timerDiv.innerHTML = "Update in " + timeRemaining + " seconds."
        setTimeout(function() {
            reconnectTimer(time, speed);
        }, 1000);
    }else{
        //If the timer has run out attempt to update.
        timerDiv.innerHTML = "Attempting update..."
        requestStats();
    }
}

/*
 * ====================================
 * ===== Change background colour =====
 * ====================================
 */

const MULTIPLE = 30;
const NUMBER_UPDATE = 1000;

function updateBackground(){
    let bigNum = document.getElementById("big-number");

    // Calculate the number and it's inverse limiting 
    // both between 0-255.
    let number = Number(bigNum.innerHTML) * MULTIPLE;
    if(number > 255){
        number = 255;
    }
    let inverse = 255 - number;

    // Set colour of the big number.
    bigNum.style.color = "rgb(255, " + inverse + ", " + inverse + ")";

    // Call after timeout.
    setTimeout(updateBackground, NUMBER_UPDATE);
}

// Startup all the processes in this file.
document.addEventListener("DOMContentLoaded", function(){
    // Request stats.
    requestStats();

    // Run loading animation.
    let loadingText = document.getElementById("loading-text"); 
    loadingFunction(loadingText);

    // Run update background loop.
    updateBackground();
});