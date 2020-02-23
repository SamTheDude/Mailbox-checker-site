/*
 * Javascript written to handle the opening and 
 * closing of a sidebar.
 * 
 * Copyright (c) 2020 Samuel Kent.
 */

 /*
  * ==================================
  * ===== Open and Close Scripts =====
  * ==================================
  */

// Use strict JS to avoid problems.
"use strict";

function openNav() {
    let sidebar = document.getElementsByClassName("sidebar")[0];
    sidebar.style.width = "250px";
}

function closeNav() {
    let sidebar = document.getElementsByClassName("sidebar")[0];
    sidebar.style.width = "0px";
}

 /*
  * ==========================
  * ===== Toggle Buttons =====
  * ==========================
  */

function toggleTime() {
    let timerDiv = document.getElementById("load-timer");

    // Switch between display modes to show and 
    // hide respectively.
    if(timerDiv.style.display != "none"){
        timerDiv.style.display = "none";
    }else if(timerDiv.style.display == "none"){
        timerDiv.style.display = "block";
    }
}

 /*
  * ====================================
  * ===== Set Click Events on Load =====
  * ====================================
  */

document.addEventListener("DOMContentLoaded", function(){
    // Get the header and the close button.
    let header = document.getElementsByTagName("header")[0];
    let closebtn = document.getElementsByClassName("closebtn")[0];

    // Set click events.
    header.addEventListener("click", openNav);
    closebtn.addEventListener("click", closeNav); 

    //Get the sidebar buttons.
    let toggleTimer = document.getElementById("timer-toggle");
    let updateTrigger = document.getElementById("update-trigger");

    console.log(toggleTimer);

    //Set click events for the sidebar.
    toggleTimer.addEventListener("click", toggleTime);
    updateTrigger.addEventListener("click", function(){
        updateNow = true;
    });
});