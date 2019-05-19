'use strict';
//
var f = new Field(0, 0, 0);

var c = new Coordinate(10, 10);
var d = new Coordinate(25, -32);
var e = getMidSetCoordinate(c, d);

var paragraph = document.querySelector(".foo");
paragraph.innerHTML = e.printCoordinate(f);

// -----------------------------

// Get Start Input
var startLR = inputLeftToRight(2,2,1,0); // stepsLR, onInOut, side, yardline

var startFB = inputFrontToBack(16, 2,0,0);

var g = new Coordinate(startLR, startFB);
