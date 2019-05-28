/**
 * parameter decorator
 * 1.Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
 * 2.The name of the member.
 * 3.The ordinal index of the parameter in the function’s parameter list.
 */
import 'reflect-metadata';
import { metadataKey } from './utils/types';
import { type } from './convertWithType';

export interface ConfigOption {
  type: type, // primitives data types
  required?: boolean, // param is required or not
  message?: string, // param is required throw error message
}

function convert(config: { [key: string]: ConfigOption } | ConfigOption) {
  return function (target, propertyKey, parameterIndex) {
    const existMetadataValue = Reflect.getOwnMetadata(metadataKey, target) || new Map()
    const metadataValue = existMetadataValue.set(parameterIndex, config)
    Reflect.defineMetadata(metadataKey, metadataValue, target)
  }
}

export default convert
