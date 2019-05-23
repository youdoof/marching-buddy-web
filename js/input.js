'use strict';

// startEnd : either START or END constant, builds object of information gathered from the form
// a starting point until I know how I want to process the information
class Input {
    constructor(startEnd) {
        this.stepsLR = setStepsLR(startEnd);
        this.onInOut = setOnInOut(startEnd);
        this.side = setSide(startEnd);
        this.yardLine = setYardLine(startEnd);
        this.stepsFB = setStepsFB(startEnd);
        this.onInFrontBehind = setOnInFrontBehind(startEnd);
        this.frontBack = setFrontBack(startEnd);
        this.hashSideline = setHashSideline(startEnd);
        if (startEnd === END) {
            this.counts = setCounts();
        }
    }
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

function setCounts() {
    return parseInt(document.querySelector('#counts').value);
}

// Relocated from Midset.js

let YARDLINES = [50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0];
// Sideline distance constants
let FRONT_SIDELINE = -42.0;
let BACK_SIDELINE = 42.0;
// NCAA Hash distances
let NCAA_FRONT_HASH = -10.0;
let NCAA_BACK_HASH = 10.0;
// High School Hash distances
let HS_FRONT_HASH = -14.0;
let HS_BACK_HASH = 14.0;

function findYardLine(value) {
    var counter = 0;
    for (var i = 0; i < YARDLINES.length; i++) {
        if (YARDLINES[i] === value) {
            counter = i;
            break;
        }
    }
    return counter * 8;
}

function inputLeftToRight(input) {
    var result = 0;

    switch (input.onInOut) {
        case 0: // On Yard Line
            if (input.side == 0) {
                result = -findYardLine(input.yardLine);
            } else {
                result = findYardLine(input.yardLine);
            }
            break;
        case 1: // Inside Yard Line
            if (input.yardLine == 50) {
                if (input.side == 0) {
                    result = -input.stepsLR;
                } else {
                    result = input.stepsLR;
                }
            } else if (input.side == 0) {
                result = -findYardLine(input.yardLine) + input.stepsLR;
            } else {
                result = findYardLine(input.yardLine) - input.stepsLR;
            }
            break;
        case 2: // Outside Yard Line
            if (input.yardLine == 50) {
                if (input.side == 0) {
                    result = -input.stepsLR;
                } else {
                    result = input.stepsLR;
                }
            } else if (input.side == 0) {
                result = -findYardLine(input.yardLine) - input.stepsLR;
            } else {
                result = findYardLine(input.yardLine) + input.stepsLR;
            }
            break;
    }
    return result;
}

function inputFrontToBack(input, field) {
    var result = 0;
    var frontHashReference;
    var backHashReference;
    var processedReferencePoint = getProcessedFrontBackReferencePoint(input);

    if (field.getFieldType() == 0) {
        frontHashReference = HS_FRONT_HASH;
        backHashReference = HS_BACK_HASH;
    } else {
        frontHashReference = NCAA_FRONT_HASH;
        backHashReference = NCAA_BACK_HASH;
    }

    switch (processedReferencePoint) {
        case 0: // Front Sideline
            result = processDistanceRelativeToReferencePoint(input, FRONT_SIDELINE);
            break;
        case 1: // Front Hash
            result = processDistanceRelativeToReferencePoint(input, frontHashReference);
            break;
        case 2: // Back Hash
            result = processDistanceRelativeToReferencePoint(input, backHashReference);
            break;
        case 3: // Back Sideline
            result = processDistanceRelativeToReferencePoint(input, BACK_SIDELINE);
            break;
    }
    return result;
}

function getProcessedFrontBackReferencePoint(input) {
    if (input.frontBack == 0 && input.hashSideline == 1) {
        return 0; // Front Sideline
    } else if (input.frontBack == 0 && input.hashSideline == 0) {
        return 1; // Front Hash
    } else if (input.frontBack == 1 && input.hashSideline == 0) {
        return 2; // Back Hash
    } else if (input.frontBack == 1 && input.hashSideline == 1) {
        return 3; // Back Sideline
    } else {
        return -1;
    }
}

function processDistanceRelativeToReferencePoint(input, hashSidelineReference) {
    if (input.onInFrontBehind == 0) {
        return hashSidelineReference; // On
    } else if (input.onInFrontBehind == 1) {
        return hashSidelineReference - input.stepsFB; // In Front
    } else {
        return hashSidelineReference + input.stepsFB; // Behind
    }
}
