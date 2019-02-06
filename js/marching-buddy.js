'use strict';
//
var f = new Field(0, 0, 0);

var c = new Coordinate(10, 10);
var d = new Coordinate(25, -32);
var e = getMidSetCoordinate(c, d);

var paragraph = document.querySelector("p");
paragraph.innerHTML = e.printCoordinate(f);
