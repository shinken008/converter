"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./utils/index");
const convertAdaptors = ([
    {
        type: 'number',
        adaptor: (value, required, message) => {
            let nextValue = value;
            if (value === '' || value === null || value === undefined) {
                if (required)
                    throw new Error(message);
                nextValue = null;
            }
            else {
                nextValue = +value;
            }
            return nextValue;
        },
    }, {
        type: 'string',
        adaptor: (value, required, message) => {
            let nextValue = value;
            if (value === '' || value === null || value === undefined) {
                if (required)
                    throw new Error(message);
                nextValue = null;
            }
            else {
                nextValue = `${value}`;
            }
            return nextValue;
        },
    }, {
        type: 'boolean',
        adaptor: (value, required, message) => {
            let nextValue = value;
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
            return nextValue;
        },
    }, {
        type: 'bigDecimal',
        adaptor: (value, required, message) => {
            let nextValue = value;
            if (value === '' || value === null || value === undefined) {
                if (required)
                    throw new Error(message);
                nextValue = null;
            }
            else {
                nextValue = { value: `${value}` };
            }
            return nextValue;
        },
    }, {
        type: 'long',
        adaptor: (value, required, message) => {
            let nextValue = value;
            if (value === '' || value === null || value === undefined) {
                if (required)
                    throw new Error(message);
                nextValue = null;
            }
            else {
                nextValue = index_1.transformLongType(value);
            }
            return nextValue;
        },
    }, {
        type: 'date',
        adaptor: (value, required, message) => {
            let nextValue = value;
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
            return nextValue;
        },
    }
]);
const map = new Map();
convertAdaptors.forEach(({ type, adaptor }) => {
    map.set(type, adaptor);
});
exports.convertAdaptorMap = map;
function convertWithType(value, type, required, message) {
    const convertAdaptor = exports.convertAdaptorMap.get(type) || value;
    let nextValue = convertAdaptor ? convertAdaptor(value, required, message) : value; // if not exist adaptor return value
    return nextValue;
}
exports.default = convertWithType;
