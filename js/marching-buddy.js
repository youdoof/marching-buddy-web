'use strict';
//
var f = new Field(0, 0, 0);
for (var i = -44; i < 45; i++) {
    console.log(outputFrontToBack(i, f));
}

for (var i = -90; i < 91; i++) {
    console.log(outputLeftToRight(i, f));
}

var c = new Coordinate(10, 10);
console.log(c.printCoordinate(f));
var d = new Coordinate(25, -32);
var e = getMidSetCoordinate(c, d);

var paragraph = document.querySelector("p");
paragraph.innerHTML = e.printCoordinate(f);
