import { expect } from 'chai'
import convert from './convert'
import converter from './converter'

describe('converter', () => {
  it('convert primitives data type, like number, string, boolean', () => {
    class Car{
      @converter()
      run(
        @convert({ type: 'number' }) num: any,
        @convert({ type: 'string' }) str: any,
        @convert({ type: 'boolean' }) boo: any,
        @convert({ type: 'bigDecimal' }) bigDecimal: any,
        @convert({ type: 'long' }) long: any,
        @convert({ type: 'date' }) date: any,
      ) {
        return JSON.stringify({
          number: num,
          string: str,
          boolean: boo,
          bigDecimal: bigDecimal,
          long: long,
          date: date,
        })
      }
    }

    const ferrari = new Car();
    expect(ferrari.run(
      '1',
      2,
      'false',
      33,
      '111112222233333',
      '2019-01-01 00:00:00'
    )).equals(JSON.stringify({
      number: 1,
      string: '2',
      boolean: false,
      bigDecimal: { value: '33' },
      long: 111112222233333,
      date: new Date('2019-01-01 00:00:00'),
    }))
  })

  it('convert primtives data type in array', () => {
    class Car {
      @converter()
      run(
        @convert({ type: 'number' }) param: any[],
      ) {
        return JSON.stringify(param)
      }
    }
    const ferrari = new Car();
    expect(ferrari.run(['1'])).equal(JSON.stringify([1]))
  })

  it('convert shallow object', () => {
    class Car {
      @converter()
      run(
        @convert({
          id: { type: 'number' },
          name: { type: 'string' },
          check: { type: 'boolean' },
          bigDecimal: { type: 'bigDecimal' },
          long: { type: 'long' },
          date: { type: 'date' },
        }) param: { [key: string]: any },
      ) {
        return JSON.stringify(param)
      }
    }
    const ferrari = new Car();
    expect(ferrari.run({
      id: '111',
      name: 222,
      check: 'false',
      bigDecimal: 33,
      long: '111112222233333',
      date: '2019-01-01 00:00:00',
    })).equal(JSON.stringify({
      id: 111,
      name: '222',
      check: false,
      bigDecimal: { value: '33' },
      long: 111112222233333,
      date: new Date('2019-01-01 00:00:00'),
    }))
  })

  it('convert object in array', () => {
    class Car {
      @converter()
      run(
        @convert({
          id: { type: 'number' },
          name: { type: 'string' },
          check: { type: 'boolean' },
          bigDecimal: { type: 'bigDecimal' },
          long: { type: 'long' },
          date: { type: 'date' },
        }) param: { [key: string]: any }[],
      ) {
        return JSON.stringify(param)
      }
    }
    const ferrari = new Car();
    expect(ferrari.run([{
      id: '111',
      name: 222,
      check: 'false',
      bigDecimal: 33,
      long: '111112222233333',
      date: '2019-01-01 00:00:00',
    }])).equal(JSON.stringify([{
      id: 111,
      name: '222',
      check: false,
      bigDecimal: { value: '33' },
      long: 111112222233333,
      date: new Date('2019-01-01 00:00:00'),
    }]))
  })
})