import 'reflect-metadata';
import { metadataKey } from './utils/types';
import { deepClone } from './utils/index';
import convertWithType, { convertAdaptorMap } from './convertWithType';
import { ConfigOption } from './convert';

interface ConfigAdaptor {
  type: string,
  adaptor: (value: any, required?: boolean | undefined, message?: string | undefined) => any,
}

const toString = Object.prototype.toString

// Add a new convert type or rewrite convert type 
function config(confs: ConfigAdaptor | Array<ConfigAdaptor>) {
  if (Array.isArray(confs)) {
    confs.forEach(conf => convertAdaptorMap.set(conf.type, conf.adaptor))
  } else {
    convertAdaptorMap.set(confs.type, confs.adaptor)
  }
}

// principle: transform data type with parameter value and return new data.
function transform(target, config: { [key: string]: ConfigOption | any } | ConfigOption) {
  const targetType = toString.call(target).slice(8, -1)
  let nextValue = target
  if (!config) { // if not config convert return itself
    return nextValue
  }
  switch (targetType) {
    case 'Object':
      nextValue = deepClone(target) // use deep clone
      Object.keys(target).forEach(key => {
        nextValue[key] = config[key] ? convertWithType(
          target[key],
          config[key].type,
          config[key].required,
          config[key].message || `${key} is required`
        ) : target[key]
      })
      break;
    case 'Array':
      nextValue = deepClone(target) // use deep clone
      target.forEach((value, index) => {
        // convert primtives data type in array and convert object in array
        nextValue[index] = transform(target[index], config)
      })
      break;
    default:
      // compatible with old mode like `@convert({ id: { type: 'number' } }) id: number`,
      config = typeof config.type === 'string' ? config : config[Object.keys(config)[0]]
      nextValue = convertWithType(
        target,
        config.type,
        config.required,
        config.message || `parameter is required`
      )
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
    descriptor.value = function (...args) {
      const meta = Reflect.getOwnMetadata(metadataKey, target, propertyKey)
      const newArgs = args.map((arg, parameterIndex) => {
        const config = meta.get(parameterIndex)
        return transform(arg, config)
      })
      return method.apply(this, newArgs)
    }
  }
}

converter.config = config
export default converter
