"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * parameter decorator
 * 1.Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
 * 2.The name of the member.
 * 3.The ordinal index of the parameter in the function’s parameter list.
 */
require("reflect-metadata");
const types_1 = require("./utils/types");
function convert(config) {
    return function (target, propertyKey, parameterIndex) {
        const existMetadataValue = Reflect.getOwnMetadata(types_1.metadataKey, target, propertyKey) || new Map();
        const metadataValue = existMetadataValue.set(parameterIndex, config);
        Reflect.defineMetadata(types_1.metadataKey, metadataValue, target, propertyKey);
    };
}
exports.default = convert;
