'use strict';

// Start and End Coordinates
// Counts for the move
// Calc & store Yard Line Crosses & counts
// Each Step of the Move
// Angle of reference from start to end


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
        this._intermediary = [];
        this._angle = setAngle(this._start, this._end);
    }
    get start() {
        return this._start;
    }
    set start(value) {
        this._start = value;
    }
    get intermediary() {
        return this._intermediary;
    }
    set intermediary(value) {
        this._intermediary.push(value);
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

    printAngle() {
        // Return angle with degrees character
    }
}

/**
 * Calculates the angle from the start point to the end point
 * @function setAngle
 * @param {Coordinate} start Starting point
 * @param {Coordinate} end   Ending point
 * @return {Number} Angle between the start and end points
 */
function setAngle(start, end) {
    return roundToPrecision(Math.atan(getSlopeBetweenCoordinates(start, end)),0.05);
}
