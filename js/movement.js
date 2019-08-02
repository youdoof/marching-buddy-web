'use strict';

class Movement {
    /**
     * @param  {Coordinate} start  {description}
     * @param  {Coordinate} end    {description}
     * @param  {Number} counts {description}
     */
    constructor(start, end, counts) {
        this.start = start;
        this.end = end;
        this.counts = counts;
    }
    get start() {
        return this.start;
    }
    set start(value) {
        this.start = value;
    }
    get end() {
        return this.end;
    }
    set end(value) {
        this.end = value;
    }
    get counts() {
        return this.counts;
    }
    set counts(value) {
        this.counts = value;
    }
}
