const GRID_MULTIPLIER = 16; // Multiplier for going from internal coordinate system to the SVG coordinate system
const X_OFFSET = 84; // Maximum x value for internal coordinate system
const Y_OFFSET = -58; // Maximum y value for internal coordiante system

function translateFromCoordinateToSVGCoord(x, y) {
    // (0,0) in SVG = (-84, 58) in Marching Buddy Coordinate System.
    // (-84, 58) is the maximum left-most and top-most of the grid that is supported.

    // (-80, 42) is On the Goal Line, On the Back Sideline.
    //

    var newX = translateXCoordinate(x);
    var newY = translateYCoordinate(y);
    return [newX, newY];
}

function translateXCoordinate(x) {
    return (x + X_OFFSET) * GRID_MULTIPLIER;
}

function translateYCoordinate(y) {
    return Math.abs(y + Y_OFFSET) * GRID_MULTIPLIER;
}
