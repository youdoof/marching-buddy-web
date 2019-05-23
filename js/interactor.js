'use strict';

function init() {
    setupSliderInteractivity();
    startListening();
}

// Temporary solution, needs to be cleaned up
// Makes the sliders interact and update values on the webpage
function setupSliderInteractivity() {
    var spans = document.querySelectorAll('p span');
    var ranges = document.querySelectorAll('.custom-range');

    spans[0].innerHTML = ranges[0].value;
    spans[1].innerHTML = ranges[1].value;
    spans[2].innerHTML = ranges[2].value;
    spans[3].innerHTML = ranges[3].value;
    spans[4].innerHTML = ranges[4].value;
    spans[5].innerHTML = ranges[5].value;
    spans[6].innerHTML = ranges[6].value;

    ranges[0].addEventListener('input', function () {
        spans[0].innerHTML = ranges[0].value;
    }, false);

    ranges[1].addEventListener('input', function () {
        spans[1].innerHTML = ranges[1].value;
    }, false);

    ranges[2].addEventListener('input', function () {
        spans[2].innerHTML = ranges[2].value;
    }, false);

    ranges[3].addEventListener('input', function () {
        spans[3].innerHTML = ranges[3].value;
    }, false);

    ranges[4].addEventListener('input', function () {
        spans[4].innerHTML = ranges[4].value;
    }, false);

    ranges[5].addEventListener('input', function () {
        spans[5].innerHTML = ranges[5].value;
    }, false);

    ranges[6].addEventListener('input', function () {
        spans[6].innerHTML = ranges[6].value;
    }, false);
}

// Work in progress
function startListening() {
    // document.addEventListener('input', function (event) {
    //     if (event.target.matches('.custom-range')) {
    //         // Modularize the input events for each unique slider/span combo.
    //         // Maybe use a css class for each pair?
    //         console.log("slider");
    //     }
    // }, false);

    document.addEventListener('click', function (event) {
        if (event.target.matches('.hashFrontBack')) {
            updateTerminology(FRONT_BACK, HASH);
        }
        if (event.target.matches('.hashHomeVisitor')) {
            updateTerminology(HOME_VISITOR, HASH);
        }
        if (event.target.matches('.sideOneTwo')) {
            updateTerminology(SIDE_ONE_TWO, SIDE);
        }
        if (event.target.matches('.sideLeftRight')) {
            updateTerminology(LEFT_RIGHT, SIDE);
        }
    }, false);
}

let FRONT_BACK = ["Front", "Back"];
let HOME_VISITOR = ["Home", "Visitor"];
let SIDE_ONE_TWO = ["Side One", "Side Two"];
let LEFT_RIGHT = ["Left", "Right"];

let HASH = "hash";
let SIDE = "side";

function updateTerminology(terms, hashSide) {
    // Goes through document and updates terminology
    var targetTerms = document.querySelectorAll(`.${hashSide}Term`);
    for (var i = 0; i < targetTerms.length; i++) {
        targetTerms[i].innerHTML = terms[i % 2];
    }
}

function copyEndToStart() {
    // Walk through and update each input area to be the same as the end coordinates.
}

init();
