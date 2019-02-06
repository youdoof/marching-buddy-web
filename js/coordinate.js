'use strict';

// Consider adding Set number and counts...

function Coordinate(leftToRight, frontToBack) {
    this.leftToRight = leftToRight;
    this.frontToBack = frontToBack;
}

Coordinate.prototype.getLeftToRight = function () {
    return this.leftToRight;
}

Coordinate.prototype.getFrontToBack = function () {
    return this.frontToBack;
}

Coordinate.prototype.printCoordinate = function (field) {
    return outputLeftToRight(this.getLeftToRight(), field) + " \n" +
        outputFrontToBack(this.getFrontToBack(), field);
}
