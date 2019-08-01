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

SVG = {
    createCanvas: function (width, height, container) {
        var container = document.querySelector(container);
        var canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        container.appendChild(canvas);
        return canvas;
    },
    createLine: function (x1, y1, x2, y2, width) {
        var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', width);
        return line;
    },
    createGroup: function (className) {
        var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', className);
        return group;
    },
    createCircle: function (x, y) {
        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', '4');
        return circle;
    }
}

function init() {
    drawField(0);
    // drawField(1);
    // -13.75, 20.25
    drawMovement(-13.75, 20.25, 11, 12.5);
    // 11, 12.5
}

/**
 * Creates various groups within parent svg to draw parts of the field
 * @function setupGroups
 * @param {Object} parent Main parent svg within which to create seperate groups
 */
function setupGroups(parent) {
    parent.appendChild(SVG.createGroup('yardlines'));
    parent.appendChild(SVG.createGroup('hashes'));
    parent.appendChild(SVG.createGroup('ticks'));
    parent.appendChild(SVG.createGroup('sidelines'));
    parent.appendChild(SVG.createGroup('midset-target'));
}

/**
 * Draws yard lines from sideline to sideline using given x coordinate
 * @function drawYardLines
 * @param {Object} targetGroup yardlines group of the svg
 * @param {Number} x x coordinate to draw from
 */
function drawYardLines(targetGroup, x) {
    targetGroup.appendChild(SVG.createLine(x, BACK_SIDE_LINE_SVG, x, FRONT_SIDE_LINE_SVG, LINE_STROKE_WIDTH));
}
/**
 * drawHashes takes the hash type and appropriately draws hashes on the field svg
 * @function drawHashes
 * @param {Object} targetGroup hashes group of the svg
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
        targetGroup.appendChild(SVG.createLine(x, backHash, x + halfHash, backHash, LINE_STROKE_WIDTH));
        targetGroup.appendChild(SVG.createLine(x, frontHash, x + halfHash, frontHash, LINE_STROKE_WIDTH));
    } else if (x == SIDE_TWO_YARD_LINE_SVG) {
        targetGroup.appendChild(SVG.createLine(x - halfHash, backHash, x, backHash, LINE_STROKE_WIDTH));
        targetGroup.appendChild(SVG.createLine(x - halfHash, frontHash, x, frontHash, LINE_STROKE_WIDTH));
    } else {
        targetGroup.appendChild(SVG.createLine(x - halfHash, backHash, x + halfHash, backHash, LINE_STROKE_WIDTH));
        targetGroup.appendChild(SVG.createLine(x - halfHash, frontHash, x + halfHash, frontHash, LINE_STROKE_WIDTH));
    }
}

/**
 * Draws the tick marks in between each yard line. At the hash and at the side line.
 * @function drawTicks
 * @param {Object} targetGroup desired group to add the drawn ticks to in the parent SVG
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
            targetGroup.appendChild(SVG.createLine(offset, backWithOffset, offset, backWithOffset + TICK_LENGTH, LINE_STROKE_WIDTH));
            targetGroup.appendChild(SVG.createLine(offset, backHash, offset, backHash - TICK_LENGTH, LINE_STROKE_WIDTH));
            targetGroup.appendChild(SVG.createLine(offset, frontHash, offset, frontHash + TICK_LENGTH, LINE_STROKE_WIDTH));
            targetGroup.appendChild(SVG.createLine(offset, frontWithOffset, offset, frontWithOffset - TICK_LENGTH, LINE_STROKE_WIDTH));
        }
    }
}

/**
 * Draws both front and back sidelines
 * @function drawSidelines
 * @param {Object} targetGroup group to add sidelines to in the parent svg
 */
function drawSidelines(targetGroup) {
    targetGroup.appendChild(SVG.createLine(SIDE_ONE_YARD_LINE_SVG, BACK_SIDE_LINE_SVG, SIDE_TWO_YARD_LINE_SVG, BACK_SIDE_LINE_SVG, LINE_STROKE_WIDTH));
    targetGroup.appendChild(SVG.createLine(SIDE_ONE_YARD_LINE_SVG, FRONT_SIDE_LINE_SVG, SIDE_TWO_YARD_LINE_SVG, FRONT_SIDE_LINE_SVG, LINE_STROKE_WIDTH));
}

/**
 * Draws the field using subfunctions to gather individual pieces into one svg
 * @function drawField
 * @param {Number} hashType 0 - High School, 1 - NCAA/College
 */
function drawField(hashType) {
    var canvas = SVG.createCanvas(2688, 1856, '.svg-target');
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

function drawMovement(x1, y1, x2, y2) {
    var midsettarget = document.querySelector('.midset-target');
    var startx = coordinateLRToSVGX(x1);
    var starty = coordinateFBToSVGY(y1);
    var endx = coordinateLRToSVGX(x2);
    var endy = coordinateFBToSVGY(y2);
    // Circles
    midsettarget.appendChild(SVG.createCircle(startx, starty));
    midsettarget.appendChild(SVG.createCircle(endx, endy));
    // Line
    midsettarget.appendChild(SVG.createLine(startx, starty, endx, endy, 1));
}

init();
