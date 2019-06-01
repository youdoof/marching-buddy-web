'use strict';

function init() {
    initializeSliderLabelValues();
    startListening();
    calculateMidsetInformation();
}

function initializeSliderLabelValues() {
    resetStartSliders();
    resetEndSliders();
    resetCountSlider();
}

/**
 * Default value for Yard Line Range sliders
 * @const {Number}
 */
const RANGE_YARDLINE_DEFAULT_VALUE = 50;

/**
 * Default value for Steps Range sliders
 * @const {Number}
 */
const RANGE_STEPS_DEFAULT_VALUE = 0;

/**
 * Default value for Counts Range slider
 * @const {Number}
 */
const RANGE_COUNTS_DEFAULT_VALUE = 8;

/**
 * Resets sliders to their default values
 * @function resetInputSliders
 * @param {String} LRSteps class name for LRSteps slider
 * @param {String} YardLine class name for YardLine slider
 * @param {String} FBSteps class name for FBSteps slider
 */
function resetInputSliders(LRSteps, YardLine, FBSteps) {
    var rangeLRSteps = document.querySelectorAll(LRSteps);
    var rangeYardLine = document.querySelectorAll(YardLine);
    var rangeFBSteps = document.querySelectorAll(FBSteps);

    setInnerHTMLAndValue(rangeLRSteps, RANGE_STEPS_DEFAULT_VALUE);
    setInnerHTMLAndValue(rangeYardLine, RANGE_YARDLINE_DEFAULT_VALUE);
    setInnerHTMLAndValue(rangeFBSteps, RANGE_STEPS_DEFAULT_VALUE);
}

/**
 * @function resetStartSliders
 * @see resetInputSliders
 */
function resetStartSliders() {
    resetInputSliders(RANGE_START_LRSTEPS, RANGE_START_YARDLINE, RANGE_START_FBSTEPS);
}

/**
 * @function resetEndSliders
 * @see resetInputSliders
 */
function resetEndSliders() {
    resetInputSliders(RANGE_END_LRSTEPS, RANGE_END_YARDLINE, RANGE_END_FBSTEPS);
}

/**
 * Resets the Count slider to its default value of RANGE_COUNTS_DEFAULT_VALUE
 * @function resetCountSlider
 * @see setInnerHTMLAndValue
 */
function resetCountSlider() {
    var rangeCounts = document.querySelectorAll(RANGE_COUNTS_SLIDER);
    setInnerHTMLAndValue(rangeCounts, RANGE_COUNTS_DEFAULT_VALUE);
}

/**
 * Sets the innerHTML and Value of a range family to a specified value
 * @function setInnerHTMLAndValue
 * @param {Array} targetRangeFamily querySelectorAll array of the range family whose value needs to be set
 * @param {Number} number value to set the range and span to display
 */
function setInnerHTMLAndValue(targetRangeFamily, number) {
    targetRangeFamily[0].innerHTML = number;
    targetRangeFamily[1].value = number;
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

/**
 * Listens for input and click events in the DOM
 * @function startListening
 */
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
            lightsOff();
        }
        if (event.target.matches('.dayRadio')) {
            lightsOn();
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

/**
 * Changes theme from Night to Day
 * @function lightsOn
 */
function lightsOn() {
    var body = document.querySelector('body');
    if (body.classList.contains('night')) {
        body.classList.remove('night');
        body.classList.add('day');
    }
}

/**
 * Changes theme from Day to Night
 * @function lightsOff
 */
function lightsOff() {
    var body = document.querySelector('body');
    if (body.classList.contains('day')) {
        body.classList.remove('day');
        body.classList.add('night');
    }
}

/**
 * Updates terminology in GUI from settings
 * @param {Array<Number>} terms array of terminology to be updated
 * @param {String} hashSide selector either HASH or SIDE
 */
function updateTerminology(terms, hashSide) {
    var targetTerms = document.querySelectorAll(`.${hashSide}Term`);
    for (var i = 0; i < targetTerms.length; i++) {
        targetTerms[i].innerHTML = terms[i % 2];
    }
}

/**
 * Main method of the project. Presents all calculated information to the user in 
 * the proper elements of the webpage.
 * @function calculateMidsetInformation
 */
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

/**
 * Copies the values of the Ending Coordinate to the Starting Coordinate
 * @function copyEndToStart
 */
function copyEndToStart() {
    var end = new Input(END);
    // OnInOutRadio
    setRadioValue('sOnInOutRadio', end.onInOut);
    // LRSteps
    copySliderValue(RANGE_START_LRSTEPS, end.stepsLR);
    // YardLine
    copySliderValue(RANGE_START_YARDLINE, end.yardLine);
    // SideRadio
    setRadioValue('sSideRadio', end.side);
    // OnInFrontBehindRadio
    setRadioValue('sOnInFrontBehindRadio', end.onInFrontBehind);
    // FBSteps
    copySliderValue(RANGE_START_FBSTEPS, end.stepsFB);
    // FrontBackRadio
    setRadioValue('sFrontBackRadio', end.frontBack);
    // HashSidelineRadio
    setRadioValue('sHashSidelineRadio', end.hashSideline);

    // Might reset the values for the end set after copying.
}

/**
 * Sets the given slider family's value to the desired value given
 * @param {String} sliderFamily selector name of the family of sliders to be copied
 * @param {Number} desiredValue value to set the slider family to
 */
function copySliderValue(sliderFamily, desiredValue) {
    var fam = document.querySelectorAll(sliderFamily);
    fam[0].innerHTML = desiredValue;
    fam[1].value = desiredValue;
}

/**
 * Activates the radio button in the given radio button family to the desired value given
 * @param {String} radioFamily selector name of the family of radio buttons to be copied
 * @param {Number} desiredValue radio button to be activated
 */
function setRadioValue(radioFamily, desiredValue) {
    var labels = document.querySelectorAll(`.${radioFamily}`);
    labels[desiredValue].click();
}

init();
