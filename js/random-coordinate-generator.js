'use strict';

/**
 * Copied from MDN Web Docs
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * Takes a range between which random numbers can be generated and returns a random number in that range.
 * 
 * @function getRandomArbitrary
 * @param  {Number} min Inclusive minimum of the range
 * @param  {Number} max Exclusive maximum of the range
 * @return {Number} Random number in the range given
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Takes a minimum, maximum, and precision, returns a random number within the given min max range
 * that has been rounded to the given precision
 * @function getRandomRounded
 * @see getRandomArbitrary
 * @see roundToPrecision
 * @param  {Number} min       Inclusive minimum of the range
 * @param  {Number} max       Exclusive maximum of the range
 * @param  {Number} precision Fraction to be rounded to
 * @return {Number} Random number that has been rounded to a precision
 */
function getRandomRounded(min, max, precision) {
    return roundToPrecision(getRandomArbitrary(min, max), precision);
}

function getRandomCoordinate() {
    var spec = 0.25;
    var minLR = -84;
    var maxLR = 84;
    var minFB = -58;
    var maxFB = 58;
    return new Coordinate(getRandomRounded(minLR, maxLR, spec), getRandomRounded(minFB, maxFB, spec));
}

function getRandomCounts() {
    var spec = 1;
    var minCount = 1;
    var maxCount = 64;
    return getRandomRounded(minCount, maxCount, spec);
}

/**
 * Takes a number x and returns an array of x random Coordinates
 * @function generateRandomCoordinates
 * @param  {Number} x Number of Coordinates to generate
 * @return {Array<Coordinate>} Array of randomized Coordinates
 */
function generateRandomCoordinates(x) {
    var container = [];
    var spec = 0.25;
    var minLR = -84;
    var maxLR = 84;
    var minFB = -58;
    var maxFB = 58;
    for (var i = 0; i < x; i++) {
        container.push(new Coordinate(getRandomRounded(minLR, maxLR, spec),getRandomRounded(minFB, maxFB, spec)));
    }
    return container;
}
