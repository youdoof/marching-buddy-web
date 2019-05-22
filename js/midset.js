'use strict';

let YARDLINES = [50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0]; // Getting messy, works for now.

// Step Size Constant -- 8 to 5
let STEP_SIZE_REFERENCE = 8.0;
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
        // On yard line
        case 0:
            if (input.side == 0) {
                result = -findYardLine(input.yardLine);
            } else {
                result = findYardLine(input.yardLine);
            }
            break;
        case 1:
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
        case 2:
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
        default:
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
        // Front Sideline
        case 0:
            result = processDistanceRelativeToReferencePoint(input, FRONT_SIDELINE);
            break;
        // Front Hash
        case 1:
            result = processDistanceRelativeToReferencePoint(input, frontHashReference);
            break;
        // Back Hash
        case 2:
            result = processDistanceRelativeToReferencePoint(input, backHashReference);
            break;
        // Back Sideline
        case 3:
            result = processDistanceRelativeToReferencePoint(input, BACK_SIDELINE);
            break;
        default:
            result = 0;
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

// Used to Calculate the Step Size of a move
// start - Coordinate object
// end - Coordinate object
function getDistanceBetweenCoordinates(start, end) {
    var startX = start.getLeftToRight();
    var startY = start.getFrontToBack();
    var endX = end.getLeftToRight();
    var endY = end.getFrontToBack();
    return Math.sqrt(Math.pow((endX - startX), 2) + Math.pow((endY - startY), 2));
}

// Round the given number to 3 decimal places
function rounder(x) {
    return Number.parseFloat(x).toFixed(3);
}

// start - Coordinate object
// end - Coordinate object
// counts - number of counts to get to next coordinate
function getStepSize(start, end, counts) {
    var computedStepSize;
    var distance = getDistanceBetweenCoordinates(start, end);
    var stepSizeMultiplier = distance / counts;
    if (stepSizeMultiplier === 0) {
        computedStepSize = 0;
    } else {
        computedStepSize = STEP_SIZE_REFERENCE / stepSizeMultiplier;
    }
    return "Step Size: " + rounder(computedStepSize) + " to 5";
}

function getMidSetCoordinate(start, end) {
    var leftToRightMiddle = (start.getLeftToRight() + end.getLeftToRight()) / 2;
    var frontToBackMiddle = (start.getFrontToBack() + end.getFrontToBack()) / 2;
    return new Coordinate(leftToRightMiddle, frontToBackMiddle);
}
