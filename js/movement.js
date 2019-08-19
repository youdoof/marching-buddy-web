'use strict';

/*
 * [X] Start and End Coordinates
 * [X] Counts for the move
 * [X] Calc & store Yard Line Crosses
 * [ ] Each Step of the Move
 * [X] Angle of reference from start to end
 */

class Movement {
    /**
     * @param {Coordinate} start Starting Coordinate
     * @param {Coordinate} end Ending Coordinate
     * @param {Number} counts Counts to traverse from Start to End
     */
    constructor(start, end, counts) {
        this._start = start;
        this._end = end;
        this._counts = counts;
        this._mid = findMidSetCoordinate(this._start, this._end);
        this._stepSize = findStepSize(this._start, this._end, this._counts);
        this._stepCoordinates = findStepCoordinates(this._start, this._end, this._counts);
        this._yardLineCrossCoordinates = findYardLineCrossCoordinates(this._start, this._end, this._counts);
        this._angle = setAngle(this._start, this._end);
    }
    // Getters & Setters
    get start() {
        return this._start;
    }
    set start(value) {
        this._start = value;
    }
    get yardLineCrossCoordinates() {
        return this._yardLineCrossCoordinates;
    }
    set yardLineCrossCoordinates(value) {
        this._yardLineCrossCoordinates = value;
    }
    get end() {
        return this._end;
    }
    set end(value) {
        this._end = value;
    }
    get counts() {
        return this._counts;
    }
    set counts(value) {
        this._counts = value;
    }
    get angle() {
        return this._angle;
    }
    set angle(value) {
        this._angle = value;
    }
    // Print Methods
    printCoordinates(field) {
        return `Start: ${this._start.printCoordinate(field)}<br>End: ${this._end.printCoordinate(field)}`;
    }
    printMidSet(field) {
        return this._mid.printCoordinate(field);
    }
    printStepSize() {
        return this._stepSize;
    }
    printStepCoordinates(field) {
        if (checkIfHold(this._start, this._end)) {
            return HOLD;
        } else {
            var stepString = "";
            for (var i = 0; i < this._stepCoordinates.length; i++) {
                stepString += `Count ${i+1}: ${this._stepCoordinates[i].printCoordinate(field)}\n`;
            }
            return stepString;
        }
    }
    printYardLineCrossInfo(field) {
        var crossString = "";
        // Check if there were no intersections. If so, print the no intersections message.
        if (this._yardLineCrossCoordinates == NO_INTERSECTIONS) {
            return `${this._yardLineCrossCoordinates[0]}`;
        } else {
            // Walk through yard line cross coordinates, build string of crosses and counts.
            for (var i = 0; i < this._yardLineCrossCoordinates.length; i++) {
                var crossCount = findCountAtTarget(this._start, this._end, this._yardLineCrossCoordinates[i], this._counts);
                //                          Print the Side of Field                                                                 Print Yard Line being crossed                                                                                 Print Count Crossed
                crossString += `Cross the ${printSide(this._yardLineCrossCoordinates[i].leftToRight / YARD_LINE_DISTANCE, field)} ${YARDLINES[Math.abs(this._yardLineCrossCoordinates[i].leftToRight / YARD_LINE_DISTANCE)]} Yard Line on count ${roundToPrecision(crossCount, PRECISION_GRANULARITY)}<br>`;
            }
            return crossString;
        }
    }
    printAngle() {
        if (checkIfHold(this._start, this._end)) {
            return HOLD;
        } else {
            return `Direction of move: ${this._angle}°`;
        }
    }
}

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
 * Current default is to nearest 1/8
 * @see roundToPrecision
 * @constant {Number}
 */
const PRECISION_GRANULARITY = 0.125;

/**
 * Message to display if the move is a hold, i.e. the start and end position are the same
 * @see printAngle
 * @const {String}
 */
const HOLD = "Hold";

/**
 * Returns true if the start and end coordinates are the same, false if they are not.
 * @function checkIfHold
 * @param  {Coordinate} start Start Coordinate
 * @param  {Coordinate} end   End Coordinate
 * @return {Boolean} True if start and end are the same (It's a Hold), False otherwise
 */
function checkIfHold(start, end) {
    return (start._leftToRight == end._leftToRight && start._frontToBack == end._frontToBack);
}

/**
 * Calculates the distance between two given Coordinates, used to calculate the step size of a movement
 * @function findDistanceBetweenCoordinates
 * @see findStepSize
 * @param  {Coordinate} start Starting point
 * @param  {Coordinate} end Ending point
 * @return {Number} distance between the two given Coordinates
 */
function findDistanceBetweenCoordinates(start, end) {
    var startX = start.leftToRight;
    var startY = start.frontToBack;
    var endX = end.leftToRight;
    var endY = end.frontToBack;
    return Math.sqrt(Math.pow((endX - startX), 2) + Math.pow((endY - startY), 2));
}

/**
 * Calculates and returns the step size from a given movement start to end
 * @function findStepSize
 * @param  {Coordinate} start Starting point
 * @param  {Coordinate} end Ending point
 * @param  {Number} counts Counts it takes to traverse the movement
 * @return {String} Hold if distance was 0, Step Size of the movement
 */
function findStepSize(start, end, counts) {
    if (checkIfHold(start, end)) {
        return HOLD;
    } else {
        var computedStepSize;
        var distance = findDistanceBetweenCoordinates(start, end);
        var stepSizeMultiplier = distance / counts;
        computedStepSize = STEP_SIZE_REFERENCE / stepSizeMultiplier;
        return roundToPrecision(computedStepSize, PRECISION_GRANULARITY) + " to 5";
    }
}

/**
 * Calculates the angle from the start point to the end point
 * 
 * This is not working the way I want it to. Need to think about the perspective of the
 * performer and what angle reference to which direction will be useful.
 * @function setAngle
 * @param  {Coordinate} start Starting point
 * @param  {Coordinate} end   Ending point
 * @return {Number} Angle between the start and end points
 */
function setAngle(start, end) {
    return roundToPrecision(angleInDegrees(Math.atan(findSlopeBetweenCoordinates(start, end))), 0.25);
}

/**
 * Creates and returns a new Coordinate from the midpoint between two given Coordinates
 * @function findMidSetCoordinate
 * @param {Coordinate} start Starting point
 * @param {Coordinate} end Ending point
 * @returns {Coordinate} Mid point between the two given Coordinates
 */
function findMidSetCoordinate(start, end) {
    var leftToRightMiddle = (start.leftToRight + end.leftToRight) / 2;
    var frontToBackMiddle = (start.frontToBack + end.frontToBack) / 2;
    return new Coordinate(leftToRightMiddle, frontToBackMiddle);
}

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
    // to see if within 1 step of a yard line, then round the 
    // opposite direction. This is to avoid starting the
    // yardLineStepper on a yard line. 
    if (x < 0) {
        if (x % YARD_LINE_DISTANCE > -1) {
            return Math.floor(x);
        }
        return Math.ceil(x);
    } else {
        if (x % YARD_LINE_DISTANCE < 1) {
            return Math.ceil(x);
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
 * Finds and returns the slope of the line between two given coordinates
 * @function findSlopeBetweenCoordinates
 * @param  {Coordinate} start Starting point
 * @param  {Coordinate} end   Ending point
 * @return {Number}           The slope of the line intersecting the start and end points
 */
function findSlopeBetweenCoordinates(start, end) {
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
    return start.frontToBack - (findSlopeBetweenCoordinates(start, end) * start.leftToRight);
}

/**
 * Finds and returns the Coordinate along the line between the start and end point at the desired left to right
 * @function findCoordinateAtLeftToRight
 * @param  {Coordinate} start   Starting point
 * @param  {Coordinate} end     Ending point
 * @param  {Number} leftToRight Internal x coordinate representing the desired left to right
 * @return {Coordinate}         Coordinate where yard line interseciton occurred
 */
function findCoordinateAtLeftToRight(start, end, leftToRight) {
    var m = findSlopeBetweenCoordinates(start, end);
    var b = findB(start, end);
    var x = leftToRight;
    var y = (m * x) + b;
    return new Coordinate(x, y);
}

/**
 * Finds and returns the count on which the cross occurs on the given target point
 * @function findCountAtTarget
 * @param  {Coordinate} start  Starting point
 * @param  {Coordinate} end    Ending point
 * @param  {Coordinate} target Target point
 * @param  {Number} counts Total counts of the move
 * @return {Number} Count on which the cross occurred at the target coordinate
 */
function findCountAtTarget(start, end, target, counts) {
    var distanceToEnd = findDistanceBetweenCoordinates(start, end);
    var distanceToTarget = findDistanceBetweenCoordinates(start, target);
    var distanceRatio = distanceToEnd / distanceToTarget;
    return counts / distanceRatio;
}

/**
 * Prints the side of the field with correct terminology, given the point and state of field
 * @function printSide
 * @param  {Number} point Number representing the left to right
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
 * Searches between the given points to see if any yard lines were intersected
 * and returns the lines which were crossed
 * @function findYardLineCrosses
 * @param  {Coordinate} start Starting point
 * @param  {Coordinate} end Ending point
 * @return {Array<String>|Array<Number>} Array of strings containing intersection points
 */
function findYardLineCrosses(start, end) {
    var intersectArray = [];
    var sLR = prepareYardLineStepper(start.leftToRight);
    var eLR = prepareYardLineStepper(end.leftToRight);
    // Start and end points were the same, not going to cross a yard line
    if (start.leftToRight == end.leftToRight) {
        intersectArray.push(NO_INTERSECTIONS);
    } else if (sLR < eLR) {
        // Search from Left to Right for
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
 * Finds the yard line crosses and stores 'em
 * @function getYardLineCrosses
 * @param  {Coordinate} start  Start Coordinate
 * @param  {Coordinate} end    End Coordinate
 * @return {Array<Coordinate>|Array<String>} Array holding all yard line crosses found or an array with a string saying no intersections
 */
function findYardLineCrossCoordinates(start, end) {
    var intersections = findYardLineCrosses(start, end);
    var coordinateHolder = [];
    if (intersections[0] == NO_INTERSECTIONS) {
        return [NO_INTERSECTIONS];
    } else {
        for (var i = 0; i < intersections.length; i++) {
            var tempCoord = findCoordinateAtLeftToRight(start, end, intersections[i] * YARD_LINE_DISTANCE);
            coordinateHolder.push(tempCoord);
        }
        return coordinateHolder;
    }
}

/**
 * Finds the Coordinates in between the start and end Coordinates at each count of the move
 * @function findStepCoordinates
 * @param  {Coordinate} start  Start Coordinate
 * @param  {Coordinate} end    End Coordinate
 * @param  {Number} counts Counts of the move
 * @return {String|Array<Coordinate>} Array of Coordinates at each count of the move, or a string stating the move is a hold
 */
function findStepCoordinates(start, end, counts) {
    if (checkIfHold(start, end)) {
        return HOLD;
    } else {
        var run = end._leftToRight - start._leftToRight; // Left to Right
        var rise = end._frontToBack - start._frontToBack; // Front to Back
        var runMultiplier = run / counts;
        var riseMultiplier = rise / counts;
        var stepCoordinates = [];
        for (var i = 1; i < counts + 1; i++) {
            var tempLR = start._leftToRight + (runMultiplier * i);
            var tempFB = start._frontToBack + (riseMultiplier * i);
            stepCoordinates.push(new Coordinate(tempLR, tempFB));
        }
        return stepCoordinates;
    }
}
