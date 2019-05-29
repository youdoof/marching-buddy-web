'use strict';

// Consider adding Set number and counts...
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
