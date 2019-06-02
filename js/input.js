'use strict';

/**
 * Input object for processing user information on one coordinate
 * @typedef {Object} Input
 * @property {Number} stepsLR - Steps Left to Right from yard line
 * @property {Number} onInOut - 0, 1, or 2, representing On, Inside, or Outside the yard line
 * @property {Number} side - 0 or 1, representing Side 1 or Side 2 (and other common names)
 * @property {Number} yardLine - The yard line to be referenced for left to right information
 * @property {Number} stepsFB - Steps Front to Back from nearest front to back reference point (hash or sideline)
 * @property {Number} onInFrontBehind - 0, 1, or 2, representing On, In Front, or Behind the front to back reference point
 * @property {Number} frontBack - 0 or 1, representing either the Front or Back front to back reference point
 * @property {Number} hashSideline - 0 or 1, representing either the Hash or Sideline being the front to back reference point
 */
class Input {
    /**
     * Builds object of information gathered from the input form for one coordinate based on the string passed in
     * @param {String} startEnd either START or END constant to select the starting or ending coordinate
     */
    constructor(startEnd) {
        this.stepsLR = getStepsLR(startEnd);
        this.onInOut = getOnInOut(startEnd);
        this.side = getSide(startEnd);
        this.yardLine = getYardLine(startEnd);
        this.stepsFB = getStepsFB(startEnd);
        this.onInFrontBehind = getOnInFrontBehind(startEnd);
        this.frontBack = getFrontBack(startEnd);
        this.hashSideline = getHashSideline(startEnd);
    }
}

// Constants to modify the name of the selected input

/**
 * Used to get the Ending Coordinate input information
 * @const {String}
 * @see Input.constructor
 */
const END = "e";

/**
 * Used to get the Starting Coordinate input information
 * @const {String}
 * @see Input.constructor
 */
const START = "s";

function getStepsLR(startEnd) {
    return parseFloat(document.querySelector(`#${startEnd}LRSteps`).value);
}

function getOnInOut(startEnd) {
    return parseInt(document.querySelector(`input[name=${startEnd}OnInOutRadio]:checked`).value);
}

function getSide(startEnd) {
    return parseInt(document.querySelector(`input[name=${startEnd}SideRadio]:checked`).value);
}

function getYardLine(startEnd) {
    return parseFloat(document.querySelector(`#${startEnd}YardLine`).value);
}

function getStepsFB(startEnd) {
    return parseFloat(document.querySelector(`#${startEnd}FBSteps`).value);
}

function getOnInFrontBehind(startEnd) {
    return parseInt(document.querySelector(`input[name=${startEnd}OnInFrontBehindRadio]:checked`).value);
}

function getFrontBack(startEnd) {
    return parseInt(document.querySelector(`input[name=${startEnd}FrontBackRadio]:checked`).value);
}

function getHashSideline(startEnd) {
    return parseInt(document.querySelector(`input[name=${startEnd}HashSidelineRadio]:checked`).value);
}

function getCounts() {
    return parseInt(document.querySelector('#counts').value);
}

// Relocated from Midset.js

/**
 * Array containing the yard line references, in a convenient order for calculating valuable information
 * @const {Array<Number>}
 */
const YARDLINES = [50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0];
// Sideline distance constants
const FRONT_SIDELINE = -42.0;
const BACK_SIDELINE = 42.0;
// NCAA Hash distances
const NCAA_FRONT_HASH = -10.0;
const NCAA_BACK_HASH = 10.0;
// High School Hash distances
const HS_FRONT_HASH = -14.0;
const HS_BACK_HASH = 14.0;

/**
 * Takes a given yard line and converts it into a number useful in the coordinate system the project is using
 * @function findYardLine
 * @param {Number} value yard line to find in internal coordinate system
 * @returns {Number} yard line converted into internal coordinate system
 */
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

/**
 * Takes a given Input object and produces a number representing the left to right location, or X coordinate
 * @function inputLeftToRight
 * @param {Input} input Input object
 * @returns {Number} Number representing the left to right, or X coordinate
 */
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

/**
 * Takes a given Input and Field to produce a number representing the front to back location, or Y coordinate
 * @function inputFrontToBack
 * @param {Input} input Input object
 * @param {Field} field Field object
 * @returns {Number} Number representing the front to back, or Y coordinate
 */
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

/**
 * Processes the input to determine which front to back reference point was chosen by the user
 * @function getProcessedFrontBackReferencePoint
 * @param  {Input} input Input object
 * @return {Number} - 0: Front Sideline - 1: Front Hash - 2: Back Hash - 3: Back Sideline
 */
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

/**
 * Processes and returns the distance from the front to back reference point 
 * @function processDistanceRelativeToReferencePoint
 * @param  {Input} input                  Input object
 * @param  {Number} hashSidelineReference Determined and passed in by calling getProcessedFrontBackReferencePoint
 * @return {Number} Number representing the front to back, or Y coordinate
 */
function processDistanceRelativeToReferencePoint(input, hashSidelineReference) {
    if (input.onInFrontBehind == 0) {
        return hashSidelineReference; // On
    } else if (input.onInFrontBehind == 1) {
        return hashSidelineReference - input.stepsFB; // In Front
    } else {
        return hashSidelineReference + input.stepsFB; // Behind
    }
}
