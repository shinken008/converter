converter
=========
Javascript conmunicates to java with [js-to-java](https://github.com/node-modules/js-to-java) need special schemas, we will preprocess data (if you need a number but get a string parameter) then we can use `js-to-java` to wrap js object to java object.

[![Build Status](https://travis-ci.org/shinken008/converter.svg?branch=master)](https://travis-ci.org/shinken008/converter)
[![npm version](https://badge.fury.io/js/converter-z.svg)](http://badge.fury.io/js/converter-z)

## Install
```sh
$ npm install converter-z
```
## Usage
### Convert primitives data type, like number, string, boolean, and more.
```ts
@converter()
method(
  @convert({ type: 'number' }) id: number, // recommend
  @convert({ id: { type: 'number' } }) id: number, // deprecated
) {
  ...
}
```

### Convert primtives data type in array
```ts
@converter()
method(
  @convert({ type: 'number' }) ids: number[], // recommend
  @convert({ ids: { type: 'number' } }) ids: number[], // deprecated
) {
  ...
}
```

### Convert shallow object
```ts
@converter()
method(
  @convert({ id: { type: 'number' } }) param: { id: number },
) {
  ...
}
```

### Convert object in array
```ts
@converter()
method(
  @convert({ id: { type: 'number' } }) param: Array<{ id: number }>,
) {
  ...
}
```

### Add a new convert type or rewrite convert type 
```ts
converter.config({
  type: 'increase',
  adaptor: (value, required?: boolean, message?:string) => {
    let nextValue = value
    if (value === '' || value === null || value === undefined) {
      if (required) throw new Error(message)
      nextValue = null
    } else {
      nextValue = +value + 1
    }
    return nextValue
  },
})
```

### Convert deep object
```ts
@converter()
method(
  @convert({
    ids: {
      id: { type: 'number' },
    },
  }) param: { ids: { id: number } },
) {
  ...
}
```

### Project progress
- [ ] Converter develop
  - [x] Convert primitives data type, like number, string, boolean, and more
  - [x] Convert primtives data type in array
  - [x] Convert shallow object
  - [x] Convert object in array
  - [x] Add a new convert type or rewrite convert type 
  - [ ] Convert deep object
  - [ ] More

## License

MIT
