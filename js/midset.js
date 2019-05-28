'use strict';

// Step Size Constant -- 8 to 5
let STEP_SIZE_REFERENCE = 8.0;

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
    if (stepSizeMultiplier == 0) {
        return "Hold";
    } else {
        computedStepSize = STEP_SIZE_REFERENCE / stepSizeMultiplier;
        return rounder(computedStepSize) + " to 5";
    }
    
}

function getMidSetCoordinate(start, end) {
    var leftToRightMiddle = (start.getLeftToRight() + end.getLeftToRight()) / 2;
    var frontToBackMiddle = (start.getFrontToBack() + end.getFrontToBack()) / 2;
    return new Coordinate(leftToRightMiddle, frontToBackMiddle);
}
