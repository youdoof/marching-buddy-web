'use strict';

/**
 * Coordinate for marching band
 * @typedef {Object} Coordinate
 * @property {Number} leftToRight - Left to Right, or X coordinate
 * @property {Number} frontToBack - Front to Back, or Y coordinate
 */
class Coordinate {
    /**
     * New Coordinate for use in the calculation of midsets, step sizes, and cross counts
     * @param {Number} leftToRight Left to Right, or X coordinate
     * @param {Number} frontToBack Front to Back, or Y coordinate
     */
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
    /**
     * Prints the Coordinate in marching band terms that the user will understand,
     * using terminology the user defined from settings
     * @function printCoordinate
     * @param  {Field} field Field object containing field type and terminology
     * @return {String} Formatted string detailing the location of the Coordinate in marching band terms
     */
    printCoordinate(field) {
        return outputLeftToRight(this.getLeftToRight(), field) + "<br>" +
            outputFrontToBack(this.getFrontToBack(), field);
    }
}

/**
 * Takes input from the user and returns a new Coordinate for use in the project
 * @function createCoordinateFromInput
 * @param  {Input} input Input object generated from user input
 * @param  {Field} field Field object containing terminology information
 * @return {Coordinate} New Coordinate from input
 */
function createCoordinateFromInput(input, field) {
    return new Coordinate(inputLeftToRight(input), inputFrontToBack(input, field));
}
