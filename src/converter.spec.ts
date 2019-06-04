import { expect } from 'chai';
import convert from './convert';
import converter from './converter';

describe('converter', () => {
  it('convert primitives data type, like number, string, boolean', () => {
    class Car {
      @converter()
      run(
        @convert({ type: 'number' }) num: any,
        @convert({ type: 'string' }) str: any,
        @convert({ type: 'boolean' }) boo: any,
        @convert({ type: 'bigDecimal' }) bigDecimal: any,
        @convert({ type: 'long' }) long: any,
        @convert({ type: 'date' }) date: any,
        @convert({ old: { type: 'number' } }) old: any,
        notConvert: any,
      ) {
        return JSON.stringify({
          number: num,
          string: str,
          boolean: boo,
          bigDecimal: bigDecimal,
          long: long,
          date: date,
          old,
          notConvert,
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
      '2019-01-01 00:00:00',
      '44',
      '55',
    )).equals(JSON.stringify({
      number: 1,
      string: '2',
      boolean: false,
      bigDecimal: { value: '33' },
      long: 111112222233333,
      date: new Date('2019-01-01 00:00:00'),
      old: 44,
      notConvert: '55',
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
      notConvert: '55',
    })).equal(JSON.stringify({
      id: 111,
      name: '222',
      check: false,
      bigDecimal: { value: '33' },
      long: 111112222233333,
      date: new Date('2019-01-01 00:00:00'),
      notConvert: '55',
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
      notConvert: '55',
    }])).equal(JSON.stringify([{
      id: 111,
      name: '222',
      check: false,
      bigDecimal: { value: '33' },
      long: 111112222233333,
      date: new Date('2019-01-01 00:00:00'),
      notConvert: '55',
    }]))
  })

  it('Throw required message', () => {
    class Car {
      @converter()
      run(
        @convert({
          type: 'number',
          required: true,
          message: 'id不能为空'
        }) id: any,
        @convert({
          id: {
            type: 'number',
            required: true,
          }
        }) obj: any
      ) {
        return id
      }
    }

    const ferrari = new Car();
    let message1
    let message2
    try {
      ferrari.run('', { id: '1' })
    } catch (error) {
      message1 = error.message
    }
    expect(message1).equal('id不能为空')
    try {
      ferrari.run('1', { id: '' })
    } catch (error) {
      message2 = error.message
    }
    expect(message2).equal('id is required')
  })

  it('Add a new convert type or rewrite convert type', () => {
    converter.config({
      type: 'number',
      adaptor: (value, required?: boolean, message?: string) => {
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
    class Car {
      @converter()
      run(
        @convert({
          type: 'number',
        }) id: any,
      ) {
        return id
      }
    }

    const ferrari = new Car();
    expect(ferrari.run('1')).equal(2)
  })
})