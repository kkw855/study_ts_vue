import { getLastDayInMonth, getStartDayInMonth } from './lib'
import { absurd, constVoid, flow, pipe, unsafeCoerce } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Either'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'
import * as A from 'fp-ts/Array'
import * as NEA from 'fp-ts/NonEmptyArray'
import axios from 'axios'
import { Semigroup } from 'fp-ts/Semigroup'
import { Monoid } from 'fp-ts/Monoid'

test('getLastDayInMonth', () => {
  expect(getLastDayInMonth(2020, 2)).toEqual(29)
  expect(getLastDayInMonth(2022, 2)).toEqual(28)
  expect(getLastDayInMonth(2022, 6)).toEqual(30)
  expect(getLastDayInMonth(2022, 12)).toEqual(31)
})

test('getStartDayInMonth', () => {
  expect(getStartDayInMonth(2020, 2)).toEqual(6) // 토요일
  expect(getStartDayInMonth(2022, 2)).toEqual(2) // 화요일
  expect(getStartDayInMonth(2022, 6)).toEqual(3) // 수요일
  expect(getStartDayInMonth(2022, 12)).toEqual(4) // 목요일
})

test('fp-ts part2', () => {
  interface Foo {
    bar?: Fizz
  }
  interface Fizz {
    buzz: string
  }
  const foo = { bar: undefined } as Foo | undefined
  const foo2 = { bar: { buzz: 'hello' } } as Foo | undefined

  expect(
    pipe(
      foo,
      O.fromNullable,
      O.map(({ bar }) => bar),
      O.chain(
        flow(
          O.fromNullable,
          O.map(({ buzz }) => buzz)
        )
      )
    )
  ).toStrictEqual(O.none)

  expect(
    pipe(
      foo2,
      O.fromNullable,
      O.map(({ bar }) => bar),
      O.chain(
        flow(
          O.fromNullable,
          O.map(({ buzz }) => buzz)
        )
      )
    )
  ).toStrictEqual(O.some('hello'))
})

test('fp-ts part3', async () => {
  const code200 = pipe(
    TE.tryCatch(
      () => axios.get('https://httpstat.us/200'),
      (reason) => new Error(`${reason}`)
    ),
    TE.map((resp) => resp.data)
  )

  expect(await code200()).toStrictEqual(
    E.right({ code: 200, description: 'OK' })
  )

  const code500 = pipe(
    TE.tryCatch(
      () => axios.get('https://httpstat.us/500'),
      (reason) => new Error(`${reason}`)
    ),
    TE.map((resp) => resp.data)
  )

  expect(await code500()).toStrictEqual(
    E.left(new Error('AxiosError: Request failed with status code 500'))
  )

  interface Response {
    status: number
    url: string
    response: string
  }

  class HttpError extends Error {
    public response
    constructor(response: Response) {
      super(`${response.status} for ${response.url}`)
      this.name = 'HttpError'
      this.response = response
    }
  }

  function loadJson(url: string) {
    return TE.tryCatch(
      () => axios.get(url),
      (reason) => new Error(`${reason}`)
    )
  }

  async function demoGithubUser() {
    // const name = prompt('GitHub username을 입력하세요.', 'iliakan')
    const name = 'kkw855'
    return await pipe(
      loadJson(`https://api.github.com/users/${name}`),
      TE.map((resp) => `이름: ${resp.data.name}.`)
    )()
  }

  const res = await demoGithubUser()
  expect(res).toStrictEqual(E.right('이름: EndSouL.'))

  expect(constVoid()).toStrictEqual(undefined)
  expect(unsafeCoerce<unknown, string>('hello')).toStrictEqual('hello')
  function tt() {
    throw new Error('hello error!')
  }
  expect(tt).toThrow('hello error!')
})

test('fp-ts part4', async () => {
  interface Fish {
    swim: () => void
  }
  interface Bird {
    fly: () => void
  }
  function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined
  }

  expect(isFish({ swim: () => console.log('swim') })).toBeTruthy()
  expect(isFish({ fly: () => console.log('fly') })).toBeFalsy()

  expect(A.isNonEmpty([1, 2, 3])).toBeTruthy()
  expect(A.isNonEmpty([])).toBeFalsy()

  type Foo = {
    readonly _tag: 'Foo'
    readonly f: () => number
  }

  type Bar = {
    readonly _tag: 'Bar'
    readonly g: () => number
  }
  function compute(arr: Array<Foo | Bar>) {
    let sum = 0
    let max = Number.NEGATIVE_INFINITY

    arr.forEach((a) => {
      switch (a._tag) {
        case 'Foo':
          sum += a.f()
          break
        case 'Bar':
          max = Math.max(max, a.g())
          break
      }
    })

    return sum * max
  }
  const compute2 = (arr: Array<Foo | Bar>) => {
    pipe(
      A.partitionMap((a: Foo | Bar) =>
        a._tag === 'Foo' ? E.left(a) : E.right(a)
      )(arr),
      ({ left: foos, right: bars }) => {
        const sum = A.reduce(0, (prev, foo: Foo) => prev + foo.f())(foos)
        const max = A.reduce(Number.NEGATIVE_INFINITY, (max, bar: Bar) =>
          Math.max(max, bar.g())
        )(bars)

        return sum * max
      }
    )
  }

  const onlyOne: Semigroup<number> = {
    concat: () => 1,
  }
  const semigroupMax: Semigroup<number> = {
    concat: Math.max,
  }
  const monoidSum: Monoid<number> = {
    concat: onlyOne.concat,
    empty: 0,
  }
  const monoidMax: Monoid<number> = {
    concat: semigroupMax.concat,
    empty: Number.NEGATIVE_INFINITY,
  }
  const compute3 = (arr: Array<Foo | Bar>) => {
    pipe(
      A.partitionMap((a: Foo | Bar) =>
        a._tag === 'Foo' ? E.left(a) : E.right(a)
      )(arr),
      ({ left: foos, right: bars }) => {
        const sum = A.foldMap(monoidSum)((foo: Foo) => foo.f())(foos)
        const max = A.reduce(Number.NEGATIVE_INFINITY, (max, bar: Bar) =>
          Math.max(max, bar.g())
        )(bars)

        return sum * max
      }
    )
  }
})
