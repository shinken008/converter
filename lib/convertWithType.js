"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./utils/index");
function convertWithType(value, type, required, message) {
    let nextValue = value;
    switch (type) {
        case 'number':
            if (value === '' || value === null || value === undefined) {
                if (required)
                    throw new Error(message);
                nextValue = null;
            }
            else {
                nextValue = +value;
            }
            break;
        case 'string':
            if (value === '' || value === null || value === undefined) {
                if (required)
                    throw new Error(message);
                nextValue = null;
            }
            else {
                nextValue = `${value}`;
            }
            break;
        case 'boolean':
            if (value === '' || value === null || value === undefined) {
                if (required)
                    throw new Error(message);
                nextValue = null;
            }
            else if (value === 'false') {
                nextValue = false;
            }
            else {
                nextValue = !!value;
            }
            break;
        case 'bigDecimal':
            if (value === '' || value === null || value === undefined) {
                if (required)
                    throw new Error(message);
                nextValue = null;
            }
            else {
                nextValue = { value: `${value}` };
            }
            break;
        case 'long':
            if (value === '' || value === null || value === undefined) {
                if (required)
                    throw new Error(message);
                nextValue = null;
            }
            else {
                nextValue = index_1.transformLongType(value);
            }
            break;
        case 'date':
            if (value === '' || value === null || value === undefined) {
                if (required)
                    throw new Error(message);
                nextValue = null;
            }
            else if (new Date(value).toLocaleTimeString() === 'Invalid Date') {
                throw new Error('Convert data to date type error: Invalid Date');
            }
            else {
                nextValue = new Date(value);
            }
            break;
        default:
            break;
    }
    return nextValue;
}
exports.default = convertWithType;
