'use strict';

class Movement {
    /**
     * @param  {Coordinate} start  {description}
     * @param  {Coordinate} end    {description}
     * @param  {Number} counts {description}
     */
    constructor(start, end, counts) {
        this._start = start;
        this._end = end;
        this._counts = counts;
    }
    get start() {
        return this._start;
    }
    set start(value) {
        this._start = value;
    }
    get end() {
        return this._end;
    }
    set end(value) {
        this._end = value;
    }
    get counts() {
        return this._counts;
    }
    set counts(value) {
        this._counts = value;
    }
}
