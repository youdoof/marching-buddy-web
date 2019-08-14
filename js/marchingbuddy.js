var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);function roundToPrecision(a,b){a=+a+(void 0===b?.5:b/2);return a-a%(void 0===b?1:+b)}function angleInDegrees(a){return 180/Math.PI*a}
function testPlease(){var a=new Field,b=new Input(START),c=new Input(END);b=createCoordinateFromInput(b,a);c=createCoordinateFromInput(c,a);c=new Movement(b,c,getCounts());console.log(c.printCoordinates(a));console.log(c.printMidSet(a));console.log(c.printStepSize());console.log(c.printYardLineCrossInfo(a));console.log(c.printAngle())};var Coordinate=function(a,b){this._leftToRight=a;this._frontToBack=b};Coordinate.prototype.printCoordinate=function(a){return outputLeftToRight(this.leftToRight,a)+"<br>"+outputFrontToBack(this.frontToBack,a)};
$jscomp.global.Object.defineProperties(Coordinate.prototype,{leftToRight:{configurable:!0,enumerable:!0,get:function(){return this._leftToRight},set:function(a){this._leftToRight=a}},frontToBack:{configurable:!0,enumerable:!0,get:function(){return this._frontToBack},set:function(a){this._frontToBack=a}}});function createCoordinateFromInput(a,b){return new Coordinate(inputLeftToRight(a),inputFrontToBack(a,b))}
var OUTPUT_STRING_YARD_LINE_NAMES=[50,45,40,35,30,25,20,15,10,5,"Goal Line"],OUTPUT_STRING_FRONT_HASH="Front",OUTPUT_STRING_BACK_HASH="Back",OUTPUT_STRING_HOME_HASH="Home",OUTPUT_STRING_VISITOR_HASH="Visitor",OUTPUT_STRING_SIDE_ONE="Side 1 ",OUTPUT_STRING_SIDE_TWO="Side 2 ",OUTPUT_STRING_SIDE_LEFT="Left ",OUTPUT_STRING_SIDE_RIGHT="Right ";
function outputFrontToBack(a,b){if(0===b.fieldType){var c=HS_FRONT_HASH;var d=HS_BACK_HASH}else c=NCAA_FRONT_HASH,d=NCAA_BACK_HASH;if(0===b.hashType){b=OUTPUT_STRING_FRONT_HASH;var e=OUTPUT_STRING_BACK_HASH}else b=OUTPUT_STRING_HOME_HASH,e=OUTPUT_STRING_VISITOR_HASH;return 0==a?-c+" behind "+b+" Hash":0>a?a>c?-c+a+" behind "+b+" Hash":a==c?"On "+b+" Hash":a<c&&a>(FRONT_SIDELINE+c)/2?c+-a+" in front of "+b+" Hash":a>FRONT_SIDELINE?-FRONT_SIDELINE+a+" behind "+b+" Sideline":a==FRONT_SIDELINE?"On "+
b+" Sideline":-(a-FRONT_SIDELINE)+" in front of "+b+" Sideline":a<d?d-a+" in front of "+e+" Hash":a==d?"On "+e+" Hash":a>d&&a<(BACK_SIDELINE+d)/2?a-d+" behind "+e+" Hash":a<BACK_SIDELINE?BACK_SIDELINE-a+" in front of "+e+" Sideline":a==BACK_SIDELINE?"On "+e+" Sideline":a-BACK_SIDELINE+" behind "+e+" Sideline"}
function outputLeftToRight(a,b){var c=a%8;if(0===b.sideType){b=OUTPUT_STRING_SIDE_ONE;var d=OUTPUT_STRING_SIDE_TWO}else b=OUTPUT_STRING_SIDE_LEFT,d=OUTPUT_STRING_SIDE_RIGHT;0===a?c="On 50":0<a?(a=Math.floor(a/8),c=0===c?"On "+d+OUTPUT_STRING_YARD_LINE_NAMES[a]:4>=c?c+" steps Outside "+d+OUTPUT_STRING_YARD_LINE_NAMES[a]:8-c+" steps Inside "+d+OUTPUT_STRING_YARD_LINE_NAMES[a+1]):(a=Math.ceil(a/8),c=0===c?"On "+b+OUTPUT_STRING_YARD_LINE_NAMES[-a]:-4<=c?-c+" steps Outside "+b+OUTPUT_STRING_YARD_LINE_NAMES[-a]:
8+c+" steps Inside "+b+OUTPUT_STRING_YARD_LINE_NAMES[-a+1]);return c};var Field=function(){this._fieldType=findFieldTypeFromDOM();this._sideType=findSideTypeFromDOM();this._hashType=findHashTypeFromDOM()};
$jscomp.global.Object.defineProperties(Field.prototype,{fieldType:{configurable:!0,enumerable:!0,get:function(){return this._fieldType},set:function(a){this._fieldType=a}},sideType:{configurable:!0,enumerable:!0,get:function(){return this._sideType},set:function(a){this._sideType=a}},hashType:{configurable:!0,enumerable:!0,get:function(){return this._hashType},set:function(a){this._hashType=a}}});
function findFieldTypeFromDOM(){return parseInt(document.querySelector("input[name=fieldTypeRadio]:checked").value)}function findSideTypeFromDOM(){return parseInt(document.querySelector("input[name=sideNameRadio]:checked").value)}function findHashTypeFromDOM(){return parseInt(document.querySelector("input[name=hashNameRadio]:checked").value)};var Input=function(a){this.stepsLR=getStepsLR(a);this.onInOut=getOnInOut(a);this.side=getSide(a);this.yardLine=getYardLine(a);this.stepsFB=getStepsFB(a);this.onInFrontBehind=getOnInFrontBehind(a);this.frontBack=getFrontBack(a);this.hashSideline=getHashSideline(a)},END="e",START="s";function getStepsLR(a){return parseFloat(document.querySelector("#"+a+"LRSteps").value)}function getOnInOut(a){return parseInt(document.querySelector("input[name="+a+"OnInOutRadio]:checked").value)}
function getSide(a){return parseInt(document.querySelector("input[name="+a+"SideRadio]:checked").value)}function getYardLine(a){return parseFloat(document.querySelector("#"+a+"YardLine").value)}function getStepsFB(a){return parseFloat(document.querySelector("#"+a+"FBSteps").value)}function getOnInFrontBehind(a){return parseInt(document.querySelector("input[name="+a+"OnInFrontBehindRadio]:checked").value)}
function getFrontBack(a){return parseInt(document.querySelector("input[name="+a+"FrontBackRadio]:checked").value)}function getHashSideline(a){return parseInt(document.querySelector("input[name="+a+"HashSidelineRadio]:checked").value)}function getCounts(){return parseInt(document.querySelector("#counts").value)}var YARDLINES=[50,45,40,35,30,25,20,15,10,5,0],FRONT_SIDELINE=-42,BACK_SIDELINE=42,NCAA_FRONT_HASH=-10,NCAA_BACK_HASH=10,HS_FRONT_HASH=-14,HS_BACK_HASH=14;
function findYardLine(a){for(var b=0,c=0;c<YARDLINES.length;c++)if(YARDLINES[c]===a){b=c;break}return 8*b}
function inputLeftToRight(a){var b=0;switch(a.onInOut){case 0:b=0==a.side?-findYardLine(a.yardLine):findYardLine(a.yardLine);break;case 1:b=50==a.yardLine?0==a.side?-a.stepsLR:a.stepsLR:0==a.side?-findYardLine(a.yardLine)+a.stepsLR:findYardLine(a.yardLine)-a.stepsLR;break;case 2:b=50==a.yardLine?0==a.side?-a.stepsLR:a.stepsLR:0==a.side?-findYardLine(a.yardLine)-a.stepsLR:findYardLine(a.yardLine)+a.stepsLR}return b}
function inputFrontToBack(a,b){var c=0,d=getProcessedFrontBackReferencePoint(a);if(0==b.fieldType){b=HS_FRONT_HASH;var e=HS_BACK_HASH}else b=NCAA_FRONT_HASH,e=NCAA_BACK_HASH;switch(d){case 0:c=processDistanceRelativeToReferencePoint(a,FRONT_SIDELINE);break;case 1:c=processDistanceRelativeToReferencePoint(a,b);break;case 2:c=processDistanceRelativeToReferencePoint(a,e);break;case 3:c=processDistanceRelativeToReferencePoint(a,BACK_SIDELINE)}return c}
function getProcessedFrontBackReferencePoint(a){return 0==a.frontBack&&1==a.hashSideline?0:0==a.frontBack&&0==a.hashSideline?1:1==a.frontBack&&0==a.hashSideline?2:1==a.frontBack&&1==a.hashSideline?3:-1}function processDistanceRelativeToReferencePoint(a,b){return 0==a.onInFrontBehind?b:1==a.onInFrontBehind?b-a.stepsFB:b+a.stepsFB};var Movement=function(a,b,c){this._start=a;this._end=b;this._counts=c;this._mid=findMidSetCoordinate(this._start,this._end);this._stepSize=findStepSize(this._start,this._end,this._counts);this._yardLineCrossCoordinates=findYardLineCrossCoordinates(this._start,this._end,this._counts);this._angle=setAngle(this._start,this._end)};Movement.prototype.printCoordinates=function(a){return"Start: "+this._start.printCoordinate(a)+"<br>End: "+this._end.printCoordinate(a)};Movement.prototype.printMidSet=function(a){return this._mid.printCoordinate(a)};
Movement.prototype.printStepSize=function(){return this._stepSize};
Movement.prototype.printYardLineCrossInfo=function(a){var b="";if(this._yardLineCrossCoordinates==NO_INTERSECTIONS)return""+this._yardLineCrossCoordinates[0];for(var c=0;c<this._yardLineCrossCoordinates.length;c++){var d=findCountAtTarget(this._start,this._end,this._yardLineCrossCoordinates[c],this._counts);b+="Cross the "+printSide(this._yardLineCrossCoordinates[c].leftToRight/YARD_LINE_DISTANCE,a)+" "+YARDLINES[Math.abs(this._yardLineCrossCoordinates[c].leftToRight/YARD_LINE_DISTANCE)]+" Yard Line on count "+
roundToPrecision(d,PRECISION_GRANULARITY)+"<br>"}return b};Movement.prototype.printAngle=function(){return"Hold"==this._stepSize?"Hold":"Direction of move: "+this._angle+"\u00b0"};
$jscomp.global.Object.defineProperties(Movement.prototype,{start:{configurable:!0,enumerable:!0,get:function(){return this._start},set:function(a){this._start=a}},yardLineCrossCoordinates:{configurable:!0,enumerable:!0,get:function(){return this._yardLineCrossCoordinates},set:function(a){this._yardLineCrossCoordinates=a}},end:{configurable:!0,enumerable:!0,get:function(){return this._end},set:function(a){this._end=a}},counts:{configurable:!0,enumerable:!0,get:function(){return this._counts},set:function(a){this._counts=
a}},angle:{configurable:!0,enumerable:!0,get:function(){return this._angle},set:function(a){this._angle=a}}});var STEP_SIZE_REFERENCE=8,YARD_LINE_DISTANCE=8,NO_INTERSECTIONS="No Yard Line Intersections Found",PRECISION_GRANULARITY=.125;function findDistanceBetweenCoordinates(a,b){return Math.sqrt(Math.pow(b.leftToRight-a.leftToRight,2)+Math.pow(b.frontToBack-a.frontToBack,2))}
function findStepSize(a,b,c){a=findDistanceBetweenCoordinates(a,b)/c;return 0==a?"Hold":roundToPrecision(STEP_SIZE_REFERENCE/a,PRECISION_GRANULARITY)+" to 5"}function setAngle(a,b){return roundToPrecision(angleInDegrees(Math.atan(findSlopeBetweenCoordinates(a,b))),.25)}function findMidSetCoordinate(a,b){return new Coordinate((a.leftToRight+b.leftToRight)/2,(a.frontToBack+b.frontToBack)/2)}
function prepareYardLineStepper(a){if(0>a)return-1<a%YARD_LINE_DISTANCE&&--a,Math.ceil(a);1>a%YARD_LINE_DISTANCE&&(a+=1);return Math.floor(a)}function yardLineStepper(a,b,c){for(var d=[];b<=c;b++)b!=a.leftToRight&&0==b%YARD_LINE_DISTANCE&&d.push(b/YARD_LINE_DISTANCE);return d}function findSlopeBetweenCoordinates(a,b){return(b.frontToBack-a.frontToBack)/(b.leftToRight-a.leftToRight)}function findB(a,b){return a.frontToBack-findSlopeBetweenCoordinates(a,b)*a.leftToRight}
function findCoordinateAtLeftToRight(a,b,c){var d=findSlopeBetweenCoordinates(a,b);a=findB(a,b);return new Coordinate(c,d*c+a)}function findCountAtTarget(a,b,c,d){b=findDistanceBetweenCoordinates(a,b);a=findDistanceBetweenCoordinates(a,c);return d/(b/a)}function printSide(a,b){return 0==a?"":0==b.sideType?0>a?SIDE_TERM_0_SIDE_1_SIDE_2[0]:SIDE_TERM_0_SIDE_1_SIDE_2[1]:1==b.sideType?0>a?SIDE_TERM_1_LEFT_RIGHT[0]:SIDE_TERM_1_LEFT_RIGHT[1]:""}
function findYardLineCrosses(a,b){var c=[],d=prepareYardLineStepper(a.leftToRight),e=prepareYardLineStepper(b.leftToRight);a.leftToRight==b.leftToRight?c.push(NO_INTERSECTIONS):d<e?c=yardLineStepper(a,d,e):(c=yardLineStepper(a,e,d),c.reverse());0==c.length&&c.push(NO_INTERSECTIONS);return c}
function findYardLineCrossCoordinates(a,b){var c=findYardLineCrosses(a,b),d=[];if(c[0]==NO_INTERSECTIONS)return[NO_INTERSECTIONS];for(var e=0;e<c.length;e++){var f=findCoordinateAtLeftToRight(a,b,c[e]*YARD_LINE_DISTANCE);d.push(f)}return d};function init(){initializeSliderLabelValues();startListening();calculateMidsetInformation()}function initializeSliderLabelValues(){resetStartSliders();resetEndSliders();resetCountSlider()}var RANGE_YARDLINE_DEFAULT_VALUE=50,RANGE_STEPS_DEFAULT_VALUE=0,RANGE_COUNTS_DEFAULT_VALUE=8;
function resetInputSliders(a,b,c){a=document.querySelectorAll(a);b=document.querySelectorAll(b);c=document.querySelectorAll(c);setRangeFamilyInnerHTMLAndValue(a,RANGE_STEPS_DEFAULT_VALUE);setRangeFamilyInnerHTMLAndValue(b,RANGE_YARDLINE_DEFAULT_VALUE);setRangeFamilyInnerHTMLAndValue(c,RANGE_STEPS_DEFAULT_VALUE)}function resetStartSliders(){resetInputSliders(RANGE_START_LRSTEPS,RANGE_START_YARDLINE,RANGE_START_FBSTEPS)}
function resetEndSliders(){resetInputSliders(RANGE_END_LRSTEPS,RANGE_END_YARDLINE,RANGE_END_FBSTEPS)}function resetCountSlider(){var a=document.querySelectorAll(RANGE_COUNTS_SLIDER);setRangeFamilyInnerHTMLAndValue(a,RANGE_COUNTS_DEFAULT_VALUE)}function setRangeFamilyInnerHTMLAndValue(a,b){a[0].innerHTML=b;a[1].value=b}
var RANGE_START_LRSTEPS=".startLRSteps",RANGE_START_YARDLINE=".startYardLine",RANGE_START_FBSTEPS=".startFBSteps",RANGE_END_LRSTEPS=".endLRSteps",RANGE_END_YARDLINE=".endYardLine",RANGE_END_FBSTEPS=".endFBSteps",RANGE_COUNTS_SLIDER=".countsSlider",HASH_TERM_0_FRONT_BACK=["Front","Back"],HASH_TERM_1_HOME_VISITOR=["Home","Visitor"],SIDE_TERM_0_SIDE_1_SIDE_2=["Side 1","Side 2"],SIDE_TERM_1_LEFT_RIGHT=["Left","Right"],HASH="hash",SIDE="side";
function startListening(){document.addEventListener("input",function(a){a.target.matches(RANGE_START_LRSTEPS)&&(document.querySelector(RANGE_START_LRSTEPS).innerHTML=a.target.value);a.target.matches(RANGE_START_YARDLINE)&&(document.querySelector(RANGE_START_YARDLINE).innerHTML=a.target.value);a.target.matches(RANGE_START_FBSTEPS)&&(document.querySelector(RANGE_START_FBSTEPS).innerHTML=a.target.value);a.target.matches(RANGE_END_LRSTEPS)&&(document.querySelector(RANGE_END_LRSTEPS).innerHTML=a.target.value);
a.target.matches(RANGE_END_YARDLINE)&&(document.querySelector(RANGE_END_YARDLINE).innerHTML=a.target.value);a.target.matches(RANGE_END_FBSTEPS)&&(document.querySelector(RANGE_END_FBSTEPS).innerHTML=a.target.value);a.target.matches(RANGE_COUNTS_SLIDER)&&(document.querySelector(RANGE_COUNTS_SLIDER).innerHTML=a.target.value)},!1);document.addEventListener("click",function(a){a.target.matches(".nightRadio")&&lightsOff();a.target.matches(".dayRadio")&&lightsOn();a.target.matches(".hashFrontBack")&&updateTerminology(HASH_TERM_0_FRONT_BACK,
HASH);a.target.matches(".hashHomeVisitor")&&updateTerminology(HASH_TERM_1_HOME_VISITOR,HASH);a.target.matches(".sideOneTwo")&&updateTerminology(SIDE_TERM_0_SIDE_1_SIDE_2,SIDE);a.target.matches(".sideLeftRight")&&updateTerminology(SIDE_TERM_1_LEFT_RIGHT,SIDE)},!1)}function lightsOn(){var a=document.querySelector("body");a.classList.contains("night")&&(a.classList.remove("night"),a.classList.add("day"))}
function lightsOff(){var a=document.querySelector("body");a.classList.contains("day")&&(a.classList.remove("day"),a.classList.add("night"))}function updateTerminology(a,b){b=document.querySelectorAll("."+b+"Term");for(var c=0;c<b.length;c++)b[c].innerHTML=a[c%2]}var midsetTextDisplay=document.querySelector(".midset"),stepSizeDisplay=document.querySelector(".step-size"),crossCountDisplay=document.querySelector(".cross-count");
function calculateMidsetInformation(){var a=new Input(START),b=new Input(END),c=new Field;a=createCoordinateFromInput(a,c);b=createCoordinateFromInput(b,c);b=new Movement(a,b,getCounts());midsetTextDisplay.innerHTML=b.printMidSet(c);stepSizeDisplay.innerHTML=b.printStepSize();crossCountDisplay.innerHTML=b.printYardLineCrossInfo(c)}
function copyEndToStart(){var a=new Input(END);setRadioValue("sOnInOutRadio",a.onInOut);copySliderValue(RANGE_START_LRSTEPS,a.stepsLR);copySliderValue(RANGE_START_YARDLINE,a.yardLine);setRadioValue("sSideRadio",a.side);setRadioValue("sOnInFrontBehindRadio",a.onInFrontBehind);copySliderValue(RANGE_START_FBSTEPS,a.stepsFB);setRadioValue("sFrontBackRadio",a.frontBack);setRadioValue("sHashSidelineRadio",a.hashSideline)}
function copySliderValue(a,b){a=document.querySelectorAll(a);a[0].innerHTML=b;a[1].value=b}function setRadioValue(a,b){document.querySelectorAll("."+a)[b].click()}init();
