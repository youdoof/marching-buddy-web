'use strict';

function init() {
    initializeSliderLabelValues();
    // setupSliderInteractivity();
    startListening();
}

function initializeSliderLabelValues() {
    var spans = document.querySelectorAll('p span');
    var ranges = document.querySelectorAll('.custom-range');
    for (var i = 0; i < spans.length; i++) {
        spans[i].innerHTML = ranges[i].value;
    }
}

let RANGE_START_LRSTEPS = ".startLRSteps";
let RANGE_START_YARDLINE = ".startYardLine";
let RANGE_START_FBSTEPS = ".startFBSteps";

let RANGE_END_LRSTEPS = ".endLRSteps";
let RANGE_END_YARDLINE = ".endYardLine";
let RANGE_END_FBSTEPS = ".endFBSteps";

let RANGE_COUNTS_SLIDER = ".countsSlider";

function startListening() {
    document.addEventListener('input', function (event) {
        if (event.target.matches('.custom-range')) {
            if (event.target.matches(RANGE_START_LRSTEPS)) {
                document.querySelector(RANGE_START_LRSTEPS).innerHTML = event.target.value;
            }
            if (event.target.matches(RANGE_START_YARDLINE)) {
                document.querySelector(RANGE_START_YARDLINE).innerHTML = event.target.value;
            }
            if (event.target.matches(RANGE_START_FBSTEPS)) {
                document.querySelector(RANGE_START_FBSTEPS).innerHTML = event.target.value;
            }
            if (event.target.matches(RANGE_END_LRSTEPS)) {
                document.querySelector(RANGE_END_LRSTEPS).innerHTML = event.target.value;
            }
            if (event.target.matches(RANGE_END_YARDLINE)) {
                document.querySelector(RANGE_END_YARDLINE).innerHTML = event.target.value;
            }
            if (event.target.matches(RANGE_END_FBSTEPS)) {
                document.querySelector(RANGE_END_FBSTEPS).innerHTML = event.target.value;
            }
            if (event.target.matches(RANGE_COUNTS_SLIDER)) {
                document.querySelector(RANGE_COUNTS_SLIDER).innerHTML = event.target.value;
            }
        }
    }, false);

    document.addEventListener('click', function (event) {
        if (event.target.matches('.nightRadio')) {
            updateTheme();
        }
        if (event.target.matches('.dayRadio')) {
            updateTheme();
        }
        if (event.target.matches('.hashFrontBack')) {
            updateTerminology(FRONT_BACK, HASH);
        }
        if (event.target.matches('.hashHomeVisitor')) {
            updateTerminology(HOME_VISITOR, HASH);
        }
        if (event.target.matches('.sideOneTwo')) {
            updateTerminology(SIDE_ONE_SIDE_TWO, SIDE);
        }
        if (event.target.matches('.sideLeftRight')) {
            updateTerminology(LEFT_RIGHT, SIDE);
        }
    }, false);
}

function updateTheme() {
    var body = document.querySelector('body');
    body.classList.toggle('night');
    body.classList.toggle('day');
}

let FRONT_BACK = ["Front", "Back"];
let HOME_VISITOR = ["Home", "Visitor"];
let SIDE_ONE_SIDE_TWO = ["Side One", "Side Two"];
let LEFT_RIGHT = ["Left", "Right"];

let HASH = "hash";
let SIDE = "side";

function updateTerminology(terms, hashSide) {
    var targetTerms = document.querySelectorAll(`.${hashSide}Term`);
    for (var i = 0; i < targetTerms.length; i++) {
        targetTerms[i].innerHTML = terms[i % 2];
    }
}

function copyEndToStart() {
    // OnInOutRadio
    
    // LRSteps

    // YardLine

    // SideRadio

    // OnInFrontBehindRadio

    // FBSteps

    // FrontBackRadio

    // HashSidelineRadio

}

init();
