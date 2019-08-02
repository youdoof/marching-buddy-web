/*
 * For these to work, we need to have a module.exports object in each
 * file that we want to test. But then to have that we'd lose functionality
 * in the browser... Need to re-evaluate if this is the right way to 
 * do these things.
 * 
 * Better way might be to add these all at the bottom of each js file.
 */

var wish = require('wish');
var deepEqual = require('deep-equal');
var translate = require('./translate.js');

describe('coordinateLRToSVGX()', function() {
    it('Left-Most Point', function() {
        var result = translate.coordinateLRToSVGX(-84);
        wish(result === 0);
    });
    it('Right-Most Point', function () {
        var result = translate.coordinateLRToSVGX(84);
        wish(result === 2688);
    });
});

describe('coordinateFBtoSVGY()', function() {
    it('Upper-Most Point', function() {
        var result = translate.coordinateFBToSVGY(58);
        wish(result === 0);
    });
    it('Lower-Most Point', function () {
        var result = translate.coordinateFBToSVGY(-58);
        wish(result === 1856);
    });
});

describe('translateCoordinateToSVG()', function() {
    it('Translates Top Left', function() {
        var result = translate.translateCoordinateToSVG(-84, 58);
        wish(deepEqual(result, [0,0]));
    });
    it('Tranlates Bottom Right', function () {
        var result = translate.translateCoordinateToSVG(84, -58);
        wish(deepEqual(result, [2688, 1856]));
    });
});
