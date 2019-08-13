'use strict';

const BACK_SIDE_LINE_SVG = coordinateFBToSVGY(42); // 256
const FRONT_SIDE_LINE_SVG = coordinateFBToSVGY(-42); // 1600
const SIDE_ONE_YARD_LINE_SVG = coordinateLRToSVGX(-80); // 64
const SIDE_TWO_YARD_LINE_SVG = coordinateLRToSVGX(80); // 2624
const HS_BACK_HASH_SVG = coordinateFBToSVGY(14); // 704
const HS_FRONT_HASH_SVG = coordinateFBToSVGY(-14); // 1152
const NCAA_BACK_HASH_SVG = coordinateFBToSVGY(10); // 768
const NCAA_FRONT_HASH_SVG = coordinateFBToSVGY(-10); // 1088

const TICK_LENGTH = feetToSVG(2); // Ticks are 2 feet long
const YARD_LENGTH = YARD;
const LINE_STROKE_WIDTH = inchesToSVG(4); // Every line on field is 4 inches wide


// Numbers are 6 feet high and 4 feet wide

/**
 * Creates svg with given widths and height, places in a div with a class
 * named container, then returns the svg
 * @function createCanvas
 * @param {Number} width Width of svg canvas
 * @param {Number} height Height of svg canvas
 * @param {String} container Class of div to place svg in
 * @return {SVG} SVG ready to be used to draw the field
 */
function createCanvas(width, height, container) {
    var container = document.querySelector(container);
    var canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.setAttribute('style', 'background: white;');
    container.appendChild(canvas);
    return canvas;
}

/**
 * Takes starting and ending x,y coordinates and returns an svg line element
 * using the given width. Line element must be appended to a parent svg
 * @function createLine
 * @param {Number} x1 Starting x coordinate
 * @param {Number} y1 Starting y coordinate
 * @param {Number} x2 Ending x coordinate
 * @param {Number} y2 Ending y coordinate
 * @param {Number} width Desired width of the line
 * @return {SVGLineElement} SVG line element to be appended to a parent svg
 */
function createLine(x1, y1, x2, y2, width) {
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', 'black');
    line.setAttribute('stroke-width', width);
    return line;
}

/**
 * Returns a new group element for structuring a parent svg
 * @function createGroup
 * @param {type} className Desired name for the class of the group
 * @return {SVGGElement} SVG group element to be used in a parent svg
 */
function createGroup(className) {
    var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('class', className);
    return group;
}

/**
 * Takes x,y coordinates and draws a circle
 * @function createCircle
 * @param {Number} x x coorinate for circle to be centered on
 * @param {Number} y y coorinate for circle to be centered on
 * @return {SVGCircleElement} SVG circle element to be used in a parent svg
 */
function createCircle(x, y) {
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', '4');
    return circle;
}

/**
 * Creates various groups within parent svg to draw parts of the field
 * @function setupGroups
 * @param {SVGElement} parent Main parent svg within which to create seperate groups
 */
function setupGroups(parent) {
    parent.appendChild(createGroup('yardlines'));
    parent.appendChild(createGroup('hashes'));
    parent.appendChild(createGroup('ticks'));
    parent.appendChild(createGroup('sidelines'));
    parent.appendChild(createGroup('midset-target'));
}

/**
 * Draws yard lines from sideline to sideline using given x coordinate
 * @function drawYardLines
 * @param {SVGGElement} targetGroup yardlines group of the svg
 * @param {Number} x x coordinate to draw from
 */
function drawYardLines(targetGroup, x) {
    targetGroup.appendChild(createLine(x, BACK_SIDE_LINE_SVG, x, FRONT_SIDE_LINE_SVG, LINE_STROKE_WIDTH));
}
/**
 * drawHashes takes the hash type and appropriately draws hashes on the field svg
 * @function drawHashes
 * @param {SVGGElement} targetGroup hashes group of the svg
 * @param {Number} hashType 0 - High School, 1 - NCAA / College
 * @param {Number} x target yard line to draw on
 */
function drawHashes(targetGroup, hashType, x) {
    var halfHash = TICK_LENGTH / 2;
    if (hashType == 0) {
        var backHash = HS_BACK_HASH_SVG;
        var frontHash = HS_FRONT_HASH_SVG;
    } else {
        var backHash = NCAA_BACK_HASH_SVG;
        var frontHash = NCAA_FRONT_HASH_SVG;
    }
    if (x == SIDE_ONE_YARD_LINE_SVG) {
        targetGroup.appendChild(createLine(x, backHash, x + halfHash, backHash, LINE_STROKE_WIDTH));
        targetGroup.appendChild(createLine(x, frontHash, x + halfHash, frontHash, LINE_STROKE_WIDTH));
    } else if (x == SIDE_TWO_YARD_LINE_SVG) {
        targetGroup.appendChild(createLine(x - halfHash, backHash, x, backHash, LINE_STROKE_WIDTH));
        targetGroup.appendChild(createLine(x - halfHash, frontHash, x, frontHash, LINE_STROKE_WIDTH));
    } else {
        targetGroup.appendChild(createLine(x - halfHash, backHash, x + halfHash, backHash, LINE_STROKE_WIDTH));
        targetGroup.appendChild(createLine(x - halfHash, frontHash, x + halfHash, frontHash, LINE_STROKE_WIDTH));
    }
}

/**
 * Draws the tick marks in between each yard line. At the hash and at the side line.
 * @function drawTicks
 * @param {SVGGElement} targetGroup desired group to add the drawn ticks to in the parent SVG
 * @param {Number} hashType 0- High School, 1 - NCAA/College
 * @param {Number} x Reference yard line to draw the hashes from
 */
function drawTicks(targetGroup, hashType, x) {
    if (hashType == 0) {
        var backHash = HS_BACK_HASH_SVG;
        var frontHash = HS_FRONT_HASH_SVG;
    } else {
        var backHash = NCAA_BACK_HASH_SVG;
        var frontHash = NCAA_FRONT_HASH_SVG;
    }

    var backWithOffset = BACK_SIDE_LINE_SVG + inchesToSVG(2);
    var frontWithOffset = FRONT_SIDE_LINE_SVG - inchesToSVG(2);

    if (x != SIDE_TWO_YARD_LINE_SVG) {
        for (var i = 1; i <= 4; i++) {
            var offset = x + (i * YARD_LENGTH);
            targetGroup.appendChild(createLine(offset, backWithOffset, offset, backWithOffset + TICK_LENGTH, LINE_STROKE_WIDTH));
            targetGroup.appendChild(createLine(offset, backHash, offset, backHash - TICK_LENGTH, LINE_STROKE_WIDTH));
            targetGroup.appendChild(createLine(offset, frontHash, offset, frontHash + TICK_LENGTH, LINE_STROKE_WIDTH));
            targetGroup.appendChild(createLine(offset, frontWithOffset, offset, frontWithOffset - TICK_LENGTH, LINE_STROKE_WIDTH));
        }
    }
}

/**
 * Draws both front and back sidelines
 * @function drawSidelines
 * @param {SVGGElement} targetGroup group to add sidelines to in the parent svg
 */
function drawSidelines(targetGroup) {
    targetGroup.appendChild(createLine(SIDE_ONE_YARD_LINE_SVG, BACK_SIDE_LINE_SVG, SIDE_TWO_YARD_LINE_SVG, BACK_SIDE_LINE_SVG, LINE_STROKE_WIDTH));
    targetGroup.appendChild(createLine(SIDE_ONE_YARD_LINE_SVG, FRONT_SIDE_LINE_SVG, SIDE_TWO_YARD_LINE_SVG, FRONT_SIDE_LINE_SVG, LINE_STROKE_WIDTH));
}

/**
 * Draws the field using subfunctions to gather individual pieces into one svg
 * @function drawField
 * @param {Number} hashType 0 - High School, 1 - NCAA/College
 */
function drawField(hashType) {
    var canvas = createCanvas(2688, 1856, '.svg-target');
    setupGroups(canvas);
    var yardlinegroup = document.querySelector('.yardlines');
    var hashesgroup = document.querySelector('.hashes');
    var tickgroup = document.querySelector('.ticks');
    var sidelinesgroup = document.querySelector('.sidelines');

    for (var i = 0; i <= 20; i++) {
        var x = 64 + (i * (8 * 16));
        drawYardLines(yardlinegroup, x);
        drawHashes(hashesgroup, hashType, x);
        drawTicks(tickgroup, hashType, x);
    }
    drawSidelines(sidelinesgroup);
}

/**
 * Takes the start and end points of coordinates and 
 * @function drawMovement
 * @param {Number} x1 Start x coordinate (Left to Right)
 * @param {Number} y1 Start y coordinate (Front to Back)
 * @param {Number} x2 End x coordinate (Left to Right)
 * @param {Number} y2 End y coordinate (Front to Back)
 */
function drawMovement(x1, y1, x2, y2) {
    var midsettarget = document.querySelector('.midset-target');
    var newGroup = createGroup('movement');
    var startx = coordinateLRToSVGX(x1);
    var starty = coordinateFBToSVGY(y1);
    var endx = coordinateLRToSVGX(x2);
    var endy = coordinateFBToSVGY(y2);
    // Circles
    newGroup.appendChild(createCircle(startx, starty));
    newGroup.appendChild(createCircle(endx, endy));
    // Line
    newGroup.appendChild(createLine(startx, starty, endx, endy, 1));
    midsettarget.appendChild(newGroup);
}

function drawRandom(x) {
    var coords = generateRandomCoordinates(x);
    for (var i = 0; i < coords.length - 1; i++) {
        drawMovement(coords[i].leftToRight, coords[i].frontToBack, coords[i + 1].leftToRight, coords[i + 1].frontToBack);
    }
}

function draw() {
    drawField(0);
    drawRandom(30);
}

// draw();
