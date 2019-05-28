converter
=========
Javascript conmunicates to java with [js-to-java](https://github.com/node-modules/js-to-java) need special schemas, we will preprocess data (if you need a number but get a string parameter) then we can use `js-to-java` wrap js object to java object.

[![Build Status](https://travis-ci.org/shinken008/converter.svg?branch=master)](https://travis-ci.org/shinken008/converter)

## Install
```sh
$ npm install type-converter
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

### Custom your convert type function or you can create a issue

### Project progress
- [ ] Converter develop
  - [x] Convert primitives data type, like number, string, boolean, and more
  - [x] Convert primtives data type in array
  - [x] Convert shallow object
  - [x] Convert object in array
  - [x] Custom convert type function

## License

MIT
