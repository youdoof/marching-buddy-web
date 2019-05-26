'use strict';

function init() {
    initializeSliderLabelValues();
    startListening();
    getMidset();
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
        updatePreview();
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
        if (event.target.matches('label') || event.target.matches('input')) {
            updatePreview();
        }
    }, false);
    // document.addEventListener('mouseup', function (event) {
    //     if (event.target.matches('label')) {
    //         updatePreview();
    //     }
    // }, false);
}

function updatePreview() {
    var startInput = new Input(START);
    var endInput = new Input(END);
    var f = new Field();

    var startCoordinate = new Coordinate(inputLeftToRight(startInput), inputFrontToBack(startInput,f));
    var endCoordinate = new Coordinate(inputLeftToRight(endInput), inputFrontToBack(endInput,f));

    var previews = document.querySelectorAll('.preview');
    previews[0].innerHTML = startCoordinate.printCoordinate(f);
    previews[1].innerHTML = endCoordinate.printCoordinate(f);
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

function getMidset() {
    var startInput = new Input(START);
    var endInput = new Input(END);
    var f = new Field();

    var startCoordinate = new Coordinate(inputLeftToRight(startInput), inputFrontToBack(startInput,f));
    var endCoordinate = new Coordinate(inputLeftToRight(endInput), inputFrontToBack(endInput,f));
    console.log(startCoordinate.printCoordinate(f));
    console.log(endCoordinate.printCoordinate(f));
    var midCoordinate = getMidSetCoordinate(startCoordinate, endCoordinate);
    var midsetTextHolder = document.querySelector(".midset");
    midsetTextHolder.innerHTML = midCoordinate.printCoordinate(f);
    var stepsizeTextHolder = document.querySelector('.stepsize');
    stepsizeTextHolder.innerHTML = getStepSize(startCoordinate,endCoordinate, endInput.counts);
}

function copyEndToStart() {
    /*
        Radio Buttons:
        Old set buttons need:
            label needs class 'active' removed.
            input needs attribute 'checked' removed.
        New set buttons need:
            label needs class 'active' added.
            input needs attribute 'checked' added.
    */

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

function clearAndSetRadioButton(radioFamily, desiredValue) {
    var fam = document.querySelectorAll(`input[name=${radioFamily}`);
    for (var i = 0; i < fam.length; i++) {
        if (fam[i].hasAttribute('checked')) {
            fam[i].removeAttribute('checked');
            break;
        }
    }
    fam[desiredValue].setAttribute('checked', '');
}

function clearAndSetLabel(radioFamily, desiredValue) {
    var fam = document.querySelectorAll(`.${radioFamily}`);
    for (var i = 0; i < fam.length; i++) {
        if (fam[i].classList.contains('active')) {
            fam[i].classList.remove('active');
            break;
        }
    }
    fam[desiredValue].classList.add('active');
}

function copyRadioValue(radioFamily, desiredValue) {
    var inputFam = document.querySelectorAll(`input[name=${radioFamily}`);
    var labelFam = document.querySelectorAll(`.${radioFamily}`);

    for (var i = 0; i < inputFam.length; i++) {
        if (inputFam[i].hasAttribute('checked')) {
            inputFam[i].removeAttribute('checked');
        }
        if (labelFam[i].classList.contains('active')) {
            labelFam[i].classList.remove('active');
        }
        if (labelFam[i].classList.contains('focus')) {
            labelFam[i].classList.remove('focus');
        }
    }
    inputFam[desiredValue].setAttribute('checked','');
    labelFam[desiredValue].classList.add('focus');
    labelFam[desiredValue].classList.add('active');
}

init();
