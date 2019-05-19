'use strict';

function init() {
    setupSliderInteractivity();
    // startListening();

}

// Temporary solution, needs to be cleaned up
function setupSliderInteractivity() {
    var spans = document.querySelectorAll('p span');
    var ranges = document.querySelectorAll('.custom-range');

    spans[0].innerHTML = ranges[0].value;
    spans[1].innerHTML = ranges[1].value;
    spans[2].innerHTML = ranges[2].value;
    spans[3].innerHTML = ranges[3].value;
    spans[4].innerHTML = ranges[4].value;
    spans[5].innerHTML = ranges[5].value;
    spans[6].innerHTML = ranges[6].value;

    ranges[0].addEventListener('input', function() {
        spans[0].innerHTML = ranges[0].value;
    }, false);

    ranges[1].addEventListener('input', function() {
        spans[1].innerHTML = ranges[1].value;
    }, false);

    ranges[2].addEventListener('input', function() {
        spans[2].innerHTML = ranges[2].value;
    }, false);

    ranges[3].addEventListener('input', function() {
        spans[3].innerHTML = ranges[3].value;
    }, false);

    ranges[4].addEventListener('input', function() {
        spans[4].innerHTML = ranges[4].value;
    }, false);

    ranges[5].addEventListener('input', function() {
        spans[5].innerHTML = ranges[5].value;
    }, false);

    ranges[6].addEventListener('input', function() {
        spans[6].innerHTML = ranges[6].value;
    }, false);
}

// Work in progress
function startListening() {
    document.addEventListener('input', function(event) {
        if (event.target.matches('.custom-range')) {
            console.log("click");
        }
    }, false);
}

// Might not be useful. Not being used at the moment.
function getCheckedRadioButton(name) {
    return document.querySelector(`input[name=${name}]:checked`).value;
}

function getMidset() {

}

init();
