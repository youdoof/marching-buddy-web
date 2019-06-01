'use strict';

/**
 * Field definitions for marching band
 * @typedef {Object} Field
 * @property {Number} fieldType - Type of Field, High School or NCAA
 * @property {Number} sideType - Side Terminology selector
 * @property {Number} hashType - Hash Terminology selector
 */
class Field {
    constructor() {
        this.fieldType = setFieldType();
        this.sideType = setSideType();
        this.hashType = setHashType();
    }
    getFieldType() {
        return this.fieldType;
    }
    getSideType() {
        return this.sideType;
    }
    getHashType() {
        return this.hashType;
    }
}
function setFieldType() {
    return parseInt(document.querySelector('input[name=fieldTypeRadio]:checked').value);
}
function setSideType() {
    return parseInt(document.querySelector('input[name=sideNameRadio]:checked').value);
}
function setHashType() {
    return parseInt(document.querySelector('input[name=hashNameRadio]:checked').value);
}
