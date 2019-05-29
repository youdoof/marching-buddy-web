'use strict';

function init() {
    initializeSliderLabelValues();
    startListening();
    calculateMidsetInformation();
}

function initializeSliderLabelValues() {
    var spans = document.querySelectorAll('p span');
    var ranges = document.querySelectorAll('.custom-range');
    for (var i = 0; i < spans.length; i++) {
        if (i == spans.length - 1) {
            // Counts Slider set to 1
            ranges[i].value = 1;
            spans[i].innerHTML = 1;
        } else {
            // All other Sliders set to 0
            ranges[i].value = 0;
            spans[i].innerHTML = 0;
        }
    }
}

let RANGE_START_LRSTEPS = ".startLRSteps";
let RANGE_START_YARDLINE = ".startYardLine";
let RANGE_START_FBSTEPS = ".startFBSteps";

let RANGE_END_LRSTEPS = ".endLRSteps";
let RANGE_END_YARDLINE = ".endYardLine";
let RANGE_END_FBSTEPS = ".endFBSteps";

let RANGE_COUNTS_SLIDER = ".countsSlider";

let HASH_TERM_0_FRONT_BACK = ["Front", "Back"];
let HASH_TERM_1_HOME_VISITOR = ["Home", "Visitor"];
let SIDE_TERM_0_SIDE_1_SIDE_2 = ["Side 1", "Side 2"];
let SIDE_TERM_1_LEFT_RIGHT = ["Left", "Right"];

let HASH = "hash";
let SIDE = "side";

function startListening() {
    document.addEventListener('input', function (event) {
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
    }, false);

    document.addEventListener('click', function (event) {
        if (event.target.matches('.nightRadio')) {
            updateTheme();
        }
        if (event.target.matches('.dayRadio')) {
            updateTheme();
        }
        if (event.target.matches('.hashFrontBack')) {
            updateTerminology(HASH_TERM_0_FRONT_BACK, HASH);
        }
        if (event.target.matches('.hashHomeVisitor')) {
            updateTerminology(HASH_TERM_1_HOME_VISITOR, HASH);
        }
        if (event.target.matches('.sideOneTwo')) {
            updateTerminology(SIDE_TERM_0_SIDE_1_SIDE_2, SIDE);
        }
        if (event.target.matches('.sideLeftRight')) {
            updateTerminology(SIDE_TERM_1_LEFT_RIGHT, SIDE);
        }

    }, false);
}

function updateTheme() {
    var body = document.querySelector('body');
    body.classList.toggle('night');
    body.classList.toggle('day');
}

function updateTerminology(terms, hashSide) {
    var targetTerms = document.querySelectorAll(`.${hashSide}Term`);
    for (var i = 0; i < targetTerms.length; i++) {
        targetTerms[i].innerHTML = terms[i % 2];
    }
}

function calculateMidsetInformation() {
    var startInput = new Input(START);
    var endInput = new Input(END);
    var f = new Field();

    var startCoordinate = createCoordinateFromInput(startInput, f);
    var endCoordinate = createCoordinateFromInput(endInput, f);
    var midCoordinate = getMidSetCoordinate(startCoordinate, endCoordinate);

    var midsetTextHolder = document.querySelector('.midset');
    midsetTextHolder.innerHTML = midCoordinate.printCoordinate(f);
    var stepsizeTextHolder = document.querySelector('.step-size');
    stepsizeTextHolder.innerHTML = getStepSize(startCoordinate, endCoordinate, getCounts());
    var crossCountHolder = document.querySelector('.cross-count');
    crossCountHolder.innerHTML = printYardLineCrossInfo(startCoordinate, endCoordinate, getCounts(), f);
}

function copyEndToStart() {
    var end = new Input(END);
    // OnInOutRadio
    copyRadioValue('sOnInOutRadio', end.onInOut);
    // LRSteps
    copySliderValue(RANGE_START_LRSTEPS, end.stepsLR);
    // YardLine
    copySliderValue(RANGE_START_YARDLINE, end.yardLine);
    // SideRadio
    copyRadioValue('sSideRadio', end.side);
    // OnInFrontBehindRadio
    copyRadioValue('sOnInFrontBehindRadio', end.onInFrontBehind);
    // FBSteps
    copySliderValue(RANGE_START_FBSTEPS, end.stepsFB);
    // FrontBackRadio
    copyRadioValue('sFrontBackRadio', end.frontBack);
    // HashSidelineRadio
    copyRadioValue('sHashSidelineRadio', end.hashSideline);
}

function copySliderValue(sliderFamily, desiredValue) {
    var fam = document.querySelectorAll(sliderFamily);
    fam[0].innerHTML = desiredValue;
    fam[1].value = desiredValue;
}

// Find the labels for the radio buttons and click them
function copyRadioValue(radioFamily, desiredValue) {
    var labels = document.querySelectorAll(`.${radioFamily}`);
    labels[desiredValue].click();
}

init();
