
function init() {
    var spans = document.querySelectorAll('span');
    var ranges = document.querySelectorAll('.custom-range');

    spans[0].innerHTML = ranges[0].value;
    spans[1].innerHTML = ranges[1].value;
    spans[2].innerHTML = ranges[2].value;

    ranges[0].addEventListener('input', function() {
        spans[0].innerHTML = ranges[0].value;
    }, false);

    ranges[1].addEventListener('input', function() {
        spans[1].innerHTML = ranges[1].value;
    }, false);

    ranges[2].addEventListener('input', function() {
        spans[2].innerHTML = ranges[2].value;
    }, false);

    // for (var i = 0; i < spans.length; i++) {
    //     spans[i].innerHTML = ranges[i].value;
    //     ranges[i].addEventListener('input', function() {
    //         spans[i].innerHTML = ranges[i].value;
    //     }, false);
    // }
}

init();
