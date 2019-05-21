'use strict';

// startEnd : either START or END constant, builds object of information gathered from the form
// a starting point until I know how I want to process the information
function Input(startEnd) {
    this.stepsLR = setStepsLR(startEnd);
    this.onInOut = setOnInOut(startEnd);
    this.side = setSide(startEnd);
    this.yardLine = setYardLine(startEnd);
    this.stepsFB = setStepsFB(startEnd);
    this.onInFrontBehind = setOnInFrontBehind(startEnd);
    this.frontBack = setFrontBack(startEnd);
    this.hashSideline = setHashSideline(startEnd);
}

// Constants to modify the name of the selected input
let END = "e";
let START = "s";

function setStepsLR(startEnd) {
    return parseFloat(document.querySelector(`#${startEnd}LRSteps`).value);
}

function setOnInOut(startEnd) {
    return parseFloat(document.querySelector(`input[name=${startEnd}OnInOutRadio]:checked`).value);
}

function setSide(startEnd) {
    return parseFloat(document.querySelector(`input[name=${startEnd}SideRadio]:checked`).value);
}

function setYardLine(startEnd) {
    return parseFloat(document.querySelector(`#${startEnd}YardLine`).value);
}

function setStepsFB(startEnd) {
    return parseFloat(document.querySelector(`#${startEnd}FBSteps`).value);
}

function setOnInFrontBehind(startEnd) {
    return parseFloat(document.querySelector(`input[name=${startEnd}OnInFrontBehindRadio]:checked`).value);
}

function setFrontBack(startEnd) {
    return parseFloat(document.querySelector(`input[name=${startEnd}FrontBackRadio]:checked`).value);
}

function setHashSideline(startEnd) {
    return parseFloat(document.querySelector(`input[name=${startEnd}HashSidelineRadio]:checked`).value);
}
