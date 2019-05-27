#### converter
javascript conmunicates to java with [js-to-java](https://github.com/node-modules/js-to-java) need special schemas, we need pretreat javascript type then wo can use `js-to-java` encode.

[![Build Status](https://travis-ci.org/shinken008/converter.svg?branch=master)](https://travis-ci.org/shinken008/converter)

#### Install
```sh
$ npm install converter
```
#### Usage
##### Convert primitives data type, like number, string, boolean, and more.
```ts
@converter()
method(
  @convert({ id: { type: 'number' } }) id: number,
  @convert({ type: 'number' }) id: number,
) {
  ...
}
```

##### Convert primtives data type in array
```ts
@converter()
method(
  @convert({ ids: { type: 'number' } }) ids: number[],
  @convert({ type: 'number' }) ids: number[],
) {
  ...
}
```

##### Convert shallow object
```ts
@converter()
method(
  @convert({ id: { type: 'number' } }) param: { id: number },
) {
  ...
}
```

##### Convert object in array
```ts
@converter()
method(
  @convert({ id: { type: 'number' } }) param: Array<{ id: number }>,
) {
  ...
}
```

##### Project progress
- [ ] Converter develop
  - [x] Convert primitives data type, like number, string, boolean
  - [x] Convert primtives data type in array
  - [x] Convert shallow object
  - [x] Convert object in array