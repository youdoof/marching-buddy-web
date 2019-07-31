'use strict';

/**
 * Step Size Constant -- 8 to 5 
 * @const {Number}
 */
const STEP_SIZE_REFERENCE = 8.0;

/**
 * Yard Line Grid distance
 * @const {Number}
 */
const YARD_LINE_DISTANCE = 8;

/**
 * Message to display if findYardLineIntersections did not find any yard line intersections
 * @see printYardLineCrossInfo
 * @const {String}
 */
const NO_INTERSECTIONS = "No Yard Line Intersections Found";

/**
 * Calculates the distance between two given Coordinates, used to calculate the step size of a movement
 * @function getDistanceBetweenCoordinates
 * @see getStepSize
 * @param {Coordinate} start Starting point
 * @param {Coordinate} end Ending point
 * @returns {Number} distance between the two given Coordinates
 */
function getDistanceBetweenCoordinates(start, end) {
    var startX = start.getLeftToRight();
    var startY = start.getFrontToBack();
    var endX = end.getLeftToRight();
    var endY = end.getFrontToBack();
    return Math.sqrt(Math.pow((endX - startX), 2) + Math.pow((endY - startY), 2));
}

/**
 * Decimal places to round to in the rounder function
 * @see rounder
 * @constant {Number}
 */
const ROUNDER_GRANULARITY = 3;

/**
 * Round a given Number to ROUNDER_GRANULARITY decimal places
 * @function rounder
 * @param {Number} x Number to be rounded
 * @returns {Number} Number rounded to constant decimal places
 */
function rounder(x) {
    return Number.parseFloat(x).toFixed(ROUNDER_GRANULARITY);
}

/**
 * Calculates and returns the step size from a given movement start to end
 * @function getStepSize
 * @param {Coordinate} start Starting point
 * @param {Coordinate} end Ending point
 * @param {Number} counts Counts it takes to traverse the movement
 * @returns {string} Hold if distance was 0, Step Size of the movement
 */
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

/**
 * Creates and returns a new Coordinate from the midpoint between two given Coordinates
 * @function getMidSetCoordinate
 * @param {Coordinate} start Starting point
 * @param {Coordinate} end Ending point
 * @returns {Coordinate} Mid point between the two given Coordinates
 */
function getMidSetCoordinate(start, end) {
    var leftToRightMiddle = (start.getLeftToRight() + end.getLeftToRight()) / 2;
    var frontToBackMiddle = (start.getFrontToBack() + end.getFrontToBack()) / 2;
    return new Coordinate(leftToRightMiddle, frontToBackMiddle);
}

/* -----------------------------------------
    Operation: Find and Print Yard Lines
------------------------------------------*/

/**
 * Cleans up a given Number by finding the ceiling (if negative) or the floor (if positive).
 * @function cleanUp
 * @param  {Number} x Number to be fixed up
 * @return {Number} Floor or ceiling of given Number
 */
function cleanUp(x) {
    if (x < 0) {
        return Math.ceil(x);
    } else {
        return Math.floor(x);
    }
}

/**
 * Searches between the given points to see if any yard lines were intersected and returns the lines which were crossed
 * @function findYardLineIntersections
 * @param  {Coordinate} start Starting point
 * @param  {Coordinate} end Ending point
 * @return {Array<String>} Array of strings containing possible intersection points
 */
function findYardLineIntersections(start, end) {
    var intersectArray = [];
    var sLR = cleanUp(start.getLeftToRight());
    var eLR = cleanUp(end.getLeftToRight());

    if (start.getLeftToRight() == end.getLeftToRight()) {
        intersectArray.push(NO_INTERSECTIONS);
    } else if (sLR < eLR) {
        // Left to Right
        for (var i = sLR; i <= eLR; i++) {
            // Skip starting position (won't cross yard line if you start on it)
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
            // Skip starting position (won't cross yard line if you start on it)
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

/**
 * Finds and returns the slope of the line between two given coordinates
 * @function getSlopeBetweenCoordinates
 * @param  {Coordinate} start Starting point
 * @param  {Coordinate} end   Ending point
 * @return {Number}           The slope of the line intersecting the start and end points
 */
function getSlopeBetweenCoordinates(start, end) {
    var rise = end.getFrontToBack() - start.getFrontToBack();
    var run = end.getLeftToRight() - start.getLeftToRight();
    return rise / run;
}

/**
 * Finds and returns the value of B from slope intercept form y = mx + b
 * @function findB
 * @param  {Coordinate} start Starting point
 * @param  {Coordinate} end   Ending point
 * @return {Number}           The Number B to complete slope intercept form y = mx + b
 */
function findB(start, end) {
    return start.getFrontToBack() - (getSlopeBetweenCoordinates(start, end) * start.getLeftToRight());
}

// yardLine is the internal coord system format, not marching band format
// ex: -16, not S1 40.

/**
 * Finds and returns the Coordinate along the line between the start and end point
 * @function findYardLineIntersectionCoordinate
 * @param  {Coordinate} start Starting point
 * @param  {Coordinate} end   Ending point
 * @param  {Number} yardLine  Internal x coordinate representing the desired yard line
 * @return {Coordinate}       Coordinate where yard line interseciton occurred
 */
function findYardLineIntersectionCoordinate(start, end, yardLine) {
    var m = getSlopeBetweenCoordinates(start, end);
    var b = findB(start, end);
    var x = yardLine;
    var y = (m * x) + b;
    return new Coordinate(x, y);
}

/**
 * Finds and returns the count on which the cross occurs on the given target point
 * @function findCrossCount
 * @param  {Coordinate} start  Starting point
 * @param  {Coordinate} end    Ending point
 * @param  {Coordinate} target Target point
 * @param  {Number} counts Total counts of the move
 * @return {Number} Count on which the cross occurred at the target coordinate
 */
function findCrossCount(start, end, target, counts) {
    var distanceToEnd = getDistanceBetweenCoordinates(start, end);
    var distanceToTarget = getDistanceBetweenCoordinates(start, target);
    var distanceRatio = distanceToEnd / distanceToTarget;
    return counts / distanceRatio;
}

/**
 * Prints the side of the field with correct terminology, given the point and state of field
 * @function printSide
 * @param  {Number} point Number representing the 
 * @param  {Field} field Field object containing status of terminology
 * @return {String} String detailing the side of the field given the point
 */
function printSide(point, field) {
    if (point == 0) {
        // The 50 Yard line
        return "";
    } else if (field.getSideType() == 0) {
        // Side Term 0, Side 1 Side 2
        if (point < 0) {
            // Side 1
            return SIDE_TERM_0_SIDE_1_SIDE_2[0];
        } else {
            // Side 2
            return SIDE_TERM_0_SIDE_1_SIDE_2[1];
        }
    } else if (field.getSideType() == 1) {
        // Side Term 1, Left Right
        if (point < 0) {
            // Left
            return SIDE_TERM_1_LEFT_RIGHT[0];
        } else {
            // Right
            return SIDE_TERM_1_LEFT_RIGHT[1];
        }
    } else {
        return "";
    }
}

/**
 * Finds and prints each yard line that would be crossed between the given start and end points,
 * as well as the exact count on which the intersection takes place.
 * @function printYardLineCrossInfo
 * @param  {Coordinate} start  Starting point
 * @param  {Coordinate} end    Ending point
 * @param  {Number} counts Counts it takes to traverse between start and end points
 * @param  {Field} field  Field object containing status of terminology
 * @return {String} Formatted string containing the counts on which yard lines were crossed, seperated by line break tags
 */
function printYardLineCrossInfo(start, end, counts, field) {
    var intersections = findYardLineIntersections(start, end);
    var crossString = "";
    if (intersections[0] == NO_INTERSECTIONS) {
        // Did not cross a yard line, return message.
        return intersections[0];
    } else {
        // Build string of crossed yard lines
        for (var i = 0; i < intersections.length; i++) {
            var tempCoord = findYardLineIntersectionCoordinate(start, end, intersections[i] * YARD_LINE_DISTANCE);
            var tempCrossCount = findCrossCount(start, end, tempCoord, counts);
            crossString += (`Cross the ${printSide(intersections[i], field)} ${YARDLINES[Math.abs(intersections[i])]} Yard Line on count ${rounder(tempCrossCount)}<br>`);
        }
        return crossString;
    }
}

/**
 * Calculates the angle from the start point to the end point
 * @function getAngleReference
 * @param {Coordinate} start Starting point
 * @param {Coordinate} end   Ending point
 * @return {Number} Angle between the start and end points
 */
function getAngleReference(start, end) {
    return rounder(Math.atan(getSlopeBetweenCoordinates(start, end)));
}

function printAngleReference(start, end) {
    var angle = getAngleReference(start, end);
    var outputString = `Direction of move: ${angle}`;
    return outputString;
}
