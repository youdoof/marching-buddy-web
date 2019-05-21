'use strict';

// Yard Line Constant
let YARD_LINES = [50, 45, 40, 35, 30, 25, 20, 15, 10, 5, "Goal Line"];
let YARDLINES = [50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0]; // Getting messy, works for now.
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
// Step Size Constant -- 8 to 5
let STEP_SIZE_REFERENCE = 8.0;
// Sideline distance constants
let FRONT_SIDELINE = -42.0;
let BACK_SIDELINE = 42.0;
// NCAA Hash distances
let NCAA_FRONT_HASH = -10.0;
let NCAA_BACK_HASH = 10.0;
// High School Hash distances
let HS_FRONT_HASH = -14.0;
let HS_BACK_HASH = 14.0;

function findYardLine(value) {
    var counter = 0;
    for (var i = 0; i < YARDLINES.length; i++) {
        if (YARDLINES[i] === value) {
            counter = i;
            break;
        }
    }
    return counter * 8;
}

function inputLeftToRight(input) {
    var result = 0;

    switch (input.onInOut) {
        // On yard line
        case 0:
            if (input.side == 0) {
                result = -findYardLine(input.yardLine);
            } else {
                result = findYardLine(input.yardLine);
            }
            break;
        case 1:
            if (input.yardLine == 50) {
                if (input.side == 0) {
                    result = -input.stepsLR;
                } else {
                    result = input.stepsLR;
                }
            } else if (input.side == 0) {
                result = -findYardLine(input.yardLine) + input.stepsLR;
            } else {
                result = findYardLine(input.yardLine) - input.stepsLR;
            }
            break;
        case 2:
            if (input.yardLine == 50) {
                if (input.side == 0) {
                    result = -input.stepsLR;
                } else {
                    result = input.stepsLR;
                }
            } else if (input.side == 0) {
                result = -findYardLine(input.yardLine) - input.stepsLR;
            } else {
                result = findYardLine(input.yardLine) + input.stepsLR;
            }
            break;
        default:
            break;
    }
    return result;
}

function inputFrontToBack(input, field) {
    var result = 0;
    var frontHashReference;
    var backHashReference;
    var processedReferencePoint = getProcessedFrontBackReferencePoint(input);

    if (field.getFieldType() == 0) {
        frontHashReference = HS_FRONT_HASH;
        backHashReference = HS_BACK_HASH;
    } else {
        frontHashReference = NCAA_FRONT_HASH;
        backHashReference = NCAA_BACK_HASH;
    }

    switch (processedReferencePoint) {
        // Front Sideline
        case 0:
            result = onFrontBehindHelper(input, FRONT_SIDELINE);
            break;
        // Front Hash
        case 1:
            result = onFrontBehindHelper(input, frontHashReference);
            break;
        // Back Hash
        case 2:
            result = onFrontBehindHelper(input, backHashReference);
            break;
        // Back Sideline
        case 3:
            result = onFrontBehindHelper(input, BACK_SIDELINE);
            break;
        default:
            result = 0;
            break;
    }
    return result;
}

function onFrontBehindHelper(input, hashSidelineReference) {
    if (input.onInFrontBehind == 0) {
        return hashSidelineReference; // On
    } else if (input.onInFrontBehind == 1) {
        return hashSidelineReference - input.stepsFB; // In Front
    } else {
        return hashSidelineReference + input.stepsFB; // Behind
    }
}

function getProcessedFrontBackReferencePoint(input) {
    if (input.frontBack == 0 && input.hashSideline == 1) {
        return 0; // Front Sideline
    } else if (input.frontBack == 0 && input.hashSideline == 0) {
        return 1; // Front Hash
    } else if (input.frontBack == 1 && input.hashSideline == 0) {
        return 2; // Back Hash
    } else if (input.frontBack == 1 && input.hashSideline == 1) {
        return 3; // Back Sideline
    } else {
        return -1;
    }
}

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
    } else {
        frontHash = NCAA_FRONT_HASH;
        backHash = NCAA_BACK_HASH;
    }

    // Set Hash Type from Settings
    if (field.getHashType() === 0) {
        frontHashName = FRONT_HASH;
        backHashName = BACK_HASH;
    } else {
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
        } else if (frontToBack == frontHash) {
            output = "On " + frontHashName + " Hash";
        } else if (frontToBack < frontHash && frontToBack > ((FRONT_SIDELINE + frontHash) / 2)) {
            output = (frontHash + -frontToBack) + " in front of " + frontHashName + " Hash";
        } else if (frontToBack > FRONT_SIDELINE) {
            output = (-FRONT_SIDELINE + frontToBack) + " behind " + frontHashName + " Sideline";
        } else if (frontToBack == FRONT_SIDELINE) {
            output = "On " + frontHashName + " Sideline";
        } else {
            output = -(frontToBack - FRONT_SIDELINE) + " in front of " + frontHashName + " Sideline";
        }
    }
    // Back half of the field
    else {
        if (frontToBack < backHash) {
            output = (backHash - frontToBack) + " in front of " + backHashName + " Hash";
        } else if (frontToBack == backHash) {
            output = "On " + backHashName + " Hash";
        } else if (frontToBack > backHash && frontToBack < ((BACK_SIDELINE + backHash) / 2)) {
            output = (frontToBack - backHash) + " behind " + backHashName + " Hash";
        } else if (frontToBack < BACK_SIDELINE) {
            output = (BACK_SIDELINE - frontToBack) + " in front of " + backHashName + " Sideline";
        } else if (frontToBack == BACK_SIDELINE) {
            output = "On " + backHashName + " Sideline";
        } else {
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

// Used to Calculate the Step Size of a move
// start - Coordinate object
// end - Coordinate object
function distance(start, end) {
    var startX = start.getLeftToRight();
    var startY = start.getFrontToBack();
    var endX = end.getLeftToRight();
    var endY = end.getFrontToBack();
    return Math.sqrt(Math.pow((endX - startX), 2) + Math.pow((endY - startY), 2));
}

// start - Coordinate object
// end - Coordinate object
// counts - number of counts to get to next coordinate
function getStepSize(start, end, counts) {
    var computedStepSize;
    var distance = distance(start, end);
    var stepSizeMultiplier = distance / counts;
    if (stepSizeMultiplier === 0) {
        computedStepSize = 0;
    } else {
        computedStepSize = STEP_SIZE_REFERENCE / stepSizeMultiplier;
    }
    return "Step Size: " + computedStepSize + " to 5";
}

function getMidSetCoordinate(start, end) {
    var leftToRightMiddle = (start.getLeftToRight() + end.getLeftToRight()) / 2;
    var frontToBackMiddle = (start.getFrontToBack() + end.getFrontToBack()) / 2;
    return new Coordinate(leftToRightMiddle, frontToBackMiddle);
}
