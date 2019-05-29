'use strict';

// Step Size Constant -- 8 to 5
const STEP_SIZE_REFERENCE = 8.0;
// Yard Line Grid distance
const YARD_LINE_DISTANCE = 8;
// Did not find yard line intersections in findYardLineIntersections
const NO_INTERSECTIONS = "No Yard Line Intersections Found";

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

/* -----------------------------------------
    Operation: Find and Print Yard Lines
------------------------------------------*/

/*
function checkWithinRange(target, min, max) {
    return ((target - min) * (target - max) <= 0);
}

function determineIfCrossingYardLine(start, end) {
    var sLR = start.getLeftToRight();
    var eLR = end.getLeftToRight();
    if (sLR == eLR) { // Not Crossing Yard Line, same left to right start and end.
        return [false, 0];
    } else if (sLR < eLR) { // Left to Right
        return [checkWithinRange((Math.ceil(sLR / 8)) * 8, sLR, eLR), YARDLINES[Math.abs(Math.ceil(sLR / 8))], "Left to Right"];
    } else if (sLR > eLR) { // Right to Left
        if (sLR < 0) {
            return [checkWithinRange((Math.ceil(sLR / 8) * 8), sLR, eLR), YARDLINES[Math.abs(Math.ceil(sLR / 8))], "Right to Left"];
        } else {
            return [checkWithinRange((Math.floor(eLR / 8) * 8), sLR, eLR), YARDLINES[Math.abs(Math.floor(eLR / 8))], "Right to Left"];
        }
    }
}

// 8 because every 8 is a yardline.
function findNumberOfDivisors(start, end) {
    return Math.floor(Math.abs((end / YARD_LINE_DISTANCE) - ((start - 1) / YARD_LINE_DISTANCE)));
}
*/

function cleanUp(x) {
    if (x < 0) {
        return Math.ceil(x);
    } else {
        return Math.floor(x);
    }
}

function findYardLineIntersections(start, end) {
    var intersectArray = [];
    var sLR = cleanUp(start.getLeftToRight());
    var eLR = cleanUp(end.getLeftToRight());

    if (start.getLeftToRight() == end.getLeftToRight()) {
        intersectArray.push(NO_INTERSECTIONS);
    } else if (sLR < eLR) {
        // Left to Right
        for (var i = sLR; i <= eLR; i++) {
            // Skip starting position
            if (i == start.getLeftToRight()) {
                continue;
            }
            if (i % YARD_LINE_DISTANCE == 0) {
                intersectArray.push(i / YARD_LINE_DISTANCE);
            }
        }
    } else {
        // Right to Left
        for (var i = eLR; i <= sLR; i++) {
            // Skip starting position
            if (i == start.getLeftToRight()) {
                continue;
            }
            if (i % YARD_LINE_DISTANCE == 0) {
                intersectArray.push(i / YARD_LINE_DISTANCE);
            }
        }
        intersectArray.reverse();
    }

    // If no intersections were found and the start left to right were different.
    if (intersectArray.length == 0) {
        intersectArray.push(NO_INTERSECTIONS);
    }

    return intersectArray;
}

function getSlopeBetweenCoordinates(start, end) {
    var rise = end.getFrontToBack() - start.getFrontToBack();
    var run = end.getLeftToRight() - start.getLeftToRight();
    return rise / run;
}

// Completing y = mx + b
// Slope Intercept Form
function findB(start, end) {
    return start.getFrontToBack() - (getSlopeBetweenCoordinates(start, end) * start.getLeftToRight());
}

// yardLine is the internal coord system format, not marching band format
// ex: -16, not S1 40.
function findYardLineIntersectionCoordinate(start, end, yardLine) {
    var m = getSlopeBetweenCoordinates(start, end);
    var b = findB(start, end);
    var x = yardLine;
    var y = (m * x) + b;
    return new Coordinate(x, y);
}

function findCrossCount(start, end, target, counts) {
    var distanceToEnd = getDistanceBetweenCoordinates(start, end);
    var distanceToTarget = getDistanceBetweenCoordinates(start, target);
    var distanceRatio = distanceToEnd / distanceToTarget;
    return counts / distanceRatio;
}

// target is passed in yardline intersection coordinate
function printYardLineCrossInfo(start, end, counts) {
    var intersections = findYardLineIntersections(start, end);
    var crosses = [];
    if (intersections[0] == NO_INTERSECTIONS) {
        // Did not cross a yard line, return message.
        return intersections[0];
    } else {
        for (var i = 0; i < intersections.length; i++) {
            var tempCoord = findYardLineIntersectionCoordinate(start, end, intersections[i] * YARD_LINE_DISTANCE);
            var tempCrossCount = findCrossCount(start, end, tempCoord, counts);
            console.log(`Cross the ${YARDLINES[Math.abs(intersections[i])]} Yard Line on count ${tempCrossCount}.`);
        }
    }
}

/*
    Would like to print something like this:
    Cross the (side) (yardline #) Yard Line on count (count)
*/
