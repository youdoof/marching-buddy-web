'use strict';

function init() {
    getMidset();
}

function getMidset() {
    var startInput = new Input(START);
    var endInput = new Input(END);
    var f = new Field();

    var startCoordinate = new Coordinate(inputLeftToRight(startInput), inputFrontToBack(startInput,f));
    var endCoordinate = new Coordinate(inputLeftToRight(endInput), inputFrontToBack(endInput,f));
    var midCoordinate = getMidSetCoordinate(startCoordinate, endCoordinate);
    var midsetTextHolder = document.querySelector(".midset");
    midsetTextHolder.innerHTML = midCoordinate.printCoordinate(f);
    var stepsizeTextHolder = document.querySelector('.stepsize');
    stepsizeTextHolder.innerHTML = getStepSize(startCoordinate,endCoordinate, endInput.counts);
}

init();