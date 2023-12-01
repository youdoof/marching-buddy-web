'use strict';

function init() {
    initializeSettings();
    initializeInputValues();
    updatePreviews();
    startListening();
    calculateMidsetInformation();
}

/**
 * Calls methods to set the starting values for radio buttons and range inputs on the web page
 * @function initializeInputValues
 * @see resetStartRadios
 * @see resetStartRanges
 * @see resetEndRadios
 * @see resetEndRanges
 * @see resetCountRange
 */
function initializeInputValues() {
    resetStartRadios();
    resetStartRanges();
    resetEndRadios();
    resetEndRanges();
    resetCountRange();
}

// Settings Radio Group Names
const THEME_TYPE_RADIO = 'themeTypeRadio';
const FIELD_TYPE_RADIO = 'fieldTypeRadio';
const SIDE_NAME_RADIO = 'sideNameRadio';
const HASH_NAME_RADIO = 'hashNameRadio';

/**
 * Initializes settings values to defaults
 * @function initializeSettings
 * @see setRadioValue
 */
function initializeSettings() {
    setRadioValue(THEME_TYPE_RADIO, 0);
    setRadioValue(FIELD_TYPE_RADIO, 0);
    setRadioValue(SIDE_NAME_RADIO, 0);
    setRadioValue(HASH_NAME_RADIO, 0);
}

/**
 * Default value for Yard Line Range inputs
 * @const {Number}
 */
const RANGE_YARDLINE_DEFAULT_VALUE = 50;

/**
 * Default value for Steps Range inputs
 * @const {Number}
 */
const RANGE_STEPS_DEFAULT_VALUE = 0;

/**
 * Default value for Counts Range input
 * @const {Number}
 */
const RANGE_COUNTS_DEFAULT_VALUE = 8;

/**
 * Resets rangess to their default values
 * @function resetInputRanges
 * @see setRangeFamilyInnerHTMLAndValue
 * @param {String} LRSteps class name for LRSteps Range input
 * @param {String} YardLine class name for YardLine Range input
 * @param {String} FBSteps class name for FBSteps Range input
 */
function resetInputRanges(LRSteps, YardLine, FBSteps) {
    var rangeLRSteps = document.querySelectorAll(LRSteps);
    var rangeYardLine = document.querySelectorAll(YardLine);
    var rangeFBSteps = document.querySelectorAll(FBSteps);

    setRangeFamilyInnerHTMLAndValue(rangeLRSteps, RANGE_STEPS_DEFAULT_VALUE);
    setRangeFamilyInnerHTMLAndValue(rangeYardLine, RANGE_YARDLINE_DEFAULT_VALUE);
    setRangeFamilyInnerHTMLAndValue(rangeFBSteps, RANGE_STEPS_DEFAULT_VALUE);
}

/**
 * @function resetStartRanges
 * @see resetInputRanges
 */
function resetStartRanges() {
    resetInputRanges(START_LRSTEPS_RANGE, START_YARDLINE_RANGE, START_FBSTEPS_RANGE);
}

/**
 * @function resetEndRanges
 * @see resetInputRanges
 */
function resetEndRanges() {
    resetInputRanges(END_LRSTEPS_RANGE, END_YARDLINE_RANGE, END_FBSTEPS_RANGE);
}

/**
 * Resets the Count Range to its default value of RANGE_COUNTS_DEFAULT_VALUE
 * @function resetCountRange
 * @see setRangeFamilyInnerHTMLAndValue
 */
function resetCountRange() {
    var rangeCounts = document.querySelectorAll(COUNTS_RANGE);
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

// Selectors for Range input families, finds the span and custom range input
const START_LRSTEPS_RANGE = ".startLRSteps";
const START_LRSTEPS_PLURAL = ".startLRStepsPlural";
const START_YARDLINE_RANGE = ".startYardLine";
const START_FBSTEPS_RANGE = ".startFBSteps";
const START_FBSTEPS_PLURAL = ".startFBStepsPlural";

const END_LRSTEPS_RANGE = ".endLRSteps";
const END_LRSTEPS_PLURAL = ".endLRStepsPlural";
const END_YARDLINE_RANGE = ".endYardLine";
const END_FBSTEPS_RANGE = ".endFBSteps";
const END_FBSTEPS_PLURAL = ".endFBStepsPlural";

const COUNTS_RANGE = ".countsRange";

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
    // Listen for input events and update the HTML to display the value of each range on the screen
    document.addEventListener('input', function (event) {
        if (event.target.matches(START_LRSTEPS_RANGE)) {
            document.querySelector(START_LRSTEPS_RANGE).innerHTML = event.target.value;
            // Check and update the noun accuracy, steps or step
            if (document.querySelector(START_LRSTEPS_RANGE).innerHTML == "1") {
                document.querySelector(START_LRSTEPS_PLURAL).innerHTML = PLURALITY_STEP;
            } else {
                document.querySelector(START_LRSTEPS_PLURAL).innerHTML = PLURALITY_STEPS;
            }
        }
        if (event.target.matches(START_YARDLINE_RANGE)) {
            document.querySelector(START_YARDLINE_RANGE).innerHTML = event.target.value;
        }
        if (event.target.matches(START_FBSTEPS_RANGE)) {
            document.querySelector(START_FBSTEPS_RANGE).innerHTML = event.target.value;
            // Check and update the noun accuracy, steps or step
            if (document.querySelector(START_FBSTEPS_RANGE).innerHTML == "1") {
                document.querySelector(START_FBSTEPS_PLURAL).innerHTML = PLURALITY_STEP;
            } else {
                document.querySelector(START_FBSTEPS_PLURAL).innerHTML = PLURALITY_STEPS;
            }
        }
        if (event.target.matches(END_LRSTEPS_RANGE)) {
            document.querySelector(END_LRSTEPS_RANGE).innerHTML = event.target.value;
            // Check and update the noun accuracy, steps or step
            if (document.querySelector(END_LRSTEPS_RANGE).innerHTML == "1") {
                document.querySelector(END_LRSTEPS_PLURAL).innerHTML = PLURALITY_STEP;
            } else {
                document.querySelector(END_LRSTEPS_PLURAL).innerHTML = PLURALITY_STEPS;
            }
        }
        if (event.target.matches(END_YARDLINE_RANGE)) {
            document.querySelector(END_YARDLINE_RANGE).innerHTML = event.target.value;
        }
        if (event.target.matches(END_FBSTEPS_RANGE)) {
            document.querySelector(END_FBSTEPS_RANGE).innerHTML = event.target.value;
            // Check and update the noun accuracy, steps or step
            if (document.querySelector(END_FBSTEPS_RANGE).innerHTML == "1") {
                document.querySelector(END_FBSTEPS_PLURAL).innerHTML = PLURALITY_STEP;
            } else {
                document.querySelector(END_FBSTEPS_PLURAL).innerHTML = PLURALITY_STEPS;
            }
        }
        if (event.target.matches(COUNTS_RANGE)) {
            document.querySelector(COUNTS_RANGE).innerHTML = event.target.value;
        }
        updatePreviews();
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
        // i % 2 Sets the html of the first term and then the second as the loop continues.
        targetTerms[i].innerHTML = terms[i % 2];
    }
}

/**
 * Updates the preview text of the input areas, pass in the START or END string to
 * signify which input area to update.
 * @function updatePreview
 * @param {String} startEnd START or END signifying the start or end coordinate preview to update
 */
function updatePreview(startEnd) {
    var f = new Field();
    if (startEnd == START) {
        var sI = new Input(START);
        var sC = createCoordinateFromInput(sI, f);
        startPreviewTextDisplay.innerHTML = sC.printCoordinate(f);
    } else {
        var eI = new Input(END);
        var eC = createCoordinateFromInput(eI, f);
        endPreviewTextDisplay.innerHTML = eC.printCoordinate(f);
    }
}

/**
 * Updates both preview texts for input areas
 * @function updatePreviews
 * @see updatePreview
 */
function updatePreviews() {
    updatePreview(START);
    updatePreview(END);
}

// Spans for displaying the calculated information to the user
var startPreviewTextDisplay = document.querySelector('.startPreview');
var endPreviewTextDisplay = document.querySelector('.endPreview');
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
    // Setup Movement
    var movement = new Movement(startCoordinate, endCoordinate, getCounts());

    // Dispaly calculated information throughout the page
    midsetTextDisplay.innerHTML = movement.printMidSet(f);
    stepSizeDisplay.innerHTML = movement.printStepSize();
    crossCountDisplay.innerHTML = movement.printYardLineCrossInfo(f);
}

const START_ON_IN_OUT_RADIO = 'sOnInOutRadio';
const START_SIDE_RADIO = 'sSideRadio';
const START_ON_INFRONT_BEHIND_RADIO = 'sOnInFrontBehindRadio';
const START_FRONT_BACK_RADIO = 'sFrontBackRadio';
const START_HASH_SIDELINE_RADIO = 'sHashSidelineRadio';

const END_ON_IN_OUT_RADIO = 'eOnInOutRadio';
const END_SIDE_RADIO = 'eSideRadio';
const END_ON_INFRONT_BEHIND_RADIO = 'eOnInFrontBehindRadio';
const END_FRONT_BACK_RADIO = 'eFrontBackRadio';
const END_HASH_SIDELINE_RADIO = 'eHashSidelineRadio';

/**
 * Copies the values of the Ending Coordinate to the Starting Coordinate
 * @function copyEndToStart
 */
function copyEndToStart() {
    var end = new Input(END);
    // OnInOutRadio
    setRadioValue(START_ON_IN_OUT_RADIO, end.onInOut);
    // LRSteps
    copyRangeValue(START_LRSTEPS_RANGE, end.stepsLR);
    // YardLine
    copyRangeValue(START_YARDLINE_RANGE, end.yardLine);
    // SideRadio
    setRadioValue(START_SIDE_RADIO, end.side);
    // OnInFrontBehindRadio
    setRadioValue(START_ON_INFRONT_BEHIND_RADIO, end.onInFrontBehind);
    // FBSteps
    copyRangeValue(START_FBSTEPS_RANGE, end.stepsFB);
    // FrontBackRadio
    setRadioValue(START_FRONT_BACK_RADIO, end.frontBack);
    // HashSidelineRadio
    setRadioValue(START_HASH_SIDELINE_RADIO, end.hashSideline);
}

/**
 * Sets the given range family's value to the desired value given
 * @function copyRangeValue
 * @param {String} rangeFamily selector name of the family of range to be copied
 * @param {Number} desiredValue value to set the range family to
 */
function copyRangeValue(rangeFamily, desiredValue) {
    var fam = document.querySelectorAll(rangeFamily);
    fam[0].innerHTML = desiredValue;
    fam[1].value = desiredValue;
}

/**
 * Activates the label of a radio button in the given radio button family determined by the desired value given.
 * To use, add the radio family name to the class of the label of the radio button
 * @function setRadioValue
 * @param {String} radioFamily selector name of the family of radio buttons to be copied
 * @param {Number} desiredValue radio button to be activated
 */
function setRadioValue(radioFamily, desiredValue) {
    var labels = document.querySelectorAll(`.${radioFamily}`);
    labels[desiredValue].click();
}

function resetStartRadios() {
    // OnInOutRadio
    setRadioValue(START_ON_IN_OUT_RADIO, 0);
    // SideRadio
    setRadioValue(START_SIDE_RADIO, 0);
    // OnInFrontBehindRadio
    setRadioValue(START_ON_INFRONT_BEHIND_RADIO, 0);
    // FrontBackRadio
    setRadioValue(START_FRONT_BACK_RADIO, 0);
    // HashSidelineRadio
    setRadioValue(START_HASH_SIDELINE_RADIO, 0);
}

function resetEndRadios() {
    // OnInOutRadio
    setRadioValue(END_ON_IN_OUT_RADIO, 0);
    // SideRadio
    setRadioValue(END_SIDE_RADIO, 0);
    // OnInFrontBehindRadio
    setRadioValue(END_ON_INFRONT_BEHIND_RADIO, 0);
    // FrontBackRadio
    setRadioValue(END_FRONT_BACK_RADIO, 0);
    // HashSidelineRadio
    setRadioValue(END_HASH_SIDELINE_RADIO, 0);
}

function resetStartInput() {
    resetStartRadios();
    resetStartRanges();
    updatePreview(START);
}

function resetEndInput() {
    resetEndRadios();
    resetEndRanges();
    updatePreview(END);
}

// Run init to get the page initialized with information
init();
