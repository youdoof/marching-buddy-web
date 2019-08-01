const GRID_MULTIPLIER = 16; // Multiplier for going from internal coordinate system to the SVG coordinate system
const X_OFFSET = 84; // Maximum x value for internal coordinate system
const Y_OFFSET = -58; // Maximum y value for internal coordiante system
const YARD = 25.6; // Every 25.6 units on svg is 1 yard
const FOOT = 25.6 / 3;
const INCH = 25.6 / 36;

/**
 * Takes Coordinate and converts to svg coordinates
 * @function translateCoordinateToSVG
 * @param {type} leftToRight {description}
 * @param {type} frontToBack {description}
 * @return {type} {description}
 */
function translateCoordinateToSVG(leftToRight, frontToBack) {
    // (0,0) in SVG = (-84, 58) in Marching Buddy Coordinate System.
    // (-84, 58) is the maximum left-most and top-most of the grid that is supported.

    // (-80, 42) is On the Goal Line, On the Back Sideline.
    //

    var x = coordinateLRToSVGX(leftToRight);
    var y = coordinateFBToSVGY(frontToBack);
    return [x, y];
}

/**
 * Takes left to right number from marching band Coordinate, returns svg x coordinate
 * @function coordinateLRToSVGX
 * @param {Number} x Left to right from marching band Coordinate
 * @return {Number} X coordinate for svg
 */
function coordinateLRToSVGX(x) {
    return (x + X_OFFSET) * GRID_MULTIPLIER;
}

/**
 * Takes front to back number from marching band Coordinate, returns svg y coordinate
 * @function coordinateFBToSVGY
 * @param {Number} y Front to back from marching band Coordinate
 * @return {Number} Y coordinate for svg
 */
function coordinateFBToSVGY(y) {
    return Math.abs(y + Y_OFFSET) * GRID_MULTIPLIER;
}

/**
 * Converts yards in a useful manner for accurate svg printing
 * @function yardsToSVG
 * @param {Number} yard Number representing yards to be converted
 * @return {Number} SVG distance of 1 yard
 */
function yardsToSVG(yard) {
    return yard * YARD;
}

/**
 * Converts feet in a useful manner for accurate svg printing
 * @function feetToSVG
 * @param {Number} foot Number representing feet to be converted
 * @return {Number} SVG distance of 1 foot
 */
function feetToSVG(foot) {
    return foot * FOOT;
}

/**
 * Converts inches in a useful manner for accurate svg printing
 * @function inchesToSVG
 * @param {Number} inch Number representing inches to be converted
 * @return {Number} SVG distance of 1 inch
 */
function inchesToSVG(inch) {
    return inch * INCH;
}
