const BACK_SIDE_LINE_SVG = translateYCoordinate(42); // 256
const FRONT_SIDE_LINE_SVG = translateYCoordinate(-42); // 1600
const SIDE_ONE_YARD_LINE_SVG = translateXCoordinate(-80); // 64
const SIDE_TWO_YARD_LINE_SVG = translateXCoordinate(80); // 2624
const HS_BACK_HASH_SVG = translateYCoordinate(14); // 704
const HS_FRONT_HASH_SVG = translateYCoordinate(-14); // 1152
const NCAA_BACK_HASH_SVG = translateYCoordinate(10); // 768
const NCAA_FRONT_HASH_SVG = translateYCoordinate(-10); // 1088

SVG = {
    createCanvas: function (width, height, container) {
        var container = document.querySelector(container);
        var canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        container.appendChild(canvas);
        return canvas;
    },
    createLine: function (x1, y1, x2, y2) {
        var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', '1');
        return line;
    },
    createGroup: function (className) {
        var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', className);
        return g;
    }
}

function setupGroups(parent) {
    parent.appendChild(SVG.createGroup('yardlines'));
    parent.appendChild(SVG.createGroup('hashes'));
    parent.appendChild(SVG.createGroup('sidelines'));
}

function drawYardLines(targetGroup, x) {
    targetGroup.appendChild(SVG.createLine(x, BACK_SIDE_LINE_SVG, x, FRONT_SIDE_LINE_SVG));
}
/**
 * drawHashes takes the hash type and appropriately draws hashes on the field svg
 *
 * @param {Object} targetGroup hashes group of the svg
 * @param {Number} hashType 0 - High School, 1 - NCAA / College
 * @param {Number} x 
 */
function drawHashes(targetGroup, hashType, x) {
    if (hashType == 0) {
        var backHash = HS_BACK_HASH_SVG;
        var frontHash = HS_FRONT_HASH_SVG;
    } else {
        var backHash = NCAA_BACK_HASH_SVG;
        var frontHash = NCAA_FRONT_HASH_SVG;
    }
    if (x == 64) {
        targetGroup.appendChild(SVG.createLine(x, backHash, x + 8, backHash));
        targetGroup.appendChild(SVG.createLine(x, frontHash, x + 8, frontHash));
    } else if (x == 2624) {
        targetGroup.appendChild(SVG.createLine(x - 8, backHash, x, backHash));
        targetGroup.appendChild(SVG.createLine(x - 8, frontHash, x, frontHash));
    } else {
        targetGroup.appendChild(SVG.createLine(x - 8, backHash, x + 8, backHash));
        targetGroup.appendChild(SVG.createLine(x - 8, frontHash, x + 8, frontHash));
    }
}

/**
 *
 *
 * @param {Object} targetGroup
 */
function drawSidelines(targetGroup) {
    targetGroup.appendChild(SVG.createLine(SIDE_ONE_YARD_LINE_SVG, BACK_SIDE_LINE_SVG, SIDE_TWO_YARD_LINE_SVG, BACK_SIDE_LINE_SVG));
    targetGroup.appendChild(SVG.createLine(SIDE_ONE_YARD_LINE_SVG, FRONT_SIDE_LINE_SVG, SIDE_TWO_YARD_LINE_SVG, FRONT_SIDE_LINE_SVG));
}

function drawField(hashType) {
    var canvas = SVG.createCanvas(2688, 1856, '.svg-target');
    setupGroups(canvas);
    var yardlinegroup = document.querySelector('.yardlines');
    var hashesgroup = document.querySelector('.hashes');
    var sidelinesgroup = document.querySelector('.sidelines');
    // var c = document.querySelector('.hashes');
    // var yTop = 704;
    // var yBottom = 1152;

    for (var i = 0; i <= 20; i++) {
        var x = 64 + (i * (8 * 16));
        // canvas.appendChild(SVG.createLine(x, 256, x, 1600));
        drawYardLines(yardlinegroup, x);
        drawHashes(hashesgroup, hashType, x);
    }
    drawSidelines(sidelinesgroup);
}
