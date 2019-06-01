'use strict';

// Consider adding Set number and counts...

/**
 * Coordinate for marching band
 * @typedef {Object} Coordinate
 * @property {Number} leftToRight - Left to Right, or X coordinate
 * @property {Number} frontToBack - Front to Back, or Y coordinate
 */
class Coordinate {
    constructor(leftToRight, frontToBack) {
        this.leftToRight = leftToRight;
        this.frontToBack = frontToBack;
    }
    getLeftToRight() {
        return this.leftToRight;
    }
    getFrontToBack() {
        return this.frontToBack;
    }
    printCoordinate(field) {
        return outputLeftToRight(this.getLeftToRight(), field) + "<br>" +
            outputFrontToBack(this.getFrontToBack(), field);
    }
}

function createCoordinateFromInput(input, field) {
    return new Coordinate(inputLeftToRight(input), inputFrontToBack(input, field));
}
