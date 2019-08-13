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
 * Precision to round to in the roundToPrecision function
 * @see roundToPrecision
 * @constant {Number}
 */
const PRECISION_GRANULARITY = 0.125;

/**
 * Calculates the distance between two given Coordinates, used to calculate the step size of a movement
 * @function getDistanceBetweenCoordinates
 * @see getStepSize
 * @param {Coordinate} start Starting point
 * @param {Coordinate} end Ending point
 * @returns {Number} distance between the two given Coordinates
 */
function getDistanceBetweenCoordinates(start, end) {
    var startX = start.leftToRight;
    var startY = start.frontToBack;
    var endX = end.leftToRight;
    var endY = end.frontToBack;
    return Math.sqrt(Math.pow((endX - startX), 2) + Math.pow((endY - startY), 2));
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
        return roundToPrecision(computedStepSize, PRECISION_GRANULARITY) + " to 5";
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
    var leftToRightMiddle = (start.leftToRight + end.leftToRight) / 2;
    var frontToBackMiddle = (start.frontToBack + end.frontToBack) / 2;
    return new Coordinate(leftToRightMiddle, frontToBackMiddle);
}

/* -----------------------------------------
    Operation: Find and Print Yard Lines
------------------------------------------*/

/**
 * Rounds a given Number down (nearest to 0) by finding the ceiling (if negative) or the floor (if positive).
 * This is used in checking which yard lines are crossed.
 * Ex: 1.9 rounds to 1
 * @function prepareYardLineStepper
 * @see findYardLineIntersections
 * @param  {Number} x Number to be rounded
 * @return {Number} Floor or ceiling of given Number
 */
function prepareYardLineStepper(x) {
    // Rounding on outside of a yard line requires special check
    // to see if within 1 step of a yard line, then subtract 1
    // or add 1 to get on the right track.
    if (x < 0) {
        if (x % YARD_LINE_DISTANCE > -1) {
            x -= 1;
        }
        return Math.ceil(x);
    } else {
        if (x % YARD_LINE_DISTANCE < 1) {
            x += 1;
        }
        return Math.floor(x);
    }
}

/**
 * Walks through start and end points and returns an array of intersection points
 * @function yardLineStepper
 * @param  {Coordinate} start Coordinate containing original left to right
 * @param  {Number} a         Starting point to search through
 * @param  {Number} b         Ending point to search through
 * @return {Array<String>} Array of strings containing intersection points
 */
function yardLineStepper(start, a, b) {
    var intersectArray = [];
    for (var i = a; i <= b; i++) {
        // Skip starting position (not crossing yard line if you start on it)
        if (i == start.leftToRight) {
            continue;
        }
        if (i % YARD_LINE_DISTANCE == 0) {
            intersectArray.push(i / YARD_LINE_DISTANCE);
        }
    }
    return intersectArray;
}

/**
 * Searches between the given points to see if any yard lines were intersected
 * and returns the lines which were crossed
 * @function findYardLineIntersections
 * @param  {Coordinate} start Starting point
 * @param  {Coordinate} end Ending point
 * @return {Array<String>} Array of strings containing intersection points
 */
function findYardLineIntersections(start, end) {
    var intersectArray = [];
    var sLR = prepareYardLineStepper(start.leftToRight);
    var eLR = prepareYardLineStepper(end.leftToRight);
    if (start.leftToRight == end.leftToRight) {
        intersectArray.push(NO_INTERSECTIONS);
    } else if (sLR < eLR) {
        // Left to Right
        intersectArray = yardLineStepper(start, sLR, eLR);
    } else {
        // Right to Left
        intersectArray = yardLineStepper(start, eLR, sLR);
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
    var rise = end.frontToBack - start.frontToBack;
    var run = end.leftToRight - start.leftToRight;
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
    return start.frontToBack - (getSlopeBetweenCoordinates(start, end) * start.leftToRight);
}

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
    } else if (field.sideType == 0) {
        // Side Term 0, Side 1 Side 2
        if (point < 0) {
            // Side 1
            return SIDE_TERM_0_SIDE_1_SIDE_2[0];
        } else {
            // Side 2
            return SIDE_TERM_0_SIDE_1_SIDE_2[1];
        }
    } else if (field.sideType == 1) {
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
            crossString += (`Cross the ${printSide(intersections[i], field)} ${YARDLINES[Math.abs(intersections[i])]} Yard Line on count ${roundToPrecision(tempCrossCount, PRECISION_GRANULARITY)}<br>`);
        }
        return crossString;
    }
}
