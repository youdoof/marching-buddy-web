'use strict';
//
var f = new Field();

var c = new Coordinate(10, 10);
var d = new Coordinate(25, -32);
var e = getMidSetCoordinate(c, d);

var paragraph = document.querySelector(".foo");
paragraph.innerHTML = e.printCoordinate(f);

// -----------------------------

function getMidset() {
    var startInput = new Input(START);
    var endInput = new Input(END);
    var f = new Field();

    var startCoordinate = new Coordinate(inputLeftToRight(startInput), inputFrontToBack(startInput,f));
    var endCoordinate = new Coordinate(inputLeftToRight(endInput), inputFrontToBack(endInput,f));
    var paragraph = document.querySelector(".foo");
    paragraph.innerHTML = startCoordinate.printCoordinate(f);
}
