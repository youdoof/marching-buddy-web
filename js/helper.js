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

function testPlease() {
    var f = new Field();
    var sI = new Input(START);
    var eI = new Input(END);
    var sC = createCoordinateFromInput(sI, f);
    var eC = createCoordinateFromInput(eI, f);
    var m = new Movement(sC, eC, getCounts());
    console.log(m.printCoordinates(f));
    console.log(m.printMidSet(f));
    console.log(m.printStepSize());
    console.log(m.printStepCoordinates(f));
    console.log(m.printYardLineCrossInfo(f));
    console.log(m.printAngle());
}
