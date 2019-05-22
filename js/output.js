'use strict';

// Yard Line Constant
let YARD_LINES = [50, 45, 40, 35, 30, 25, 20, 15, 10, 5, "Goal Line"];
// Hash Type Constants
let FRONT_HASH = "Front";
let BACK_HASH = "Back";
let HOME_HASH = "Home";
let VISITOR_HASH = "Visitor";
// Side Type Constants
let ONE_SIDE = "Side 1 ";
let TWO_SIDE = "Side 2 ";
let LEFT_SIDE = "Left ";
let RIGHT_SIDE = "Right ";

// frontToBack - input double representing the Front-To-Back on the field
// field - Field object holding field and hash types
function outputFrontToBack(frontToBack, field) {
    var output;
    var frontHash;
    var backHash;
    var frontHashName;
    var backHashName;
    // Set Field Type from Settings
    if (field.getFieldType() === 0) {
        frontHash = HS_FRONT_HASH;
        backHash = HS_BACK_HASH;
    }
    else {
        frontHash = NCAA_FRONT_HASH;
        backHash = NCAA_BACK_HASH;
    }
    // Set Hash Type from Settings
    if (field.getHashType() === 0) {
        frontHashName = FRONT_HASH;
        backHashName = BACK_HASH;
    }
    else {
        frontHashName = HOME_HASH;
        backHashName = VISITOR_HASH;
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

// leftToRight - input double representing the Left-To-Right on the field
// field - Field object holding the side type
function outputLeftToRight(leftToRight, field) {
    var output;
    var leftSideName;
    var rightSideName;
    var step = leftToRight % 8;

    // Set Side Type from Settings
    if (field.getSideType() === 0) {
        leftSideName = ONE_SIDE;
        rightSideName = TWO_SIDE;
    } else {
        leftSideName = LEFT_SIDE;
        rightSideName = RIGHT_SIDE;
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
            output = "On " + rightSideName + YARD_LINES[yardLine];
        } else if (step <= 4) {
            output = step + " steps Outside " + rightSideName + YARD_LINES[yardLine];
        } else {
            step = 8 - step;
            output = step + " steps Inside " + rightSideName + YARD_LINES[yardLine + 1];
        }
    }
    // Side 1, Left Side of Field (Director Perspective)
    else {
        var yardLine = Math.ceil(leftToRight / 8);
        // var step = leftToRight % 8;
        if (step === 0) {
            output = "On " + leftSideName + YARD_LINES[-yardLine];
        } else if (step >= -4) {
            output = -step + " steps Outside " + leftSideName + YARD_LINES[-yardLine];
        } else {
            step = 8 + step;
            output = step + " steps Inside " + leftSideName + YARD_LINES[-yardLine + 1];
        }
    }
    return output;
}
