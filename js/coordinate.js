'use strict';

class Coordinate {
    /**
     * New Coordinate for use in the calculation of midsets, step sizes, and cross counts
     * @param {Number} leftToRight Left to Right, or X coordinate
     * @param {Number} frontToBack Front to Back, or Y coordinate
     */
    constructor(leftToRight, frontToBack) {
        this._leftToRight = leftToRight;
        this._frontToBack = frontToBack;
    }
    get leftToRight() {
        return this._leftToRight;
    }
    set leftToRight(value) {
        this._leftToRight = value;
    }
    get frontToBack() {
        return this._frontToBack;
    }
    set frontToBack(value) {
        this._frontToBack = value;
    }
    /**
     * Prints the Coordinate in marching band terms that the user will understand,
     * using terminology the user defined from settings
     * @function printCoordinate
     * @param  {Field} field Field object containing field type and terminology
     * @return {String} Formatted string detailing the location of the Coordinate in marching band terms
     */
    printCoordinate(field) {
        return outputLeftToRight(this.leftToRight, field) + "<br>" +
            outputFrontToBack(this.frontToBack, field);
    }
}

/**
 * Takes input from the user and returns a new Coordinate for use in the project
 * @function createCoordinateFromInput
 * @param  {Input} input Input object generated from user input
 * @param  {Field} field Field object containing terminology information
 * @return {Coordinate} New Coordinate from input
 */
function createCoordinateFromInput(input, field) {
    return new Coordinate(inputLeftToRight(input), inputFrontToBack(input, field));
}

/*
 * Merge of output.js starts here
 */

// Yard Line Constant
const OUTPUT_STRING_YARD_LINE_NAMES = [50, 45, 40, 35, 30, 25, 20, 15, 10, 5, "Goal Line"];
// Hash Type Constants
const OUTPUT_STRING_FRONT_HASH = "Front";
const OUTPUT_STRING_BACK_HASH = "Back";
const OUTPUT_STRING_HOME_HASH = "Home";
const OUTPUT_STRING_VISITOR_HASH = "Visitor";
// Side Type Constants
const OUTPUT_STRING_SIDE_ONE = "Side 1 ";
const OUTPUT_STRING_SIDE_TWO = "Side 2 ";
const OUTPUT_STRING_SIDE_LEFT = "Left ";
const OUTPUT_STRING_SIDE_RIGHT = "Right ";
// Field Type Constants
const OUTPUT_STRING_FIELD_HS = " (HS)";
const OUTPUT_STRING_FIELD_NCAA = " (NCAA)";
// Plurality Constants
const PLURALITY_STEP = "Step";
const PLURALITY_STEPS = "Steps";

/**
 * Takes the coordinate's front to back property and returns a string representing the front to back location in marching band terms
 * @function outputFrontToBack
 * @param  {Number} frontToBack Number representing the front to back location on the field
 * @param  {Field} field       Field object containing the field type and hash type
 * @return {String} Formatted string representing the front to back location in marching band terms
 */
function outputFrontToBack(frontToBack, field) {
    var output;
    var frontHash;
    var backHash;
    var fieldName;
    var frontHashName;
    var backHashName;
    // Set Field Type from Settings
    if (field.fieldType === 0) {
        frontHash = HS_FRONT_HASH;
        backHash = HS_BACK_HASH;
        fieldName = OUTPUT_STRING_FIELD_HS;
    }
    else {
        frontHash = NCAA_FRONT_HASH;
        backHash = NCAA_BACK_HASH;
        fieldName = OUTPUT_STRING_FIELD_NCAA;
    }
    // Set Hash Type from Settings
    if (field.hashType === 0) {
        frontHashName = OUTPUT_STRING_FRONT_HASH;
        backHashName = OUTPUT_STRING_BACK_HASH;
    }
    else {
        frontHashName = OUTPUT_STRING_HOME_HASH;
        backHashName = OUTPUT_STRING_VISITOR_HASH;
    }
    // Building Output String
    // Middle of the field
    if (frontToBack == 0) {
        output = -frontHash + " behind " + frontHashName + " Hash " + fieldName;
        // return output;
    }
    // Front half of the field
    else if (frontToBack < 0) {
        if (frontToBack > frontHash) {
            output = (-frontHash + frontToBack) + " behind " + frontHashName + " Hash " + fieldName;
        }
        else if (frontToBack == frontHash) {
            output = "On " + frontHashName + " Hash " + fieldName;
        }
        else if (frontToBack < frontHash && frontToBack > ((FRONT_SIDELINE + frontHash) / 2)) {
            output = (frontHash + -frontToBack) + " in front of " + frontHashName + " Hash " + fieldName;
        }
        else if (frontToBack > FRONT_SIDELINE) {
            output = (-FRONT_SIDELINE + frontToBack) + " behind " + frontHashName + " Sideline";
        }
        else if (frontToBack == FRONT_SIDELINE) {
            output = "On " + frontHashName + " Sideline";
        }
        else {
            output = -(frontToBack - FRONT_SIDELINE) + " in front of " + frontHashName + " Sideline";
        }
    }
    // Back half of the field
    else {
        if (frontToBack < backHash) {
            output = (backHash - frontToBack) + " in front of " + backHashName + " Hash " + fieldName;
        }
        else if (frontToBack == backHash) {
            output = "On " + backHashName + " Hash " + fieldName;
        }
        else if (frontToBack > backHash && frontToBack < ((BACK_SIDELINE + backHash) / 2)) {
            output = (frontToBack - backHash) + " behind " + backHashName + " Hash " + fieldName;
        }
        else if (frontToBack < BACK_SIDELINE) {
            output = (BACK_SIDELINE - frontToBack) + " in front of " + backHashName + " Sideline";
        }
        else if (frontToBack == BACK_SIDELINE) {
            output = "On " + backHashName + " Sideline";
        }
        else {
            output = (frontToBack - BACK_SIDELINE) + " behind " + backHashName + " Sideline";
        }
    }
    return output;
}

/**
 * Takes the coordinate's left to right property and returns a string represengint the left to right location in marching band terms
 * @function outputLeftToRight
 * @param  {Number} leftToRight Number representing the left to right location on the field
 * @param  {Field} field       Field object containing the side type
 * @return {String} Formatted string representing the left to right location in marching band terms
 */
function outputLeftToRight(leftToRight, field) {
    var output;
    var leftSideName;
    var rightSideName;
    var step = leftToRight % 8;

    // Set Side Type from Settings
    if (field.sideType === 0) {
        leftSideName = OUTPUT_STRING_SIDE_ONE;
        rightSideName = OUTPUT_STRING_SIDE_TWO;
    } else {
        leftSideName = OUTPUT_STRING_SIDE_LEFT;
        rightSideName = OUTPUT_STRING_SIDE_RIGHT;
    }

    // 50 Yard Line (Center of Field)
    if (leftToRight === 0) {
        output = "On 50";
    }
    // Side 2, Right Side of Field (Director Perspective) -->
    else if (leftToRight > 0) {
        var yardLine = Math.floor(leftToRight / 8);
        if (step === 0) {
            output = "On " + rightSideName + OUTPUT_STRING_YARD_LINE_NAMES[yardLine];
        } else if (step <= 4) {
            var stepGrammar = pluralityChecker(step);
            output = step + ` ${stepGrammar} Outside ` + rightSideName + OUTPUT_STRING_YARD_LINE_NAMES[yardLine];
        } else {
            step = 8 - step;
            var stepGrammar = pluralityChecker(step);
            output = step + ` ${stepGrammar} Inside ` + rightSideName + OUTPUT_STRING_YARD_LINE_NAMES[yardLine + 1];
        }
    }
    // Side 1, Left Side of Field (Director Perspective) <--
    else {
        var yardLine = Math.ceil(leftToRight / 8);
        if (step === 0) {
            output = "On " + leftSideName + OUTPUT_STRING_YARD_LINE_NAMES[-yardLine];
        } else if (step >= -4) {
            var stepGrammar = pluralityChecker(step);
            output = -step + ` ${stepGrammar} Outside ` + leftSideName + OUTPUT_STRING_YARD_LINE_NAMES[-yardLine];
        } else {
            step = 8 + step;
            var stepGrammar = pluralityChecker(step);
            output = step + ` ${stepGrammar} Inside ` + leftSideName + OUTPUT_STRING_YARD_LINE_NAMES[-yardLine + 1];
        }
    }
    return output;
}

/**
 * Takes a number representing the steps from a 
 * @function pluralityChecker
 * @param  {Number} s Number representing the step(s) away from the reference yard line
 * @return {String} String containing the correct form of step or steps
 */
function pluralityChecker(s) {
    if (Math.abs(s) == 1) {
        return PLURALITY_STEP;
    } else {
        return PLURALITY_STEPS;
    }
}
