import { transformLongType } from "./utils/index";

export type type = 'number' | 'string' | 'boolean' | 'bigDecimal' | 'long' | 'date'

export default function convertWithType(value, type, required?: boolean, message?:string) {
  let nextValue = value
  switch (type) {
    case 'number':
      if (value === '' || value === null || value === undefined) {
        if (required) throw new Error(message)
        nextValue = null
      } else {
        nextValue = +value
      }
      break;
    case 'string':
      if (value === null || value === undefined) {
        if (required) throw new Error(message)
        nextValue = null
      } else if (value === '') {
        if (required) throw new Error(message)
      } else {
        nextValue = `${value}`
      }
      break;
    case 'boolean':
      if (value === '' || value === null || value === undefined) {
        if (required) throw new Error(message)
        nextValue = null
      } else if (value === 'false') {
        nextValue = false
      } else {
        nextValue = !!value
      }
      break;
    case 'bigDecimal':
      if (value === '' || value === null || value === undefined) {
        if (required) throw new Error(message)
        nextValue = null
      } else {
        nextValue = { value: `${value}` }
      }
      break;
    case 'long':
      if (value === '' || value === null || value === undefined) {
        if (required) throw new Error(message)
        nextValue = null
      } else {
        nextValue = transformLongType(value)
      }
      break;
    case 'date':
      if (value === '' || value === null || value === undefined) {
        if (required) throw new Error(message)
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