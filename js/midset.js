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

function printSide(point, field) {
    if (point == 0) {
        // The 50 Yard line
        return "";
    } else if (field.getSideType() == 0) {
        // Side Term 0, Side 1 Side 2
        if (point < 0) {
            return SIDE_TERM_0_SIDE_1_SIDE_2[0];
        } else {
            return SIDE_TERM_0_SIDE_1_SIDE_2[1];
        }
    } else if (field.getSideType() == 1) {
        // Side Term 1, Left Right
        if (point < 0) {
            return SIDE_TERM_1_LEFT_RIGHT[0];
        } else {
            return SIDE_TERM_1_LEFT_RIGHT[1];
        }
    } else {
        return "";
    }
}

function printYardLineCrossInfo(start, end, counts, field) {
    var intersections = findYardLineIntersections(start, end);
    var crossString = "";
    if (intersections[0] == NO_INTERSECTIONS) {
        // Did not cross a yard line, return message.
        return intersections[0];
    } else {
        for (var i = 0; i < intersections.length; i++) {
            var tempCoord = findYardLineIntersectionCoordinate(start, end, intersections[i] * YARD_LINE_DISTANCE);
            var tempCrossCount = findCrossCount(start, end, tempCoord, counts);
            crossString += (`Cross the ${printSide(intersections[i], field)} ${YARDLINES[Math.abs(intersections[i])]} Yard Line on count ${rounder(tempCrossCount)}<br>`);
        }
        return crossString;
    }
}
