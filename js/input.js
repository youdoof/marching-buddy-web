'use strict';

// startEnd : either START or END constant, builds object of information gathered from the form
// a starting point until I know how I want to process the information
function Input(startEnd) {
    this.stepsLR = getStepsLR(startEnd);
    this.onInOut = getOnInOut(startEnd);
    this.side = getSide(startEnd);
    this.yardLine = getYardLine(startEnd);
    this.stepsFB = getStepsFB(startEnd);
    this.onInFrontBehind = getOnInFrontBehind(startEnd);
    this.hashSideline = getProcessedHashSideline(startEnd);
}

let END = "e";
let START = "s";

function getStepsLR(startEnd) {
    return parseFloat(document.querySelector(`#${startEnd}LRSteps`).value);
}

function getOnInOut(startEnd) {
    return parseFloat(document.querySelector(`input[name=${startEnd}OnInOutRadio]:checked`).value);
}

function getSide(startEnd) {
    return parseFloat(document.querySelector(`input[name=${startEnd}SideRadio]:checked`).value);
}

function getYardLine(startEnd) {
    return parseFloat(document.querySelector(`#${startEnd}YardLine`).value);
}

function getStepsFB(startEnd) {
    return parseFloat(document.querySelector(`#${startEnd}FBSteps`).value);
}

function getOnInFrontBehind(startEnd) {
    return parseFloat(document.querySelector(`input[name=${startEnd}OnInFrontBehindRadio]:checked`).value);
}

function getFrontBack(startEnd) {
    return parseFloat(document.querySelector(`input[name=${startEnd}FrontBackRadio]:checked`).value);
}

function getHashSideline(startEnd) {
    return parseFloat(document.querySelector(`input[name=${startEnd}HashSidelineRadio]:checked`).value);
}

function getProcessedHashSideline(startEnd) {
    var fb = getFrontBack(startEnd);
    var hs = getHashSideline(startEnd);
    if (fb == 0 && hs == 1) {
        return 0;
    } else if (fb == 0 && hs == 0) {
        return 1;
    } else if (fb == 1 && hs == 0) {
        return 2;
    } else if (fb == 1 && hs == 1) {
        return 3;
    } else {
        return 0;
    }
}

Input.prototype.getCheckedRadioValue = function (name) {
    return document.querySelector(`input[name=${name}]:checked`).value;
}
