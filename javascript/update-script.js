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
const LOADING_TICK = 100;

function loadingFunction(loadingDiv){
    let bigNum = document.getElementById("big-number");
    if(bigNum.innerHTML != ""){
        loadingDiv.style.display = "none";
    }else{
        tickLoadingAnimation(loadingDiv);
        setTimeout(function() {
            loadingFunction(loadingDiv);
        }, LOADING_TICK);
    }
}

function tickLoadingAnimation(loadingDiv){
    let textLength = loadingDiv.innerHTML.length;
    if(textLength == LOADING_STRING.length){
        loadingDiv.innerHTML = " ";
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

function requestStats(){
    let bigNum = document.getElementById("big-number");
    let infoDump = document.getElementById("detailed-info");
    infoDump.innerHTML = "";
    let xmlHttp = new XMLHttpRequest();
    
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == XMLHttpRequest.DONE) {
            if (xmlHttp.status == 200) {
                bigNum.innerHTML = xmlHttp.responseText;
            } else {
                infoDump.innerHTML = "Error: " + xmlHttp.responseText;
            }
        }
    }
    
    xmlHttp.open("GET", REQUEST_LOCATION, true);
    xmlHttp.send();

    setTimeout(requestStats, LOADING_TICK*500);
}


document.addEventListener("DOMContentLoaded", function(){
    let loadingText = document.getElementById("loading-text");

    loadingFunction(loadingText);

    requestStats();
});