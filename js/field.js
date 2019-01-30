'use strict';

function Field(fieldType, sideType, hashType) {
    this.fieldType = fieldType;
    this.sideType = sideType;
    this.hashType = hashType;
}

Field.prototype.getFieldType = function() {
    return this.fieldType;
}

Field.prototype.getSideType = function() {
    return this.sideType;
}

Field.prototype.getHashType = function() {
    return this.hashType;
}
