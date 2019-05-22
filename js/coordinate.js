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
        return outputLeftToRight(this.getLeftToRight(), field) + ", " +
            outputFrontToBack(this.getFrontToBack(), field);
    }
}
