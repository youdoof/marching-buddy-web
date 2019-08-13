/**
 * Copied from MDN Web Docs
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
 * Rounds given number to a given precision, with .5 rounding up.
 * @function roundToPrecision
 * @param  {Number} x         Number to be rounded
 * @param  {Number} precision Fraction to be rounded to
 * @return {Number} Rounded number
 */
function roundToPrecision(x, precision) {
    var y = +x + (precision === undefined ? 0.5 : precision / 2);
    return y - (y % (precision === undefined ? 1 : +precision));
}

/**
 * Takes angle in radians and returns it in degrees
 * @function angleInDegrees
 * @param  {Number} radians Angle in Radians
 * @return {Number} Angle in Degrees
 */
function angleInDegrees(radians) {
    return radians * (180 / Math.PI);
}
