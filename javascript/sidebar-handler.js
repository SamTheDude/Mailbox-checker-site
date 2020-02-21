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

function openNav() {
    let sidebar = document.getElementsByClassName("sidebar")[0];
    sidebar.style.width = "250px";
}

function closeNav() {
    let sidebar = document.getElementsByClassName("sidebar")[0];
    sidebar.style.width = "0px";
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
});