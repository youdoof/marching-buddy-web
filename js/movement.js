'use strict';

// [X] Start and End Coordinates
// [X] Counts for the move
// [X] Calc & store Yard Line Crosses & counts
// [ ] Each Step of the Move
// [X] Angle of reference from start to end


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
        var crossData = getYardLineCrossCountsAndCoordinates(this._start, this._end, this._counts);
        this._yardLineCrossCoordinates = crossData.coordinate;
        this._yardLineCrossCounts = crossData.count;
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
    get yardLineCrossCounts() {
        return this._yardLineCrossCounts;
    }
    set yardLineCrossCounts(value) {
        this._yardLineCrossCounts = value;
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
    printCoordinates() {
        var f = new Field();
        return `Start: ${this.start.printCoordinate(f)} \nEnd: ${this.end.printCoordinate(f)}`
    }
    printAngle() {
        return `Direction of move: ${this.angle}°`;
    }
}

/**
 * Calculates the angle from the start point to the end point
 * @function setAngle
 * @param  {Coordinate} start Starting point
 * @param  {Coordinate} end   Ending point
 * @return {Number} Angle between the start and end points
 */
function setAngle(start, end) {
    return roundToPrecision(angleInDegrees(Math.atan(getSlopeBetweenCoordinates(start, end))), 0.25);
}

/**
 * Finds the yard line crosses and stores 'em
 * @function getYardLineCrosses
 * @param  {Coordinate} start  Start Coordinate
 * @param  {Coordinate} end    End Coordinate
 * @param  {Number}     counts Counts for the move
 * @return {Object} coordinateHolder and countHolder
 */
function getYardLineCrossCountsAndCoordinates(start, end, counts) {
    var intersections = findYardLineIntersections(start, end);
    var coordinateHolder = [];
    var countHolder = [];
    if (intersections[0] == NO_INTERSECTIONS) {
        return {
            coordinate: 0,
            count: 0
        };
    } else {
        for (var i = 0; i < intersections.length; i++) {
            var tempCoord = findYardLineIntersectionCoordinate(start, end, intersections[i] * YARD_LINE_DISTANCE);
            countHolder.push(findCrossCount(start, end, tempCoord, counts));
            coordinateHolder.push(tempCoord);
        }
        return {
            coordinate: coordinateHolder,
            count: countHolder
        };
    }

}
