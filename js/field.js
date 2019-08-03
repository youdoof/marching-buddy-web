'use strict';

class Field {
    constructor() {
        this._fieldType = findFieldTypeFromDOM();
        this._sideType = findSideTypeFromDOM();
        this._hashType = findHashTypeFromDOM();
    }
    get fieldType() {
        return this._fieldType;
    }
    set fieldType(value) {
        this._fieldType = value;
    }
    get sideType() {
        return this._sideType;
    }
    set sideType(value) {
        this._sideType = value;
    }
    get hashType() {
        return this._hashType;
    }
    set hashType(value) {
        this._hashType = value;
    }
}
function findFieldTypeFromDOM() {
    return parseInt(document.querySelector('input[name=fieldTypeRadio]:checked').value);
}
function findSideTypeFromDOM() {
    return parseInt(document.querySelector('input[name=sideNameRadio]:checked').value);
}
function findHashTypeFromDOM() {
    return parseInt(document.querySelector('input[name=hashNameRadio]:checked').value);
}
