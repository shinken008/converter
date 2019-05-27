"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./utils/types");
/**
 *
 * @Converter()
 * method(param: any) {
 *
 * }
 */
function converter() {
    return function (target, propertyKey, descriptor) {
        const method = descriptor.value;
        descriptor.value = function (...args) {
            // 处理参数格式
            const meta = Reflect.getOwnMetadata(types_1.metadataKey, target);
            console.log(meta, meta);
            method.apply(this, args);
        };
    };
}
exports.default = converter;
