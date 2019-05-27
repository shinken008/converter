import * as long from 'long'

const MAX_SAFE_INT = long.fromNumber(Math.pow(2, 53) - 1)
const MIN_SAFE_INT = long.fromNumber(1 - Math.pow(2, 53))

export function deepClone(obj) {
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  return Array.isArray(obj) && obj.length
    ? (clone.length = obj.length) && Array.from(clone)
    : Array.isArray(obj)
      ? Array.from(obj)
      : clone;
}

export function transformLongType (value: number | string) {
  const longValue = long.fromValue(value)
  if (longValue.greaterThan(MAX_SAFE_INT) || longValue.lessThan(MIN_SAFE_INT)) {
    return longValue.toString()
  }
  return longValue.toNumber()
}