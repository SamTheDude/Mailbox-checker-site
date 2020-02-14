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
    let infoDump = document.getElementById("detailed-info");
    if(infoDump.innerHTML != ""){
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
const REQUEST_LOCATION = "resources/test-data.txt";

function requestStats(){
    let infoDump = document.getElementById("detailed-info");
    let xmlHttp = new XMLHttpRequest();
    
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == XMLHttpRequest.DONE) {
            if (xmlHttp.status == 200) {
                infoDump.innerHTML = xmlHttp.responseText;
            } else {
                alert("Something went wrong getting the data. ERROR: " + xmlHttp.status);
            }
        }
    }
    
    xmlHttp.open("GET", REQUEST_LOCATION, true);
    xmlHttp.send();
}


document.addEventListener("DOMContentLoaded", function(){
    let loadingText = document.getElementById("loading-text");

    loadingFunction(loadingText);

    requestStats();
});