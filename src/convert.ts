/**
 * parameter decorator
 * 1.Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
 * 2.The name of the member.
 * 3.The ordinal index of the parameter in the function’s parameter list.
 */
import 'reflect-metadata';
import { metadataKey } from './utils/types';

function Convert(config) {
  return function (target, propertyKey, parameterIndex) {
    const existMetadataValue = Reflect.getOwnMetadata(metadataKey, target) || new Map()
    const metadataValue = existMetadataValue.set(parameterIndex, config)
    Reflect.defineMetadata(metadataKey, metadataValue, target)
  }
}

export default Convert
