/**
 * @converter()
 * method() {
 *  @convert()
 * }
 */

import 'reflect-metadata';
import { metadataKey } from "./utils/types";
import { deepClone, transformLongType } from "./utils/index";

const toString = Object.prototype.toString

// principle: transform data type with parameter value and return new data.
function transform(target, config) {
  const targetType = toString.call(target).slice(8, -1)
  let nextValue = deepClone(target) // use deep clone
  switch (targetType) {
    case 'Object':
      Object.keys(target).forEach(key => {
        nextValue[key] = convertWithType(target[key], config[key].type)
      })
      break;
    case 'Array':
      target.forEach((value, index) => {
        // convert primtives data type in array and convert object in array
        nextValue[index] = transform(target[index], config)
      })
      break;
    default:
      nextValue = convertWithType(target, config.type)
      break;
  }
  return nextValue
}

function convertWithType(value, type) {
  let nextValue = value
  switch (type) {
    case 'number':
      if (value === '' || value === null || value === undefined) {
        nextValue = null
      } else {
        nextValue = +value
      }
      break;
    case 'string':
      if (value === null || value === undefined) {
        nextValue = null
      } else {
        nextValue = `${value}`
      }
      break;
    case 'boolean':
      if (value === '' || value === null || value === undefined) {
        nextValue = null
      } else if (value === 'false') {
        nextValue = false
      } else {
        nextValue = !!value
      }
      break;
    case 'bigDecimal':
      if (value === '' || value === null || value === undefined) {
        nextValue = null
      } else {
        nextValue = { value: `${value}` }
      }
      break;
    case 'long':
      if (value === '' || value === null || value === undefined) {
        nextValue = null
      } else {
        nextValue = transformLongType(value)
      }
      break;
    case 'date':
      if (value === '' || value === null || value === undefined) {
        nextValue = null
      } else if (new Date(value).toLocaleTimeString() === 'Invalid Date') {
        throw new Error('Convert data to date type error: Invalid Date')
      } else {
        nextValue = new Date(value)
      }
      break;
    default:
      break;
  }
  return nextValue
}

/**
 * 
 * @Converter()
 * method(param: any) {
 *  
 * }
 */

function converter() {
  return function (target, propertyKey, descriptor) {
    const method = descriptor.value
    descriptor.value = function(...args) {
      const meta = Reflect.getOwnMetadata(metadataKey, target)
      const newArgs = args.map((arg, parameterIndex) => {
        const config = meta.get(parameterIndex)
        return transform(arg, config)
      })
      return method.apply(this, newArgs)
    }
  }
}

export default converter
