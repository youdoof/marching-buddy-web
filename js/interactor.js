'use strict';

function init() {
    initializeSliderLabelValues();
    startListening();
    calculateMidsetInformation();
}

/**
 * Calls methods to set the starting values for sliders on the web page
 * @function initializeSliderLabelValues
 * @see resetStartSliders
 * @see resetEndSliders
 * @see resetCountSlider
 */
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

    setRangeFamilyInnerHTMLAndValue(rangeLRSteps, RANGE_STEPS_DEFAULT_VALUE);
    setRangeFamilyInnerHTMLAndValue(rangeYardLine, RANGE_YARDLINE_DEFAULT_VALUE);
    setRangeFamilyInnerHTMLAndValue(rangeFBSteps, RANGE_STEPS_DEFAULT_VALUE);
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
 * @see setRangeFamilyInnerHTMLAndValue
 */
function resetCountSlider() {
    var rangeCounts = document.querySelectorAll(RANGE_COUNTS_SLIDER);
    setRangeFamilyInnerHTMLAndValue(rangeCounts, RANGE_COUNTS_DEFAULT_VALUE);
}

/**
 * Sets the innerHTML and Value of a range family to a specified value
 * @function setRangeFamilyInnerHTMLAndValue
 * @param {Array} targetRangeFamily querySelectorAll array of the range family whose value needs to be set
 * @param {Number} number value to set the range and span to display
 */
function setRangeFamilyInnerHTMLAndValue(targetRangeFamily, number) {
    targetRangeFamily[0].innerHTML = number;
    targetRangeFamily[1].value = number;
}

// Selectors for Range/Slider families, finds the span and custom range input
const RANGE_START_LRSTEPS = ".startLRSteps";
const RANGE_START_YARDLINE = ".startYardLine";
const RANGE_START_FBSTEPS = ".startFBSteps";
const RANGE_END_LRSTEPS = ".endLRSteps";
const RANGE_END_YARDLINE = ".endYardLine";
const RANGE_END_FBSTEPS = ".endFBSteps";
const RANGE_COUNTS_SLIDER = ".countsSlider";

// Terminology for updating the GUI and output
const HASH_TERM_0_FRONT_BACK = ["Front", "Back"];
const HASH_TERM_1_HOME_VISITOR = ["Home", "Visitor"];
const SIDE_TERM_0_SIDE_1_SIDE_2 = ["Side 1", "Side 2"];
const SIDE_TERM_1_LEFT_RIGHT = ["Left", "Right"];

// Used in updateTerminology, pass in the name of what you want to update
const HASH = "hash";
const SIDE = "side";

/**
 * Listens for input and click events in the DOM, used in updating GUI and input settings
 * @function startListening
 */
function startListening() {
    // Listen for input events and update the HTML to display the value of each slider on the screen
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

    // Listen for click events matching different radio button families and update GUI elements accordingly
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
 * @see startListening
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
 * @see startListening
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
 * @function updateTerminology
 * @see startListening
 * @param {Array<Number>} terms array of terminology to be updated
 * @param {String} hashSide selector either HASH or SIDE
 */
function updateTerminology(terms, hashSide) {
    var targetTerms = document.querySelectorAll(`.${hashSide}Term`);
    for (var i = 0; i < targetTerms.length; i++) {
        targetTerms[i].innerHTML = terms[i % 2];
    }
}

// Spans for displaying the calculated information to the user
var midsetTextDisplay = document.querySelector('.midset');
var stepSizeDisplay = document.querySelector('.step-size');
var crossCountDisplay = document.querySelector('.cross-count');

/**
 * Main method of the project. Presents all calculated information to the user in 
 * the proper elements of the webpage. Method called when user presses the
 * calculate midset button.
 * @function calculateMidsetInformation
 */
function calculateMidsetInformation() {
    // Get input and field information
    var startInput = new Input(START);
    var endInput = new Input(END);
    var f = new Field();

    // Create start, end, and middle coordinates
    var startCoordinate = createCoordinateFromInput(startInput, f);
    var endCoordinate = createCoordinateFromInput(endInput, f);
    var midCoordinate = getMidSetCoordinate(startCoordinate, endCoordinate);

    // Dispaly calculated information throughout the page
    midsetTextDisplay.innerHTML = midCoordinate.printCoordinate(f);
    stepSizeDisplay.innerHTML = getStepSize(startCoordinate, endCoordinate, getCounts());
    crossCountDisplay.innerHTML = printYardLineCrossInfo(startCoordinate, endCoordinate, getCounts(), f);
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
}

/**
 * Sets the given slider family's value to the desired value given
 * @function copySliderValue
 * @param {String} sliderFamily selector name of the family of sliders to be copied
 * @param {Number} desiredValue value to set the slider family to
 */
function copySliderValue(sliderFamily, desiredValue) {
    var fam = document.querySelectorAll(sliderFamily);
    fam[0].innerHTML = desiredValue;
    fam[1].value = desiredValue;
}

/**
 * Activates the radio button in the given radio button family determined by the desired value given
 * @function setRadioValue
 * @param {String} radioFamily selector name of the family of radio buttons to be copied
 * @param {Number} desiredValue radio button to be activated
 */
function setRadioValue(radioFamily, desiredValue) {
    var labels = document.querySelectorAll(`.${radioFamily}`);
    labels[desiredValue].click();
}

// Run init to get the page initialized with information
init();
