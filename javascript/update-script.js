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

function loadingFunction(loadingDiv, callback){
    if(false){
        loadingDiv.style.display = "none";
        callback();
    }else{
        tickLoadingAnimation(loadingDiv);
        setTimeout(function() {
            loadingFunction(loadingDiv, callback);
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

document.addEventListener("DOMContentLoaded", function(){
    let loadingText = document.getElementById("loading-text");

    loadingFunction(loadingText, tickLoadingAnimation);
});