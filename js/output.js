'use strict';

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
    var frontHashName;
    var backHashName;
    // Set Field Type from Settings
    if (field.fieldType === 0) {
        frontHash = HS_FRONT_HASH;
        backHash = HS_BACK_HASH;
    }
    else {
        frontHash = NCAA_FRONT_HASH;
        backHash = NCAA_BACK_HASH;
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
        output = -frontHash + " behind " + frontHashName + " Hash";
        // return output;
    }
    // Front half of the field
    else if (frontToBack < 0) {
        if (frontToBack > frontHash) {
            output = (-frontHash + frontToBack) + " behind " + frontHashName + " Hash";
        }
        else if (frontToBack == frontHash) {
            output = "On " + frontHashName + " Hash";
        }
        else if (frontToBack < frontHash && frontToBack > ((FRONT_SIDELINE + frontHash) / 2)) {
            output = (frontHash + -frontToBack) + " in front of " + frontHashName + " Hash";
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
            output = (backHash - frontToBack) + " in front of " + backHashName + " Hash";
        }
        else if (frontToBack == backHash) {
            output = "On " + backHashName + " Hash";
        }
        else if (frontToBack > backHash && frontToBack < ((BACK_SIDELINE + backHash) / 2)) {
            output = (frontToBack - backHash) + " behind " + backHashName + " Hash";
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
    // Side 2, Right Side of Field (Director Perspective)
    else if (leftToRight > 0) {
        var yardLine = Math.floor(leftToRight / 8);
        // var step = leftToRight % 8;
        if (step === 0) {
            output = "On " + rightSideName + OUTPUT_STRING_YARD_LINE_NAMES[yardLine];
        } else if (step <= 4) {
            output = step + " steps Outside " + rightSideName + OUTPUT_STRING_YARD_LINE_NAMES[yardLine];
        } else {
            step = 8 - step;
            output = step + " steps Inside " + rightSideName + OUTPUT_STRING_YARD_LINE_NAMES[yardLine + 1];
        }
    }
    // Side 1, Left Side of Field (Director Perspective)
    else {
        var yardLine = Math.ceil(leftToRight / 8);
        // var step = leftToRight % 8;
        if (step === 0) {
            output = "On " + leftSideName + OUTPUT_STRING_YARD_LINE_NAMES[-yardLine];
        } else if (step >= -4) {
            output = -step + " steps Outside " + leftSideName + OUTPUT_STRING_YARD_LINE_NAMES[-yardLine];
        } else {
            step = 8 + step;
            output = step + " steps Inside " + leftSideName + OUTPUT_STRING_YARD_LINE_NAMES[-yardLine + 1];
        }
    }
    return output;
}
