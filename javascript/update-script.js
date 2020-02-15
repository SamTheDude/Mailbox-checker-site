/*
 * Javascript written to update the mailbox site with 
 * the number of letter in the mailbox and to change 
 * to colour of the background accordingly.
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
const REQUEST_INTERVAL = "50000";
const ERR_REQUEST_INTERVAL = "10000"
const ERR_MSG = "Could not retrive data from the server. Attempting to reconnect.";

function requestStats(){
    let bigNum = document.getElementById("big-number");
    let infoDump = document.getElementById("detailed-info");
    let loadingText = document.getElementById("loading-text"); 
    //Clear the infodump.
    infoDump.innerHTML = "";
    let xmlHttp = new XMLHttpRequest();
    
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
    
    xmlHttp.open("GET", REQUEST_LOCATION, true);
    xmlHttp.send();

    let delay = REQUEST_INTERVAL;

    if(infoDump.innerHTML == ERR_MSG){
        delay = ERR_REQUEST_INTERVAL;
    }

    setTimeout(requestStats, delay);

    let now = new Date();

    console.log(Math.round(now.getTime()/1000) + delay/1000);

    reconnectTimer(Math.round(now.getTime()/1000) + delay/1000);
}

function reconnectTimer(time){
    let timerDiv = document.getElementById("load-timer");

    let now = new Date();

    let timeRemaining = time - Math.round(now.getTime()/1000);

    if(timeRemaining != 0){
        timerDiv.innerHTML = "Update in " + timeRemaining + " seconds."
        setTimeout(function() {
            reconnectTimer(time);
        }, 1000);
    }else{
        timerDiv.innerHTML = "Attempting update..."
    }
}

document.addEventListener("DOMContentLoaded", function(){
    let loadingText = document.getElementById("loading-text"); 

    requestStats();

    loadingFunction(loadingText);
});