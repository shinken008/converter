import { transformLongType } from "./utils/index";

export type type = 'number' | 'string' | 'boolean' | 'bigDecimal' | 'long' | 'date'

const convertAdaptors = ([
  {
    type: 'number',
    adaptor: (value, required?: boolean, message?: string) => {
      let nextValue = value
      if (value === '' || value === null || value === undefined) {
        if (required) throw new Error(message)
        nextValue = null
      } else {
        nextValue = +value
      }
      return nextValue
    },
  }, {
    type: 'string',
    adaptor: (value, required?: boolean, message?: string) => {
      let nextValue = value
      if (value === '' || value === null || value === undefined) {
        if (required) throw new Error(message)
        nextValue = null
      } else {
        nextValue = `${value}`
      }
      return nextValue
    },
  }, {
    type: 'boolean',
    adaptor: (value, required?: boolean, message?: string) => {
      let nextValue = value
      if (value === '' || value === null || value === undefined) {
        if (required) throw new Error(message)
        nextValue = null
      } else if (value === 'false') {
        nextValue = false
      } else {
        nextValue = !!value
      }
      return nextValue
    },
  }, {
    type: 'bigDecimal',
    adaptor: (value, required?: boolean, message?: string) => {
      let nextValue = value
      if (value === '' || value === null || value === undefined) {
        if (required) throw new Error(message)
        nextValue = null
      } else {
        nextValue = { value: `${value}` }
      }
      return nextValue
    },
  }, {
    type: 'long',
    adaptor: (value, required?: boolean, message?: string) => {
      let nextValue = value
      if (value === '' || value === null || value === undefined) {
        if (required) throw new Error(message)
        nextValue = null
      } else {
        nextValue = transformLongType(value)
      }
      return nextValue
    },
  }, {
    type: 'date',
    adaptor: (value, required?: boolean, message?: string) => {
      let nextValue = value
      if (value === '' || value === null || value === undefined) {
        if (required) throw new Error(message)
        nextValue = null
      } else if (new Date(value).toLocaleTimeString() === 'Invalid Date') {
        throw new Error('Convert data to date type error: Invalid Date')
      } else {
        nextValue = new Date(value)
      }
      return nextValue
    },
  }
])

const map = new Map()
convertAdaptors.forEach(({ type, adaptor }) => {
  map.set(type, adaptor)
})

export const convertAdaptorMap = map
export default function convertWithType(value, type, required?: boolean, message?: string) {
  const convertAdaptor = convertAdaptorMap.get(type) || value
  let nextValue = convertAdaptor ? convertAdaptor(value, required, message) : value // if not exist adaptor return value
  return nextValue
}
